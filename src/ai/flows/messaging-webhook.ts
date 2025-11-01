'use server';

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
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
    // Ensure message is not empty
    if (!message || message.trim().length === 0) {
      return 'unrelated';
    }

    try {
      // Use text generation instead of structured output to avoid null returns
      const result = await ai.generate({
        model: googleAI.model('gemini-pro-latest'),
        prompt: `You are an intelligent message router for a healthcare chatbot.
Analyze the user's message and classify it into EXACTLY ONE of these categories:
1. symptom_analysis - if the user is describing their own symptoms or how they feel
2. health_info - if the user is asking a general question about a medical condition or health topic
3. unrelated - if the message is a greeting, thank you, or not related to health

Message: "${message}"

Respond with ONLY one word: symptom_analysis, health_info, or unrelated.
Do not include any explanation, just the classification word.`,
        config: { temperature: 0.1 },
      });
      
      // Parse the text response
      const responseText = result.text?.trim().toLowerCase() || '';
      
      // Check for valid enum values (case-insensitive)
      if (responseText.includes('symptom_analysis')) {
        return 'symptom_analysis';
      } else if (responseText.includes('health_info')) {
        return 'health_info';
      } else if (responseText.includes('unrelated')) {
        return 'unrelated';
      }
      
      // Fallback: Try to infer from message content
      const messageLower = message.toLowerCase();
      const symptomKeywords = ['pain', 'ache', 'hurt', 'sick', 'fever', 'cough', 'headache', 'symptom', 'feel', 'feeling', 'unwell'];
      const healthInfoKeywords = ['what is', 'what are', 'how to', 'tell me about', 'explain', 'information', 'define'];
      
      if (symptomKeywords.some(keyword => messageLower.includes(keyword))) {
        console.log('Inferred symptom_analysis from keywords');
        return 'symptom_analysis';
      } else if (healthInfoKeywords.some(keyword => messageLower.includes(keyword))) {
        console.log('Inferred health_info from keywords');
        return 'health_info';
      }
      
      console.warn(`AI returned unexpected classification: "${responseText}", defaulting to unrelated`);
      return 'unrelated';
    } catch (error: any) {
      console.error('Error in routeMessage:', error);
      // Default to unrelated on error
      return 'unrelated';
    }
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
    // Ensure Body is not empty before processing
    if (!input.Body || input.Body.trim().length === 0) {
      return {
        body: "I can help with health-related questions. For example, you can ask me about a specific medical condition or describe your symptoms. Please be aware that I am an AI assistant and not a medical professional."
      };
    }

    const route = await routeMessage({ message: input.Body });
    let responseText: string;

    console.log(`Routing message from ${input.From} to: ${route}`);

    if (route === 'symptom_analysis') {
      const symptomResult = await analyzeSymptoms({ symptoms: input.Body });
      // Format for WhatsApp (no markdown support)
      responseText = `SYMPTOM ANALYSIS\n\n` +
        `Possible Conditions:\n${symptomResult.possibleConditions}\n\n` +
        `Recommended Actions:\n${symptomResult.recommendedActions}\n\n` +
        `IMPORTANT: This is not a medical diagnosis. Please consult a professional.`;
    } else if (route === 'health_info') {
      const healthInfoResult = await getHealthInfo({ topic: input.Body });
      // Format for WhatsApp (no markdown support)
      responseText = `HEALTH INFORMATION\n\n` +
        `${healthInfoResult.summary}\n\n` +
        `IMPORTANT: This is general information. Always consult a healthcare professional for medical advice.`;
    } else {
      responseText = "I can help with health-related questions. For example, you can ask me about a specific medical condition or describe your symptoms. Please be aware that I am an AI assistant and not a medical professional.";
    }
    
    console.log('Generated response for:', input.From, responseText);
    
    return { body: responseText };
  }
);
