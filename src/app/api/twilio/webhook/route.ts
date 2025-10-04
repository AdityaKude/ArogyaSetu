import { NextRequest, NextResponse } from 'next/server';
import { messagingWebhook } from '@/ai/flows/messaging-webhook';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract Twilio webhook data
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;
    
    console.log('Received Twilio webhook:', { from, body, messageSid });
    
    if (!from || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process the message through your AI flow
    const result = await messagingWebhook({
      From: from,
      Body: body,
    });
    
    console.log('AI response generated:', result);
    
    // Return TwiML response with the AI-generated content
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>${result.body}</Message>
      </Response>`,
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      }
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
