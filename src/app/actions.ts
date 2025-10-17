'use server';

import { analyzeSymptoms } from '@/ai/flows/symptom-analysis';
import { getHealthInfo } from '@/ai/flows/health-information-retrieval';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech';
import { twilioService } from '@/lib/twilio';
import { z } from 'zod';
import { analyzeImageDisease } from '@/ai/flows/image-disease-analysis';
import { analyzeVoice } from '@/ai/flows/voice-analysis';
import { audioAnalysisFlow } from '@/ai/flows/audio-analysis';
import type { ActionResult, TextToSpeechAction, ImageDiseaseAnalysisAction, VoiceAnalysisAction, AudioAnalysisAction } from '@/lib/types';

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

const voiceAnalysisSchema = z.object({
  transcript: z.string().min(1, 'Transcript is required.'),
});

export async function analyzeVoiceTranscript(
  prevState: any,
  formData: FormData
): Promise<VoiceAnalysisAction> {
  const validatedFields = voiceAnalysisSchema.safeParse({
    transcript: formData.get('transcript'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid transcript provided.',
    };
  }

  try {
    const result = await analyzeVoice({ transcript: validatedFields.data.transcript });
    return { success: true, data: result };
  } catch (e) {
    console.error('Voice analysis failed:', e);
    return { success: false, message: 'Failed to analyze voice transcript. Please try again.' };
  }
}


// Image disease analysis
const imageAnalysisSchema = z.object({
  image: z.any(), // can be a File/Blob or data URL string
  context: z.string().optional(),
});

export async function analyzeDiseaseFromImage(
  prevState: any,
  formData: FormData
): Promise<ImageDiseaseAnalysisAction> {
  const rawImage = formData.get('image');
  const context = (formData.get('context') as string) || undefined;

  const validated = imageAnalysisSchema.safeParse({ image: rawImage, context });
  if (!validated.success || !rawImage) {
    return { success: false, message: 'Please provide an image.' };
  }

  try {
    let dataUrl: string | null = null;
    if (typeof rawImage === 'string') {
      dataUrl = rawImage as string;
    } else if (typeof Blob !== 'undefined' && rawImage instanceof Blob) {
      const blob = rawImage as Blob;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mime = (blob as any).type || 'image/jpeg';
      dataUrl = `data:${mime};base64,${base64}`;
    } else {
      return { success: false, message: 'Unsupported image input.' };
    }

    const result = await analyzeImageDisease({ image: dataUrl, context });
    return { success: true, data: result };
  } catch (e) {
    console.error('Image analysis failed:', e);
    return { success: false, message: 'Failed to analyze image. Try again.' };
  }
}

const audioAnalysisSchema = z.object({
    audio: z.any(), // Can be a File/Blob or data URL string
});

export async function analyzeAudioFile(
  prevState: any,
  formData: FormData
): Promise<AudioAnalysisAction> {
  const rawAudio = formData.get('audio');
  const validated = audioAnalysisSchema.safeParse({ audio: rawAudio });

  if (!validated.success || !rawAudio) {
    return { success: false, message: 'Please provide an audio file.' };
  }

  try {
    let dataUrl: string | null = null;
    if (typeof rawAudio === 'string') {
      dataUrl = rawAudio;
    } else if (typeof Blob !== 'undefined' && rawAudio instanceof Blob) {
      const blob = rawAudio as Blob;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mime = blob.type || 'audio/webm';
      dataUrl = `data:${mime};base64,${base64}`;
    } else {
      return { success: false, message: 'Unsupported audio input.' };
    }

    const result = await audioAnalysisFlow({ audio: dataUrl });
    return { success: true, data: result };
  } catch (e) {
    console.error('Audio analysis failed:', e);
    return { success: false, message: 'Failed to analyze audio. Please try again.' };
  }
}


// Authentication schemas
const userSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  language: z.string().min(1, 'Please select a language'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const userLoginSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(1, 'Password is required'),
});

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Mock user database (in a real app, this would be a proper database)
const mockUsers = [
  { id: 1, name: 'John Doe', phone: '+919876543210', language: 'en', password: 'password123', role: 'user' },
  { id: 2, name: 'Admin User', email: 'admin@arogyasetu.gov', password: 'admin123', role: 'admin' },
];

export async function userSignup(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string; redirect?: string }> {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    language: formData.get('language'),
    password: formData.get('password'),
  };

  const validatedFields = userSignupSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid input provided.',
    };
  }

  const { name, phone, language, password } = validatedFields.data;

  // Check if user already exists
  const existingUser = mockUsers.find(user => user.phone === phone);
  if (existingUser) {
    return {
      success: false,
      message: 'User with this phone number already exists.',
    };
  }

  // In a real app, you would hash the password and save to database
  const newUser = {
    id: mockUsers.length + 1,
    name,
    phone,
    language,
    password, // In real app: await bcrypt.hash(password, 10)
    role: 'user' as const,
  };

  mockUsers.push(newUser);

  return {
    success: true,
    message: 'Account created successfully!',
    redirect: '/chat',
  };
}

export async function userLogin(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string; redirect?: string }> {
  const rawData = {
    phone: formData.get('phone'),
    password: formData.get('password'),
  };

  const validatedFields = userLoginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid input provided.',
    };
  }

  const { phone, password } = validatedFields.data;

  // Find user
  const user = mockUsers.find(u => u.phone === phone && u.role === 'user');
  if (!user) {
    return {
      success: false,
      message: 'Invalid phone number or password.',
    };
  }

  // In a real app, you would compare hashed passwords
  if (user.password !== password) {
    return {
      success: false,
      message: 'Invalid phone number or password.',
    };
  }

  return {
    success: true,
    message: 'Login successful!',
    redirect: '/chat',
  };
}

export async function adminLogin(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string; redirect?: string }> {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = adminLoginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid input provided.',
    };
  }

  const { email, password } = validatedFields.data;

  // Find admin user
  const admin = mockUsers.find(u => u.email === email && u.role === 'admin');
  if (!admin) {
    return {
      success: false,
      message: 'Invalid email or password.',
    };
  }

  // In a real app, you would compare hashed passwords
  if (admin.password !== password) {
    return {
      success: false,
      message: 'Invalid email or password.',
    };
  }

  return {
    success: true,
    message: 'Admin login successful!',
    redirect: '/admin',
  };
}

// Twilio messaging actions
const whatsappMessageSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(1, 'Message is required'),
});

export async function sendWhatsAppMessage(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const rawData = {
    phoneNumber: formData.get('phoneNumber'),
    message: formData.get('message'),
  };

  const validatedFields = whatsappMessageSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid input provided.',
    };
  }

  const { phoneNumber, message } = validatedFields.data;

  try {
    const result = await twilioService.sendWhatsAppMessage({
      to: phoneNumber,
      body: message,
    });

    if (result.success) {
      return {
        success: true,
        message: 'WhatsApp message sent successfully!',
      };
    } else {
      return {
        success: false,
        message: `Failed to send message: ${result.error}`,
      };
    }
  } catch (error) {
    console.error('WhatsApp message error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending the message.',
    };
  }
}

const smsMessageSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(1, 'Message is required'),
});

export async function sendSMSMessage(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const rawData = {
    phoneNumber: formData.get('phoneNumber'),
    message: formData.get('message'),
  };

  const validatedFields = smsMessageSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message || 'Invalid input provided.',
    };
  }

  const { phoneNumber, message } = validatedFields.data;

  try {
    const result = await twilioService.sendSMSMessage({
      to: phoneNumber,
      body: message,
    });

    if (result.success) {
      return {
        success: true,
        message: 'SMS message sent successfully!',
      };
    } else {
      return {
        success: false,
        message: `Failed to send message: ${result.error}`,
      };
    }
  } catch (error) {
    console.error('SMS message error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending the message.',
    };
  }
}
