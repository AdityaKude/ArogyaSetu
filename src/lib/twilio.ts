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
  async sendWhatsAppMessage(message: WhatsAppMessage) {
    try {
      const result = await this.client.messages.create({
        from: message.from || process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886',
        to: message.to.startsWith('whatsapp:') ? message.to : `whatsapp:${message.to}`,
        body: message.body,
      });

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
}

export const twilioService = TwilioService.getInstance();
