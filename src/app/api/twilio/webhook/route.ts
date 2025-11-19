'use server';
import { NextRequest, NextResponse } from 'next/server';
import { messagingWebhook } from '@/ai/flows/messaging-webhook';
import { analyzeImageDisease } from '@/ai/flows/image-disease-analysis';

// --- Helper Functions for TwiML --- //

/**
 * Creates a TwiML response with the given message.
 * @param message The text to include in the TwiML <Message> tag.
 * @returns A NextResponse object with the TwiML content.
 */
function createTwiMLResponse(message: string): NextResponse {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(message)}</Message>
</Response>`;
  return new NextResponse(twiml, { headers: { 'Content-Type': 'text/xml' } });
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
  try {
    const formData = await request.formData();

    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;
    const numMedia = parseInt((formData.get('NumMedia') as string) || '0', 10);
    const mediaUrl = formData.get('MediaUrl0') as string | null;
    const mediaContentType = formData.get('MediaContentType0') as string | null;

    console.log('Received Twilio webhook:', { from, body, messageSid, mediaContentType });

    if (!body && numMedia === 0) {
      console.log('Empty message body and no media. Acknowledging and closing.');
      return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
    }

    if (!from) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
      const result = await messagingWebhook({ From: from, Body: body || '' });
      console.log('AI response generated:', result);
      responseText = result.body;
    }

    // --- Return TwiML to send the reply --- //
    return createTwiMLResponse(responseText);

  } catch (error: any) {
    console.error('Twilio webhook error:', error);

    let errorMessage = "Sorry, an unexpected error occurred. Please try again later.";
    if (error.message?.includes('Quota exceeded')) {
      errorMessage = 'I am currently assisting many users and have reached my temporary limit. Please try again in a minute.';
    }

    return createTwiMLResponse(errorMessage);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'ArogyaSetu Twilio Webhook is active',
    timestamp: new Date().toISOString()
  });
}
