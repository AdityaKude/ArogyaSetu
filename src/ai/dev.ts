import { config } from 'dotenv';
config();

import '@/ai/flows/symptom-analysis.ts';
import '@/ai/flows/health-information-retrieval.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/messaging-webhook.ts';
import '@/ai/flows/generate-quiz.ts';
