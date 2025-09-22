'use server';
/**
 * @fileOverview Retrieves summaries and key information about diseases and health topics.
 *
 * - getHealthInfo - A function that takes a query and returns health information.
 * - HealthInfoInput - The input type for the getHealthInfo function.
 * - HealthInfoOutput - The return type for the getHealthInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthInfoInputSchema = z.object({
  query: z.string().describe('The user query about a disease or health topic.'),
});
export type HealthInfoInput = z.infer<typeof HealthInfoInputSchema>;

const HealthInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the health information.'),
});
export type HealthInfoOutput = z.infer<typeof HealthInfoOutputSchema>;

export async function getHealthInfo(input: HealthInfoInput): Promise<HealthInfoOutput> {
  return healthInfoFlow(input);
}

const healthInfoPrompt = ai.definePrompt({
  name: 'healthInfoPrompt',
  input: {schema: HealthInfoInputSchema},
  output: {schema: HealthInfoOutputSchema},
  prompt: `You are a helpful AI assistant providing health information.
  Summarize the following query about a disease or health topic and provide key information:

  Query: {{{query}}}
  `,
});

const healthInfoFlow = ai.defineFlow(
  {
    name: 'healthInfoFlow',
    inputSchema: HealthInfoInputSchema,
    outputSchema: HealthInfoOutputSchema,
  },
  async input => {
    const {output} = await healthInfoPrompt(input);
    return output!;
  }
);
