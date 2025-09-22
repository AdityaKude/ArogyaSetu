import type { SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import type { HealthInfoOutput } from '@/ai/flows/health-information-retrieval';

export type ActionResult = {
  type: 'symptom_analysis' | 'health_info' | 'error' | null;
  payload: SymptomAnalysisOutput | HealthInfoOutput | { message: string } | null;
};

export type DisplayMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  display: React.ReactNode;
  createdAt: Date;
};

export type EmergencyContact = {
  name: string;
  phone: string;
  type: 'Ambulance' | 'Police' | 'Fire' | 'General';
};

export type TextToSpeechAction = {
    audio?: string;
    error?: string;
};
