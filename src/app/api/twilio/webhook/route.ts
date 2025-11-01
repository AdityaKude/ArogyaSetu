import { NextRequest, NextResponse } from 'next/server';
import { messagingWebhook } from '@/ai/flows/messaging-webhook';
import { analyzeImageDisease } from '@/ai/flows/image-disease-analysis';
import { signLanguageAnalysisFlow } from '@/ai/flows/sign-language-analysis';
import { textToSignLanguageFlow } from '@/ai/flows/text-to-sign-language';
import { analyzeSymptoms } from '@/ai/flows/symptom-analysis';
import { getHealthInfo } from '@/ai/flows/health-information-retrieval';
import { audioAnalysisFlow } from '@/ai/flows/audio-analysis';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech';
import { twilioService } from '@/lib/twilio';

// --- Helper Functions for TwiML --- //

/**
 * Creates a TwiML response with the given message.
 * @param message The text to include in the TwiML <Message> tag.
 * @returns A NextResponse object with the TwiML content.
 */
function createTwiMLResponse(message: string): NextResponse {
  if (!message || message.trim().length === 0) {
    console.warn('⚠️ Attempting to send empty message, using default');
    message = 'Sorry, I could not generate a response. Please try again.';
  }
  
  // WhatsApp/Twilio has a 1600 character limit per message
  // If message is too long, we'll truncate it
  const MAX_MESSAGE_LENGTH = 1500;
  let finalMessage = message;
  if (message.length > MAX_MESSAGE_LENGTH) {
    console.warn(`⚠️ Message too long (${message.length} chars), truncating to ${MAX_MESSAGE_LENGTH}`);
    finalMessage = message.substring(0, MAX_MESSAGE_LENGTH) + '...\n\n_Message truncated due to length limit._';
  }
  
  const escapedMessage = escapeXml(finalMessage);
  
  // Create TwiML - ensure proper formatting for WhatsApp
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapedMessage}</Message>
</Response>`;
  
  console.log('📋 Full TwiML Response:', twiml);
  console.log('📋 TwiML length:', twiml.length);
  
  // Return with proper headers for Twilio
  const twimlResponse = new NextResponse(twiml, { 
    status: 200,
    headers: { 
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    } 
  });
  
  console.log('✅ Response headers set, returning to Twilio');
  return twimlResponse;
}

/**
 * Escapes special XML characters in a string.
 * @param str The string to escape.
 * @returns The escaped string.
 */
function escapeXml(str: string): string {
  // First escape & to avoid double-escaping
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to clean up response text for WhatsApp
function cleanResponseText(text: string): string {
  // Remove any problematic characters and ensure newlines are preserved
  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\r/g, '\n')
    .trim();
}

// Process message asynchronously and send via Twilio API
async function processAndSendMessage(fromStr: string, bodyStr: string, numMedia: number, mediaUrlStr: string | null, mediaContentTypeStr: string | null): Promise<void> {
  try {
    let responseText: string = '';
    
    if (numMedia > 0 && mediaUrlStr && mediaContentTypeStr) {
      console.log('🖼️ Processing media asynchronously...');
      try {
        if (mediaContentTypeStr.startsWith('video/')) {
          console.log('📹 Video detected for sign language analysis...');
          
          if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            throw new Error('Missing Twilio credentials for media fetching');
          }
          
          const authToken = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
          const resp = await fetch(mediaUrlStr, { headers: { Authorization: `Basic ${authToken}` } });

          if (!resp.ok) {
            throw new Error(`Failed to fetch video: ${resp.status} ${resp.statusText}`);
          }
          
          const arrayBuffer = await resp.arrayBuffer();
          const base64Data = Buffer.from(arrayBuffer).toString('base64');
          const dataUrl = `data:${mediaContentTypeStr};base64,${base64Data}`;
          
          const signLanguageResult = await signLanguageAnalysisFlow({ video: dataUrl });
          
          if (!signLanguageResult || !signLanguageResult.text || !signLanguageResult.intent) {
            responseText = "Sorry, I couldn't analyze the sign language video. Please try again.";
          } else {
            let healthResponse: string;
            if (signLanguageResult.intent === 'symptom') {
              const symptomResult = await analyzeSymptoms({ symptoms: signLanguageResult.text });
              healthResponse = `SYMPTOM ANALYSIS\n\nPossible Conditions:\n${symptomResult.possibleConditions}\n\nRecommended Actions:\n${symptomResult.recommendedActions}\n\nIMPORTANT: This is not a medical diagnosis. Please consult a professional.`;
            } else if (signLanguageResult.intent === 'info') {
              const healthInfoResult = await getHealthInfo({ topic: signLanguageResult.text });
              healthResponse = `HEALTH INFORMATION\n\n${healthInfoResult.summary}\n\nIMPORTANT: This is general information. Always consult a healthcare professional for medical advice.`;
            } else {
              healthResponse = "I can help with health-related questions. Please describe your symptoms or ask a health question in sign language.";
            }
            
            responseText = `SIGN LANGUAGE TRANSLATION:\n${signLanguageResult.text}\n\n${healthResponse}`;
          }
        } else {
          // First, fetch the media to check its actual content type
          console.log('📎 Fetching media to determine type...');
          
          if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            throw new Error('Missing Twilio credentials for media fetching');
          }
          
          const authToken = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
          console.log('🔐 Fetching media from:', mediaUrlStr.substring(0, 100) + '...');
          
          const resp = await fetch(mediaUrlStr, { headers: { Authorization: `Basic ${authToken}` } });

          if (!resp.ok) {
            throw new Error(`Failed to fetch media: ${resp.status} ${resp.statusText}`);
          }
          
          // Check content type from response (more reliable)
          const responseContentType = resp.headers.get('content-type') || mediaContentTypeStr || '';
          console.log('✅ Media fetched successfully, content type:', responseContentType);
          console.log('📎 Media URL:', mediaUrlStr.substring(0, 100));
          
          // Check if it's audio (by content type or URL extension)
          const isAudio = responseContentType.startsWith('audio/') || 
                         responseContentType.includes('wav') ||
                         responseContentType.includes('mpeg') ||
                         responseContentType.includes('mp3') ||
                         responseContentType.includes('ogg') ||
                         mediaUrlStr.toLowerCase().includes('.wav') ||
                         mediaUrlStr.toLowerCase().includes('.mp3') ||
                         mediaUrlStr.toLowerCase().includes('.ogg') ||
                         mediaUrlStr.toLowerCase().includes('.m4a');
          
          const arrayBuffer = await resp.arrayBuffer();
          const base64Data = Buffer.from(arrayBuffer).toString('base64');
          
          if (isAudio) {
            console.log('🎤 Audio/voice clip confirmed, processing...');
            const dataUrl = `data:${responseContentType || 'audio/wav'};base64,${base64Data}`;
            
            console.log('📊 Audio converted, starting AI analysis...');
            
            try {
              const audioAnalysis = await audioAnalysisFlow({ audio: dataUrl });
              
              if (!audioAnalysis) {
                responseText = "Sorry, I couldn't analyze the audio clip. Please try again.";
              } else {
                // Build response from audio analysis
                let analysisText = `AUDIO/VOICE ANALYSIS\n\n`;
                
                if (audioAnalysis.transcription) {
                  analysisText += `Transcription:\n${audioAnalysis.transcription}\n\n`;
                }
                
                if (audioAnalysis.detectedSymptoms && audioAnalysis.detectedSymptoms.length > 0) {
                  analysisText += `Detected Symptoms:\n${audioAnalysis.detectedSymptoms.join(', ')}\n\n`;
                }
                
                if (audioAnalysis.isCoughDetected || audioAnalysis.isBreathlessnessDetected || audioAnalysis.isFatigueDetected) {
                  analysisText += `Acoustic Cues Detected:\n`;
                  if (audioAnalysis.isCoughDetected) analysisText += `• Cough detected\n`;
                  if (audioAnalysis.isBreathlessnessDetected) analysisText += `• Breathlessness/shortness of breath detected\n`;
                  if (audioAnalysis.isFatigueDetected) analysisText += `• Fatigue or weakness in voice detected\n`;
                  analysisText += '\n';
                }
                
                if (audioAnalysis.diagnosis) {
                  analysisText += `Possible Conditions:\n${audioAnalysis.diagnosis}\n\n`;
                }
                
                analysisText += `IMPORTANT: This is not a medical diagnosis. Always consult a healthcare professional for medical advice.`;
                
                responseText = analysisText;
                console.log('✅ Audio analysis complete');
              }
            } catch (audioError: any) {
              console.error('❌ Audio analysis error:', audioError);
              responseText = `Sorry, I encountered an error analyzing the audio: ${audioError.message || 'Unknown error'}. Please try sending the audio clip again.`;
            }
          } else if (responseContentType.startsWith('image/')) {
            // Handle image
            console.log('🖼️ Image confirmed, processing...');
            const dataUrl = `data:${responseContentType};base64,${base64Data}`;
            
            const analysis = await analyzeImageDisease({ image: dataUrl, context: bodyStr || undefined });
          
          if (!analysis || !analysis.summary || !analysis.possibleConditions || !analysis.recommendedActions) {
            responseText = "Sorry, the AI returned an incomplete analysis. Please try sending the image again.";
            } else {
              responseText = `IMAGE ANALYSIS\n\n` +
                `Summary:\n${analysis.summary}\n\n` +
                `Possible Conditions:\n${analysis.possibleConditions.replace(/\*/g, '•')}\n\n` +
                `Recommended Actions:\n${analysis.recommendedActions.replace(/\*/g, '•')}\n\n` +
                `Confidence: ${analysis.confidence}\n\n` +
                `IMPORTANT: This is not a medical diagnosis. Always consult a professional.`;
            }
          } else {
            responseText = `I received a ${responseContentType || 'file'}, but I can only analyze images and audio clips. Please send an image (JPG, PNG) or audio clip (WAV, MP3) for analysis.`;
          }
        }
      } catch (e: any) {
        console.error('❌ Media analysis error:', e);
        responseText = `Sorry, I couldn't analyze the media. Error: ${e.message || 'Unknown error'}. Please try again.`;
      }
    } else {
      // Text message processing
      try {
        const result = await messagingWebhook({ From: fromStr, Body: bodyStr });
      responseText = result.body;
      } catch (error: any) {
        console.error('❌ Error in messagingWebhook:', error);
        responseText = "Sorry, an error occurred while processing your message. Please try again.";
      }
    }
    
    // Send message via Twilio API
    // Only send if we have a valid user number (not Twilio's number from status callbacks)
    if (responseText && responseText.trim().length > 0 && !fromStr.includes('whatsapp:+14155238886')) {
      responseText = cleanResponseText(responseText);
      console.log('📤 Sending message via Twilio API to:', fromStr);
      
      // Optionally generate audio for text responses (text-to-speech)
      // Note: For WhatsApp, we'll send text first, then optionally send audio
      let sendResult = await twilioService.sendWhatsAppMessage({
        to: fromStr,
        body: responseText,
      });
      
      if (sendResult.success) {
        console.log('✅ Message sent successfully via Twilio API, SID:', sendResult.sid);
        
        // Optionally send audio version (commented out for now as it requires hosting audio files)
        // Uncomment and configure if you want to send audio responses
        /*
        try {
          const audioResult = await convertTextToSpeech({ text: responseText });
          if (audioResult && audioResult.audio) {
            // Upload audio to a public URL (e.g., S3, cloud storage) and send via WhatsApp
            // For now, we'll skip this as it requires additional infrastructure
            console.log('🎵 Audio generated (not sending via WhatsApp - requires hosted URL)');
          }
        } catch (audioError) {
          console.warn('⚠️ Could not generate audio:', audioError);
        }
        */
      } else {
        console.error('❌ Failed to send message via Twilio API:', sendResult.error);
      }
    } else if (fromStr.includes('whatsapp:+14155238886')) {
      console.log('⚠️ Skipping message send - this is a status callback, not a user message');
    }
  } catch (error: any) {
    console.error('❌ Error in processAndSendMessage:', error);
  }
}

// --- Main Webhook Logic --- //

export async function POST(request: NextRequest) {
  try {
    // Try to parse as formData first
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (e) {
      // If formData parsing fails, try URLSearchParams
      const text = await request.text();
      const params = new URLSearchParams(text);
      formData = new FormData();
      for (const [key, value] of params.entries()) {
        formData.append(key, value);
      }
    }

    // Log all formData entries for debugging
    console.log('=== Twilio Webhook Received ===');
    console.log('All formData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, typeof value === 'string' ? value : `[${typeof value}]`);
    }

    const from = formData.get('From');
    const body = formData.get('Body');
    const messageSid = formData.get('MessageSid');
    const messageType = formData.get('MessageType'); // text, media, document, etc.
    const numMediaStr = formData.get('NumMedia');
    const numMedia = numMediaStr ? parseInt(String(numMediaStr), 10) : 0;
    const mediaUrl = formData.get('MediaUrl0');
    const mediaContentType = formData.get('MediaContentType0');

    // Convert to strings and trim
    const fromStr = from ? String(from).trim() : '';
    const bodyStr = body ? String(body).trim() : '';
    const messageTypeStr = messageType ? String(messageType) : 'text';

    console.log('Parsed values:', {
      from: fromStr,
      body: bodyStr,
      bodyLength: bodyStr.length,
      messageSid: messageSid ? String(messageSid) : null,
      messageType: messageTypeStr,
      numMedia,
      hasMedia: numMedia > 0,
      mediaUrl: mediaUrl ? String(mediaUrl) : null,
      mediaContentType: mediaContentType ? String(mediaContentType) : null,
    });

    // Check if we have content to process
    if (!fromStr) {
      console.error('Missing From field');
      return NextResponse.json({ error: 'Missing required field: From' }, { status: 400 });
    }

    // Use the already parsed values
    const finalBodyStr = bodyStr;

    // --- Media Handling --- //
    // Check for media - documents might have MediaUrl0 even when NumMedia is 0
    const mediaUrlStr = mediaUrl ? String(mediaUrl) : null;
    const mediaContentTypeStr = mediaContentType ? String(mediaContentType) : null;
    
    // Determine if we have media:
    // 1. NumMedia > 0 (standard case)
    // 2. MessageType is document/media and we have a mediaUrl
    // 3. We have a mediaUrl even if NumMedia is 0 (edge case)
    const hasMedia = numMedia > 0 || 
                     (messageTypeStr !== 'text' && messageTypeStr !== '' && mediaUrlStr) || 
                     (mediaUrlStr && mediaContentTypeStr);
    
    console.log('📷 Media check:', {
      messageType: messageTypeStr,
      numMedia,
      hasMediaUrl: !!mediaUrlStr,
      hasContentType: !!mediaContentTypeStr,
      calculatedHasMedia: hasMedia,
      mediaUrl: mediaUrlStr ? mediaUrlStr.substring(0, 100) + '...' : null,
      mediaContentType: mediaContentTypeStr,
    });

    // Only return empty if body is truly empty AND no media AND not a status callback
    // Status callbacks (sent, delivered, read) have From as Twilio's number, not the user
    // Also, status callbacks have MessageSid starting with 'SM' and are from Twilio
    const isStatusCallback = (
      (messageTypeStr === 'text' || !messageTypeStr) && 
      !finalBodyStr && 
      fromStr.includes('whatsapp:+14155238886') &&
      messageSid && 
      String(messageSid).startsWith('SM')
    );
    
    if (!finalBodyStr && !hasMedia && !isStatusCallback) {
      // For document messages without media URL, try to fetch it
      // This handles voice clips sent as documents (WAV files, etc.)
      if (messageTypeStr === 'document' && messageSid) {
        console.log('📎 Document message detected (possibly voice clip), fetching media from Twilio API...');
        console.log('📎 MessageSid:', String(messageSid));
        const messageSidStr = String(messageSid);
        
        // Process asynchronously - fetch media and then process
        (async () => {
          try {
            console.log('🔄 Fetching media from Twilio API for message:', messageSidStr);
            const { mediaUrl, mediaContentType } = await twilioService.fetchMessageMedia(messageSidStr);
            
            if (mediaUrl && mediaContentType) {
              console.log('✅ Media fetched from API:', {
                mediaUrl: mediaUrl.substring(0, 100) + '...',
                mediaContentType,
                isAudio: mediaContentType.startsWith('audio/') || 
                         mediaContentType.includes('wav') || 
                         mediaContentType.includes('mpeg') || 
                         mediaContentType.includes('mp3'),
              });
              
              // Process the media (could be audio, image, etc.)
              await processAndSendMessage(fromStr, finalBodyStr, 1, mediaUrl, mediaContentType);
            } else {
              console.log('⚠️ No media found in document message after API fetch');
              await twilioService.sendWhatsAppMessage({
                to: fromStr,
                body: "I received a document, but couldn't access its contents. Please send the file as an image or audio clip directly for analysis.",
              });
            }
          } catch (error: any) {
            console.error('❌ Error fetching document media:', error);
            console.error('Error details:', error.message, error.stack);
            await twilioService.sendWhatsAppMessage({
              to: fromStr,
              body: "Sorry, I couldn't access the document you sent. Please try sending it again or send as an image/audio clip directly.",
            });
          }
        })();
        
        // Return empty response immediately
        return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
          status: 200,
          headers: { 
            'Content-Type': 'text/xml; charset=utf-8',
            'Cache-Control': 'no-cache'
          } 
        });
      }
      
      console.log('⚠️ Empty message body and no media. Returning empty response.');
      return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
        headers: { 'Content-Type': 'text/xml' } 
      });
    }

    // Process asynchronously to avoid timeout
    // Immediately acknowledge the webhook, then process and send message via API
    // Use calculated hasMedia instead of numMedia
    const effectiveNumMedia = hasMedia ? (numMedia > 0 ? numMedia : 1) : 0;
    processAndSendMessage(fromStr, finalBodyStr, effectiveNumMedia, mediaUrlStr, mediaContentTypeStr).catch((error) => {
      console.error('❌ Error in async message processing:', error);
    });

    // Return empty TwiML response immediately to acknowledge webhook
    // The actual response will be sent via Twilio API asynchronously
    console.log('✅ Acknowledging webhook immediately, processing message asynchronously...');
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', { 
      status: 200,
      headers: { 
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache'
      } 
    });

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
