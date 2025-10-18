'use client';
import type { ReactNode } from 'react';
import type { SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import type { HealthInfoOutput } from '@/ai/flows/health-information-retrieval';
import type { ImageDiseaseAnalysisOutput } from '@/ai/flows/image-disease-analysis';
import type { VoiceAnalysisOutput } from '@/ai/flows/voice-analysis';
import type { AudioAnalysisOutput } from '@/ai/flows/audio-analysis';

export interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  display: ReactNode;
  createdAt: Date;
}

export interface ActionResult {
  type: 'symptom_analysis' | 'health_info' | 'error' | null;
  payload: SymptomAnalysisOutput | HealthInfoOutput | { message: string } | null;
}

export interface TextToSpeechAction {
  audio?: string;
  error?: string;
}

export type ImageDiseaseAnalysisAction = {
  success: boolean;
  message?: string;
  data?: ImageDiseaseAnalysisOutput;
};

export type VoiceAnalysisAction = {
  success: boolean;
  message?: string;
  data?: VoiceAnalysisOutput;
};

export type AudioAnalysisAction = {
  success: boolean;
  message?: string;
  data?: AudioAnalysisOutput;
};

export type SignLanguageFlowAction = {
    success: boolean;
    message?: string;
    data?: {
        translatedText: string;
        responseText: string;
        responseVideo: string;
    };
};
