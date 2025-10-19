'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { analyzeSymptoms } from './symptom-analysis';
import { getHealthInfo } from './health-information-retrieval';

// --- Schema Definitions ---

const MessagingWebhookInputSchema = z.object({
  From: z.string().describe('The identifier (e.g., phone number) of the sender.'),
  Body: z.string().describe('The text content of the incoming message.'),
});
export type MessagingWebhookInput = z.infer<typeof MessagingWebhookInputSchema>;

const MessagingWebhookOutputSchema = z.object({
  body: z.string().describe('The text of the message to send back to the user.'),
});
export type MessagingWebhookOutput = z.infer<typeof MessagingWebhookOutputSchema>;

const MessageRouteSchema = z.enum([
  'symptom_analysis',
  'health_info',
  'unrelated',
]);

// --- AI-Powered Message Routing ---

const routeMessage = ai.defineFlow(
  {
    name: 'routeMessage',
    inputSchema: z.object({ message: z.string() }),
    outputSchema: MessageRouteSchema,
  },
  async ({ message }) => {
    const { text: result } = await ai.generate({
      model: 'gemini-1.5-flash',
      prompt: `You are an intelligent message router for a healthcare chatbot.
      Analyze the user's message and classify it into one of the following categories:
      - 'symptom_analysis': If the user is describing their own symptoms or how they feel (e.g., "I have a headache," "I feel sick").
      - 'health_info': If the user is asking a general question about a medical condition, treatment, or health topic (e.g., "What are the symptoms of diabetes?", "How to treat a cold?").
      - 'unrelated': If the message is a greeting, thank you, or not related to health.

      Message: "${message}"

      Classification:`,
      output: { schema: MessageRouteSchema },
      config: { temperature: 0 }, // Use low temperature for consistent classification
    });
    return result || 'unrelated';
  }
);


// --- Main Webhook Flow ---

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
    const route = await routeMessage({ message: input.Body });
    let responseText: string;

    console.log(`Routing message from ${input.From} to: ${route}`);

    if (route === 'symptom_analysis') {
      const symptomResult = await analyzeSymptoms({ symptoms: input.Body });
      responseText = `*Symptom Analysis*\n\n` +
        `*Possible Conditions:* ${symptomResult.possibleConditions}\n\n` +
        `*Recommended Actions:* ${symptomResult.recommendedActions}\n\n` +
        `_This is not a medical diagnosis. Please consult a professional._`;
    } else if (route === 'health_info') {
      const healthInfoResult = await getHealthInfo({ topic: input.Body });
      responseText = `*Health Information*\n\n` +
        `${healthInfoResult.summary}\n\n` +
        `_This is general information. Always consult a healthcare professional for medical advice._`;
    } else {
      responseText = "I can help with health-related questions. For example, you can ask me about a specific medical condition or describe your symptoms. Please be aware that I am an AI assistant and not a medical professional.";
    }
    
    console.log('Generated response for:', input.From, responseText);
    
    return { body: responseText };
  }
);
