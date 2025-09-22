'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './icons';
import { BotMessageSquare, Languages, Mic, Syringe, Bell } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function LandingPage() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to ArogyaSetu!",
      description: "Your personal AI health assistant. We're glad you're here!",
    });
  }, [toast]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-body">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-card shadow-sm">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold ml-2">ArogyaSetu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/#features"
            onClick={scrollToFeatures}
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/quiz"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Quiz
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Chatbot
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Your Health. Your Language. Your AI Assistant.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get trusted healthcare information, vaccination reminders, and outbreak alerts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/chat"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Try Chatbot
                  </Link>
                  <Button variant="outline" onClick={scrollToFeatures}>
                    Learn More
                  </Button>
                </div>
              </div>
              <BotMessageSquare className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square text-primary" />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Health Support, Simplified
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered chatbot provides accessible and reliable health information and services for everyone.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <Languages className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-bold">Multilingual Chat</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Talk in Hindi, English, or your local language.
                    </p>
                </div>
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <Mic className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-bold">Voice Support</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Speak your query if you can’t type.
                    </p>
                </div>
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <Syringe className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-bold">Vaccination Reminders</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Never miss your child’s vaccine schedule.
                    </p>
                </div>
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <Bell className="h-8 w-8 text-primary" />
                        <h3 className="text-xl font-bold">Outbreak Alerts</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Stay informed about local disease risks.
                    </p>
                </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How It Works
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting health assistance is as simple as starting a conversation.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">1. Ask Query</h3>
                <p className="text-sm text-muted-foreground">
                  Type or speak your health question.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">2. AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  AI understands and fetches info.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">3. Get Response</h3>
                <p className="text-sm text-muted-foreground">
                  Response comes in your language.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">4. Stay Safe</h3>
                <p className="text-sm text-muted-foreground">
                  Reminders & alerts keep you safe.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      See it in Action
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      The chat interface below is a live demo. Try asking a question.
                  </p>
                  <Card className="w-full max-w-2xl h-[500px] shadow-2xl">
                      <CardContent className="p-0 h-full">
                          <iframe src="/chat" className="w-full h-full border-0" />
                      </CardContent>
                  </Card>
              </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ArogyaSetu. Built for SIH 2025 by Team Studio.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
           <Link href="/contact" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
