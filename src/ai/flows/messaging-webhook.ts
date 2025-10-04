'use server';

/**
 * @fileOverview Webhook for handling incoming messages from various platforms (WhatsApp, SMS, etc.).
 *
 * This flow is designed to be triggered by a webhook from a service like Twilio.
 * It processes the incoming message, routes it to the appropriate AI flow,
 * and prepares a response to be sent back to the user.
 *
 * - messagingWebhook - The main flow function.
 * - MessagingWebhookInput - The input type, mimicking a payload from a messaging provider.
 * - MessagingWebhookOutput - The output type, formatted for a messaging provider.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { analyzeSymptoms } from './symptom-analysis';
import { getHealthInfo } from './health-information-retrieval';

// Simplified schema based on what a provider like Twilio might send for SMS or WhatsApp.
const MessagingWebhookInputSchema = z.object({
  From: z.string().describe('The phone number or identifier that sent the message (e.g., +14155238886).'),
  Body: z.string().describe('The text of the incoming message.'),
});
export type MessagingWebhookInput = z.infer<typeof MessagingWebhookInputSchema>;

const MessagingWebhookOutputSchema = z.object({
    body: z.string().describe('The text of the message to send back to the user.'),
});
export type MessagingWebhookOutput = z.infer<typeof MessagingWebhookOutputSchema>;


export async function messagingWebhook(input: MessagingWebhookInput): Promise<MessagingWebhookOutput> {
    return messagingWebhookFlow(input);
}


const messagingWebhookFlow = ai.defineFlow(
  {
    name: 'messagingWebhookFlow',
    inputSchema: MessagingWebhookInputSchema,
    outputSchema: MessagingWebhookOutputSchema,
  },
  async (input) => {
    const userMessage = input.Body.toLowerCase();
    let responseText: string;

    // Simple intent detection based on keywords.
    // A more advanced implementation could use an AI prompt for classification.
    if (userMessage.includes('symptom') || userMessage.includes('feel')) {
      const result = await analyzeSymptoms({ symptoms: input.Body });
      responseText = `🔍 Symptom Analysis:\n\nPossible Conditions: ${result.possibleConditions}\n\nRecommended Actions: ${result.recommendedActions}\n\n⚠️ Disclaimer: This is not a medical diagnosis. Please consult a healthcare professional.`;
    } else {
      const result = await getHealthInfo({ query: input.Body });
      responseText = `🏥 Health Information:\n\n${result.summary}\n\n⚠️ Disclaimer: This is general health information. Please consult a healthcare professional for medical advice.`;
    }
    
    // Note: Response will be sent via the webhook route
    console.log('Generated response for:', input.From, responseText);
    
    return {
      body: responseText,
    };
  }
);
