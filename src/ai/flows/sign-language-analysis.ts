import {ai} from '../genkit';
import {z} from 'zod';
import {googleAI} from '@genkit-ai/googleai';

// Define the input schema for the sign language analysis flow
export const SignLanguageInputSchema = z.object({
  video: z.string().describe('Base64 encoded video or image data URI'),
});
export type SignLanguageInput = z.infer<typeof SignLanguageInputSchema>;

// Define the output schema for the sign language analysis flow
export const SignLanguageOutputSchema = z.object({
  text: z.string().describe('The translated text from the sign language video'),
  intent: z.enum(['symptom', 'info']).describe("The user's intent, either 'symptom' or 'info'"),
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
        { text: `You are an expert in Indian Sign Language (ISL).
        You will receive a video of a person signing.
        Your task is to analyze the video, translate the signs into a coherent English sentence, and determine the user's intent.
        The intent MUST be one of: 'symptom' (if the user is describing their health problems) or 'info' (if the user is asking for information about a health topic).
        Example 1: A video showing signs for "I have a headache". Output should be: { text: "I have a headache", intent: "symptom" }
        Example 2: A video showing signs for "What is diabetes?". Output should be: { text: "What is diabetes?", intent: "info" }
        `},
        { media: { url: input.video } },
      ],
      output: { schema: SignLanguageOutputSchema },
    });

    if (!output) {
      throw new Error('Failed to analyze sign language video.');
    }
    return output;
  }
);
