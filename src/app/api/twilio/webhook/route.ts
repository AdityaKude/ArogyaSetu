import { NextRequest, NextResponse } from 'next/server';
import { messagingWebhook } from '@/ai/flows/messaging-webhook';
import { analyzeImageDisease } from '@/ai/flows/image-disease-analysis';
import { twilioService } from '@/lib/twilio';

// --- Helper Functions for TwiML --- //

/**
 * Creates a TwiML response with the given message.
 * @param message The text to include in the TwiML <Message> tag.
 * @returns A NextResponse object with the TwiML content.
 */
function createTwiMLResponse(message: string): NextResponse {
  const escapedMessage = escapeXml(message);
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapedMessage}</Message>
</Response>`;
  
  console.log('Sending TwiML response:', twiml);
  
  return new NextResponse(twiml, { 
    status: 200,
    headers: { 
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    } 
  });
}

/**
 * Escapes special XML characters in a string.
 * @param str The string to escape.
 * @returns The escaped string.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// --- Main Webhook Logic --- //

export async function POST(request: NextRequest) {
  // Immediately acknowledge the webhook to prevent timeout
  const formData = await request.formData();
  const from = formData.get('From') as string;
  const body = formData.get('Body') as string;
  const messageSid = formData.get('MessageSid') as string;
  const numMedia = parseInt((formData.get('NumMedia') as string) || '0', 10);
  const mediaUrl = formData.get('MediaUrl0') as string | null;
  const mediaContentType = formData.get('MediaContentType0') as string | null;

  console.log('Received Twilio webhook:', { from, body, messageSid, mediaContentType });

  // Handle empty messages immediately
  if (!body && numMedia === 0) {
    console.log('Empty message body and no media. Acknowledging and closing.');
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
      headers: { 'Content-Type': 'text/xml' },
      status: 200
    });
  }

  if (!from) {
    console.error('Missing required field: From');
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
      headers: { 'Content-Type': 'text/xml' },
      status: 200
    });
  }

  // Acknowledge immediately to prevent timeout, then process asynchronously
  const acknowledgeResponse = new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
    headers: { 'Content-Type': 'text/xml' },
    status: 200
  });

  // Process the message asynchronously and send via API
  processMessageAsync(from, body, numMedia, mediaUrl, mediaContentType).catch(error => {
    console.error('Error processing message asynchronously:', error);
    // Try to send error message via API
    twilioService.sendWhatsAppMessage({
      to: from,
      body: "Sorry, an unexpected error occurred. Please try again later."
    }).catch(err => console.error('Failed to send error message:', err));
  });

  return acknowledgeResponse;
}

async function processMessageAsync(
  from: string,
  body: string | null,
  numMedia: number,
  mediaUrl: string | null,
  mediaContentType: string | null
) {
  try {
    let responseText: string;

    // --- Media Handling --- //
    if (numMedia > 0 && mediaUrl && mediaContentType) {
      try {
        if (mediaContentType.startsWith('video/')) {
          responseText = 'Thank you for the video. Currently, I can only analyze images. Please send a clear picture.';
        } else if (mediaContentType.startsWith('image/')) {
          const authToken = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
          const resp = await fetch(mediaUrl, { headers: { Authorization: `Basic ${authToken}` } });

          if (!resp.ok) throw new Error(`Failed to fetch media: ${resp.status} ${resp.statusText}`);
          
          const arrayBuffer = await resp.arrayBuffer();
          const dataUrl = `data:${mediaContentType};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

          const analysis = await analyzeImageDisease({ image: dataUrl, context: body || undefined });
          console.log('AI Image Analysis Result:', JSON.stringify(analysis, null, 2));
          
          if (!analysis || !analysis.summary || !analysis.possibleConditions || !analysis.recommendedActions) {
            console.error('Incomplete AI analysis object received:', analysis);
            responseText = "Sorry, the AI returned an incomplete analysis. Please try sending the image again.";
          } else {
            responseText = `*Image Analysis*\n\n` +
              `*Summary:* ${analysis.summary}\n\n` +
              `*Possible Conditions:* ${analysis.possibleConditions}\n\n` +
              `*Recommended Actions:* ${analysis.recommendedActions}\n\n` +
              `*Confidence:* ${analysis.confidence}\n\n` +
              `_This is not a medical diagnosis. Always consult a professional._`;
          }
        } else {
          responseText = 'This media type is not supported. Please send an image for analysis.';
        }
      } catch (e) {
        console.error('Twilio media analysis error:', e);
        responseText = "Sorry, I couldn't analyze the media. It might be an unsupported format or too large.";
      }
    } else {
      // --- Text Message Handling --- //
      if (!body || body.trim() === '') {
        responseText = "Please send a message with your health question or symptoms.";
      } else {
        const result = await messagingWebhook({ From: from, Body: body });
        console.log('AI response generated:', result);
        responseText = result?.body || "Sorry, I couldn't process your message. Please try again.";
      }
    }

    // Ensure we have a response text
    if (!responseText || responseText.trim() === '') {
      responseText = "Sorry, I couldn't generate a response. Please try again.";
    }

    // Send the response via Twilio API instead of TwiML
    console.log('Sending response via Twilio API to:', from);
    console.log('Response text (first 200 chars):', responseText.substring(0, 200) + '...');
    
    const sendResult = await twilioService.sendWhatsAppMessage({
      to: from,
      body: responseText
    });

    if (sendResult.success) {
      console.log('Message sent successfully via Twilio API:', sendResult.sid);
    } else {
      console.error('Failed to send message via Twilio API:', sendResult.error);
    }

  } catch (error: any) {
    console.error('Error in processMessageAsync:', error);

    let errorMessage = "Sorry, an unexpected error occurred. Please try again later.";
    if (error.message?.includes('Quota exceeded')) {
      errorMessage = 'I am currently assisting many users and have reached my temporary limit. Please try again in a minute.';
    }

    // Try to send error message
    try {
      await twilioService.sendWhatsAppMessage({
        to: from,
        body: errorMessage
      });
    } catch (sendError) {
      console.error('Failed to send error message:', sendError);
    }
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'ArogyaSetu Twilio Webhook is active',
    timestamp: new Date().toISOString()
  });
}
