'use client';

import { ChatInterface } from '@/components/chat-interface';
import { EmergencyContacts } from '@/components/emergency-contacts';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Loader2 } from 'lucide-react';

export default function ChatPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('arogyasetu_user');
        
        // If authenticated via context, allow access
        if (isAuthenticated) {
          setIsChecking(false);
          return;
        }
        
        // If no stored user, redirect immediately
        if (!storedUser) {
          router.replace('/login');
          return;
        }
        
        // If we have stored user but context hasn't loaded yet, wait briefly
        // This handles the case where localStorage has user but React context hasn't initialized
        const timer = setTimeout(() => {
          if (!isAuthenticated) {
            // Still not authenticated after waiting - redirect
            router.replace('/login');
          } else {
            setIsChecking(false);
          }
        }, 300);
        
        return () => clearTimeout(timer);
      }
    };

    checkAuth();
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-white to-sky-50/30 text-foreground font-body">
        <header className="flex items-center justify-between p-4 border-b shrink-0 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo className="w-8 h-8 text-sky-600" />
            <h1 className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
              ArogyaSetu
            </h1>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            <p className="text-sm text-muted-foreground">Checking authentication...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show authentication required screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-white to-sky-50/30 text-foreground font-body">
        <header className="flex items-center justify-between p-4 border-b shrink-0 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo className="w-8 h-8 text-sky-600" />
            <h1 className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
              ArogyaSetu
            </h1>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please log in to access the chatbot. The chatbot is only available to registered users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => router.push('/login')} className="w-full">
                Go to Login
              </Button>
              <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-sky-50/30 text-foreground font-body">
      <header className="flex items-center justify-between p-4 border-b shrink-0 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo className="w-8 h-8 text-sky-600" />
          <h1 className="text-xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
            ArogyaSetu
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Welcome, {user?.name}
          </span>
          <EmergencyContacts />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
