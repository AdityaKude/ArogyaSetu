import { ChatInterface } from '@/components/chat-interface';
import { EmergencyContacts } from '@/components/emergency-contacts';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <header className="flex items-center justify-between p-4 border-b shrink-0 bg-card shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
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
