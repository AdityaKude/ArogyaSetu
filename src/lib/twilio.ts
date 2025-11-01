const twilio = require('twilio');

export interface WhatsAppMessage {
  to: string;
  body: string;
  from?: string;
}

export interface SMSMessage {
  to: string;
  body: string;
  from?: string;
}

export class TwilioService {
  private static instance: TwilioService;
  private client: any;

  private constructor() {
    // Initialize the Twilio client correctly as a function call, not with new
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
  }

  public static getInstance(): TwilioService {
    if (!TwilioService.instance) {
      TwilioService.instance = new TwilioService();
    }
    return TwilioService.instance;
  }

  /**
   * Send WhatsApp message
   */
  async sendWhatsAppMessage(message: WhatsAppMessage & { mediaUrl?: string }) {
    try {
      const messageParams: any = {
        from: message.from || process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886',
        to: message.to.startsWith('whatsapp:') ? message.to : `whatsapp:${message.to}`,
        body: message.body,
      };

      // Add media URL if provided (for audio responses)
      if (message.mediaUrl) {
        messageParams.mediaUrl = [message.mediaUrl];
        // If media is provided, body becomes optional caption
      }

      const result = await this.client.messages.create(messageParams);

      console.log('WhatsApp message sent:', result.sid);
      return { success: true, sid: result.sid };
    } catch (error: any) {
      console.error('WhatsApp message failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send SMS message
   */
  async sendSMSMessage(message: SMSMessage) {
    try {
      const result = await this.client.messages.create({
        from: message.from || process.env.TWILIO_PHONE_NUMBER,
        to: message.to,
        body: message.body,
      });

      console.log('SMS message sent:', result.sid);
      return { success: true, sid: result.sid };
    } catch (error: any) {
      console.error('SMS message failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send health information via WhatsApp
   */
  async sendHealthInfo(phoneNumber: string, healthInfo: string) {
    const message = {
      to: phoneNumber,
      body: `🏥 ArogyaSetu Health Information:\n\n${healthInfo}\n\n⚠️ Disclaimer: This is not a medical diagnosis. Please consult a healthcare professional for medical advice.`,
    };

    return await this.sendWhatsAppMessage(message);
  }

  /**
   * Send symptom analysis via WhatsApp
   */
  async sendSymptomAnalysis(phoneNumber: string, analysis: string) {
    const message = {
      to: phoneNumber,
      body: `🔍 ArogyaSetu Symptom Analysis:\n\n${analysis}\n\n⚠️ Disclaimer: This is not a medical diagnosis. Please consult a healthcare professional for medical advice.`,
    };

    return await this.sendWhatsAppMessage(message);
  }

  /**
   * Fetch media URLs from a message using MessageSid
   * This is needed for document messages that don't include media URLs in the webhook
   */
  async fetchMessageMedia(messageSid: string, retries: number = 3): Promise<{ mediaUrl: string | null; mediaContentType: string | null }> {
    try {
      console.log('📎 Fetching media for message SID:', messageSid);
      
      // For document messages, media might not be immediately available
      // Try multiple times with delays
      for (let attempt = 1; attempt <= retries; attempt++) {
        if (attempt > 1) {
          // Wait before retry (exponential backoff)
          const delay = Math.min(1000 * Math.pow(2, attempt - 2), 3000);
          console.log(`📎 Retry attempt ${attempt} after ${delay}ms delay...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        // Get media list from the message
        const mediaList = await this.client.messages(messageSid).media.list({ limit: 10 });
        
        console.log(`📎 Media list response (attempt ${attempt}):`, {
          length: mediaList?.length || 0,
          mediaList: mediaList && mediaList.length > 0 ? JSON.stringify(mediaList.map((m: any) => ({ 
            sid: m.sid, 
            contentType: m.contentType,
            uri: m.uri?.substring(0, 50)
          }))) : '[]'
        });
        
        if (mediaList && mediaList.length > 0) {
          const firstMedia = mediaList[0];
          
          // The media object has a direct URI that we can use
          const accountSid = process.env.TWILIO_ACCOUNT_SID!;
          
          // Extract media SID from URI if needed, or construct URL properly
          let mediaUrl: string;
          if (firstMedia.uri) {
            // If URI is a relative path, construct full URL
            if (firstMedia.uri.startsWith('/')) {
              mediaUrl = `https://api.twilio.com${firstMedia.uri.replace('.json', '')}`;
            } else if (firstMedia.uri.startsWith('http')) {
              mediaUrl = firstMedia.uri.replace('.json', '');
            } else {
              // Use the media SID directly to construct URL
              const mediaSid = firstMedia.sid || firstMedia.uri.split('/').pop()?.replace('.json', '');
              mediaUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages/${messageSid}/Media/${mediaSid}`;
            }
          } else {
            // Fallback: construct from media SID
            const mediaSid = firstMedia.sid;
            mediaUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages/${messageSid}/Media/${mediaSid}`;
          }
          
          const contentType = firstMedia.contentType || null;
          
          console.log('📎 Constructed media URL:', {
            url: mediaUrl.substring(0, 100) + '...',
            contentType,
            mediaSid: firstMedia.sid
          });
          
          return { mediaUrl, mediaContentType: contentType };
        }
        
        // If no media found and this isn't the last attempt, continue to retry
        if (attempt < retries) {
          console.log(`⚠️ No media found on attempt ${attempt}, will retry...`);
          continue;
        }
      }
      
      console.log('⚠️ No media found in message after all retries');
      return { mediaUrl: null, mediaContentType: null };
    } catch (error: any) {
      console.error('❌ Error fetching message media:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack?.substring(0, 200)
      });
      return { mediaUrl: null, mediaContentType: null };
    }
  }
}

export const twilioService = TwilioService.getInstance();
