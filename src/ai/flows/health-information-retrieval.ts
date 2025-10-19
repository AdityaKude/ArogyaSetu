'use server';
/**
 * @fileOverview Retrieves summaries and key information about diseases and health topics.
 *
 * - getHealthInfo - A function that takes a topic and returns health information.
 * - HealthInfoInput - The input type for the getHealthInfo function.
 * - HealthInfoOutput - The return type for the getHealthInfo function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import {z} from 'genkit';

const HealthInfoInputSchema = z.object({
  topic: z.string().describe('The user query about a disease or health topic.'),
});
export type HealthInfoInput = z.infer<typeof HealthInfoInputSchema>;

const HealthInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the health information.'),
});
export type HealthInfoOutput = z.infer<typeof HealthInfoOutputSchema>;

export async function getHealthInfo(input: HealthInfoInput): Promise<HealthInfoOutput> {
  return healthInfoFlow(input);
}

const healthInfoFlow = ai.defineFlow(
  {
    name: 'healthInfoFlow',
    inputSchema: HealthInfoInputSchema,
    outputSchema: HealthInfoOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: googleAI.model('gemini-pro-latest'),
      prompt: `You are a helpful AI assistant providing health information.\n  Summarize the following topic about a disease or health topic and provide key information:\n\n  Topic: ${input.topic}\n  `,
      output: { schema: HealthInfoOutputSchema },
    });
    return output!;
  }
);
