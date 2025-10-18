'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { gemini15Flash } from '@genkit-ai/googleai';

// Define the model to be used for analysis
const model = gemini15Flash;

// Define the input schema for the sign language analysis flow
const SignLanguageInputSchema = z.object({
  video: z.string().describe('A data URL representing the video to be analyzed.'),
});
export type SignLanguageInput = z.infer<typeof SignLanguageInputSchema>;

// Define the output schema for the sign language analysis flow
const SignLanguageOutputSchema = z.object({
  text: z.string().describe('The translated text from the sign language video.'),
  intent: z.enum(['symptom', 'info']).describe('The user intent, which can be either "symptom" or "info".'),
});
export type SignLanguageOutput = z.infer<typeof SignLanguageOutputSchema>;

// Define the sign language analysis flow
export const signLanguageAnalysisFlow = ai.defineFlow(
  {
    name: 'signLanguageAnalysisFlow',
    inputSchema: SignLanguageInputSchema,
    outputSchema: SignLanguageOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model,
      prompt: [
        {
          text: `You are an expert in Indian Sign Language (ISL).
You will receive a video of a person signing.
Your task is to analyze the video, translate the signs into a coherent English sentence, and determine the user's intent.
The user's intent will be either 'symptom' (if they are describing a health issue) or 'info' (if they are asking a question).

Analyze the video provided and return the translated text and the determined intent.
`,
        },
        { media: { url: input.video } },
      ],
      output: { schema: SignLanguageOutputSchema },
    });
    return output;
  }
);
