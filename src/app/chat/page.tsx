import { ChatInterface } from '@/components/chat-interface';
import { EmergencyContacts } from '@/components/emergency-contacts';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-sky-50/30 text-foreground font-body">
      <header className="flex items-center justify-between p-4 border-b shrink-0 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo className="w-8 h-8 text-sky-600" />
          <h1 className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
            ArogyaSetu
          </h1>
        </Link>
        <EmergencyContacts />
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
