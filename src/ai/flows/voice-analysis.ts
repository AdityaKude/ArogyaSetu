'use server';

/**
 * @fileOverview Analyzes transcribed speech to detect health-related acoustic cues.
 *
 * This flow does not analyze raw audio but instead interprets transcribed text
 * to identify vocal symptoms like coughing, shortness of breath, or fatigue.
 * It serves as a proxy for a full acoustic analysis model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceAnalysisInputSchema = z.object({
  transcript: z.string().describe('The text transcribed from user\'s speech.'),
});
export type VoiceAnalysisInput = z.infer<typeof VoiceAnalysisInputSchema>;

const VoiceAnalysisOutputSchema = z.object({
  isCoughDetected: z.boolean().describe('True if coughing sounds are detected or mentioned.'),
  isBreathlessnessDetected: z.boolean().describe('True if signs of breathlessness or heavy breathing are detected.'),
  isFatigueDetected: z.boolean().describe('True if the user sounds fatigued or mentions tiredness.'),
  detectedSymptoms: z.array(z.string()).describe('A list of specific symptoms detected from the voice analysis.'),
});
export type VoiceAnalysisOutput = z.infer<typeof VoiceAnalysisOutputSchema>;

export async function analyzeVoice(input: VoiceAnalysisInput): Promise<VoiceAnalysisOutput> {
  return voiceAnalysisFlow(input);
}

const voiceAnalysisPrompt = ai.definePrompt({
  name: 'voiceAnalysisPrompt',
  input: { schema: VoiceAnalysisInputSchema },
  output: { schema: VoiceAnalysisOutputSchema },
  prompt: `You are an expert medical assistant specializing in acoustic analysis.
You will receive a text transcript of a user's speech. Your task is to analyze this text to infer potential health-related acoustic cues.

Look for explicit mentions of symptoms (e.g., "I have a cough") and para-linguistic cues transcribed as text (e.g., "[cough]", "[gasp]", "[sigh]").

Based on the transcript, determine the following:
1.  isCoughDetected: Is there any indication of coughing?
2.  isBreathlessnessDetected: Are there signs of difficulty breathing, gasping, or shortness of breath?
3.  isFatigueDetected: Does the user mention being tired, or are there long pauses or sighs that might indicate fatigue?
4.  detectedSymptoms: List any other specific symptoms you can infer from the text.

Transcript: {{{transcript}}}
`,
});

const voiceAnalysisFlow = ai.defineFlow(
  {
    name: 'voiceAnalysisFlow',
    inputSchema: VoiceAnalysisInputSchema,
    outputSchema: VoiceAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await voiceAnalysisPrompt(input);
    if (!output) {
      throw new Error('Failed to analyze voice transcript.');
    }
    return output;
  }
);
