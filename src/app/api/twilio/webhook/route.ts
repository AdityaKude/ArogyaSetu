import { NextRequest, NextResponse } from 'next/server';
import { messagingWebhook } from '@/ai/flows/messaging-webhook';
import { analyzeImageDisease } from '@/ai/flows/image-disease-analysis';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract Twilio webhook data
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;
    const numMedia = parseInt((formData.get('NumMedia') as string) || '0', 10);
    const mediaUrl = formData.get('MediaUrl0') as string | null;
    const mediaContentType = formData.get('MediaContentType0') as string | null;
    
    console.log('Received Twilio webhook:', { from, body, messageSid });
    
    if (!from) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // If an image is attached, analyze it
    if (numMedia > 0 && mediaUrl) {
      try {
        const resp = await fetch(mediaUrl);
        if (!resp.ok) throw new Error(`Failed to fetch media: ${resp.status}`);
        const arrayBuffer = await resp.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const mime = mediaContentType || resp.headers.get('content-type') || 'image/jpeg';
        const dataUrl = `data:${mime};base64,${base64}`;

        const analysis = await analyzeImageDisease({ image: dataUrl, context: body || undefined });
        const text = `🖼️ Image Analysis\n\n` +
          `Summary: ${analysis.summary}\n\n` +
          `Possible Conditions: ${analysis.possibleConditions}\n\n` +
          `Recommended Actions: ${analysis.recommendedActions}\n\n` +
          `Confidence: ${analysis.confidence}\n\n` +
          `⚠️ This is not a medical diagnosis.`;

        return new NextResponse(
          `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
          <Response>
            <Message>${escapeXml(text)}</Message>
          </Response>`,
          { headers: { 'Content-Type': 'text/xml' } }
        );
      } catch (e) {
        console.error('Twilio media analysis error:', e);
        return new NextResponse(
          `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
          <Response>
            <Message>Sorry, I couldn't analyze the image. Please try again with a clearer image.</Message>
          </Response>`,
          { headers: { 'Content-Type': 'text/xml' } }
        );
      }
    }

    // Otherwise process text through your AI flow
    const result = await messagingWebhook({ From: from, Body: body || '' });
    console.log('AI response generated:', result);
    return new NextResponse(
      `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
      <Response>
        <Message>${escapeXml(result.body)}</Message>
      </Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
    
  } catch (error) {
    console.error('Twilio webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'ArogyaSetu Twilio Webhook is active',
    timestamp: new Date().toISOString()
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
