'use server';
import { ActionResult, VoiceAnalysisAction, AudioAnalysisAction, ImageDiseaseAnalysisAction, SignLanguageFlowAction } from './types';

import {
  analyzeSymptoms,
  SymptomAnalysisInput,
} from '@/ai/flows/symptom-analysis';
import {
  getHealthInfo,
  HealthInfoInput,
} from '@/ai/flows/health-information-retrieval';
import { convertTextToSpeech, TextToSpeechInput } from '@/ai/flows/text-to-speech';
import { analyzeImageDisease, ImageDiseaseAnalysisInput } from '@/ai/flows/image-disease-analysis';
import { analyzeVoice, VoiceAnalysisInput } from '@/ai/flows/voice-analysis';
import { audioAnalysisFlow, AudioAnalysisInput } from '@/ai/flows/audio-analysis';
import { signLanguageAnalysisFlow, SignLanguageInput } from '@/ai/flows/sign-language-analysis';
import { textToSignLanguageFlow, TextToSignLanguageInput } from '@/ai/flows/text-to-sign-language';

async function toBase64(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
  }

export async function submitUserMessage(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const intent = formData.get('intent') as string;
  const message = formData.get('message') as string;

  try {
    if (intent === 'symptom') {
      const result = await analyzeSymptoms({
        symptoms: message,
      } as SymptomAnalysisInput);
      return { type: 'symptom_analysis', payload: result };
    } else if (intent === 'info') {
      const result = await getHealthInfo({
        topic: message,
      } as HealthInfoInput);
      return { type: 'health_info', payload: result };
    } else {
      throw new Error(`Unknown intent: ${intent}`);
    }
  } catch (e: any) {
    console.error(e);
    return { type: 'error', payload: { message: e.message } };
  }
}

export async function getAudioForText(
  prevState: any,
  formData: FormData
): Promise<{ audio?: string; error?: string }> {
  const text = formData.get('text') as string;
  if (!text) return { error: 'No text provided.' };

  try {
    const result = await convertTextToSpeech({ text } as TextToSpeechInput);
    return { audio: result.audio };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to generate audio.' };
  }
}

export async function analyzeDiseaseFromImage(
    prevState: any,
    formData: FormData
  ): Promise<ImageDiseaseAnalysisAction> {
    const imageFile = formData.get('image') as File;
    const context = formData.get('context') as string;
    if (!imageFile) return { success: false, message: 'No image provided.' };
  
    try {
      const imageBase64 = await toBase64(imageFile);
      const result = await analyzeImageDisease({
        image: `data:${imageFile.type};base64,${imageBase64}`,
        context,
      } as ImageDiseaseAnalysisInput);
      return { success: true, data: result };
    } catch (e: any) {
      console.error(e);
      return { success: false, message: 'Failed to analyze image.' };
    }
  }

export async function analyzeVoiceTranscript(
    prevState: any,
    formData: FormData
  ): Promise<VoiceAnalysisAction> {
    const transcript = formData.get('transcript') as string;
    if (!transcript) return { success: false, message: 'No transcript provided.' };

    try {
        const result = await analyzeVoice({ transcript } as VoiceAnalysisInput);
        return { success: true, data: result };
    } catch (e: any) {
        console.error(e);
        return { success: false, message: 'Failed to analyze voice.' };
    }
}

export async function analyzeAudioFile(
    prevState: any,
    formData: FormData
  ): Promise<AudioAnalysisAction> {
    const audioFile = formData.get('audio') as File;
    if (!audioFile) return { success: false, message: 'No audio file provided.' };
  
    try {
      const audioBase64 = await toBase64(audioFile);
      const result = await audioAnalysisFlow({ audio: `data:${audioFile.type};base64,${audioBase64}` } as AudioAnalysisInput);
      return { success: true, data: result };
    } catch (e: any) {
      console.error(e);
      return { success: false, message: 'Failed to analyze audio.' };
    }
  }

  export async function processSignLanguageMessage(
    prevState: any,
    formData: FormData
  ): Promise<SignLanguageFlowAction> {
    const videoFile = formData.get('video') as File;
  
    if (!videoFile) {
      return { success: false, message: 'No video provided.' };
    }
  
    try {
      const videoBase64 = await toBase64(videoFile);
      const { text: translatedText, intent } = await signLanguageAnalysisFlow({ video: `data:${videoFile.type};base64,${videoBase64}` } as SignLanguageInput);
  
      let responseText: string;
  
      if (intent === 'symptom') {
        const { possibleConditions, recommendedActions } = await analyzeSymptoms({ symptoms: translatedText });
        responseText = `Possible Conditions: ${possibleConditions}. Recommended Actions: ${recommendedActions}.`;
      } else if (intent === 'info') {
        const { summary } = await getHealthInfo({ topic: translatedText });
        responseText = summary;
      } else {
        // This case should not be reached given the enum in the schema
        throw new Error(`Unknown intent: ${intent}`);
      }
  
      const { video: responseVideo } = await textToSignLanguageFlow({ text: responseText } as TextToSignLanguageInput);
  
      return {
        success: true,
        data: {
          translatedText,
          responseText,
          responseVideo,
        },
      };
    } catch (e: any) {
      console.error(e);
      return { success: false, message: 'An error occurred during sign language processing.' };
    }
  }
