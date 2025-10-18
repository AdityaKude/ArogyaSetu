'use client';

import { ChatInterface } from '@/components/chat-interface';

export default function SignLanguagePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Sign Language Communication</h1>
      <p className="text-lg text-center mb-8">
        Communicate using Indian Sign Language (ISL). Record a video of your signs, and the chatbot will respond in ISL.
      </p>
      <ChatInterface enableSignLanguage={true} />
    </main>
  );
}
