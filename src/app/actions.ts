'use server';

import { analyzeSymptoms } from '@/ai/flows/symptom-analysis';
import { getHealthInfo } from '@/ai/flows/health-information-retrieval';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech';
import { z } from 'zod';
import type { ActionResult, TextToSpeechAction } from '@/lib/types';

const messageSchema = z.object({
  intent: z.enum(['symptom', 'info']),
  message: z.string().min(3, 'Message must be at least 3 characters.'),
});

export async function submitUserMessage(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    intent: formData.get('intent'),
    message: formData.get('message'),
  };

  const validatedFields = messageSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      type: 'error',
      payload: {
        message:
          validatedFields.error.issues[0].message ||
          'Invalid input provided.',
      },
    };
  }

  const { intent, message } = validatedFields.data;

  try {
    if (intent === 'symptom') {
      const result = await analyzeSymptoms({ symptoms: message });
      return { type: 'symptom_analysis', payload: result };
    } else {
      const result = await getHealthInfo({ query: message });
      return { type: 'health_info', payload: result };
    }
  } catch (error) {
    console.error('AI action failed:', error);
    return {
      type: 'error',
      payload: {
        message: 'An unexpected error occurred. Please try again later.',
      },
    };
  }
}

const ttsSchema = z.object({
  text: z.string(),
});

export async function getAudioForText(
  prevState: any,
  formData: FormData
): Promise<TextToSpeechAction> {
  const validatedFields = ttsSchema.safeParse({ text: formData.get('text') });

  if (!validatedFields.success) {
    return { error: 'Invalid text provided.' };
  }
  
  try {
    const { audio } = await convertTextToSpeech({ text: validatedFields.data.text });
    return { audio };
  } catch(e) {
    console.error(e);
    return { error: 'Failed to convert text to speech.' };
  }
}
