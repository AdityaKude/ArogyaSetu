'use server';

/**
 * @fileOverview Analyzes audio clips to detect health-related acoustic cues.
 *
 * This flow analyzes raw audio data to identify vocal symptoms like
 * coughing, shortness of breath, or fatigue.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Base64-encoded audio data URI.
const AudioAnalysisInputSchema = z.object({
  audio: z.string().describe("The audio data as a Base64-encoded data URI."),
});
export type AudioAnalysisInput = z.infer<typeof AudioAnalysisInputSchema>;

const AudioAnalysisOutputSchema = z.object({
  isCoughDetected: z.boolean().describe('True if coughing sounds are detected.'),
  isBreathlessnessDetected: z.boolean().describe('True if signs of breathlessness or heavy breathing are detected.'),
  isFatigueDetected: z.boolean().describe('True if the user sounds fatigued or mentions tiredness.'),
  detectedSymptoms: z.array(z.string()).describe('A list of specific symptoms detected from the audio analysis.'),
  transcription: z.string().optional().describe('A transcription of the speech in the audio.'),
});
export type AudioAnalysisOutput = z.infer<typeof AudioAnalysisOutputSchema>;

export const audioAnalysisFlow = ai.defineFlow(
  {
    name: 'audioAnalysisFlow',
    inputSchema: AudioAnalysisInputSchema,
    outputSchema: AudioAnalysisOutputSchema,
  },
  async (input) => {
    const model = googleAI.model('gemini-pro-latest');
    const { output } = await ai.generate({
      model,
      prompt: [
        { text: `You are an expert medical assistant specializing in acoustic analysis.
You will receive an audio clip. Your task is to analyze this audio to identify potential health-related acoustic cues.
Listen for sounds like coughing, wheezing, gasping, or signs of a strained or weak voice.

Based on the audio, determine the following in JSON format:
1.  isCoughDetected: Is there any sound of coughing?
2.  isBreathlessnessDetected: Are there signs of difficulty breathing, gasping, or shortness of breath?
3.  isFatigueDetected: Does the speaker's voice indicate fatigue?
4.  detectedSymptoms: List any other specific symptoms you can infer from the audio.
5.  transcription: Transcribe the speech from the audio, if any.
`},
        { media: { url: input.audio } },
      ],
      output: { schema: AudioAnalysisOutputSchema },
    });

    if (!output) {
      throw new Error('Failed to analyze audio clip.');
    }
    return output;
  }
);
