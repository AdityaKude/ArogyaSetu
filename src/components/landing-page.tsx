'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './icons';
import { BotMessageSquare, Languages, Mic, Syringe, Bell, Star, Quote, HelpCircle } from 'lucide-react';
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23FFA500;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M100 20v160' stroke='url(%23grad1)' stroke-width='8' fill='none'/%3E%3Ccircle cx='100' cy='20' r='12' fill='url(%23grad1)'/%3E%3Cpath d='M85 40 Q100 30 115 40 Q100 50 85 40' fill='%23FFD700' opacity='0.2'/%3E%3Cpath d='M90 35 Q100 25 110 35' stroke='%23FFD700' stroke-width='3' fill='none' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '200px 200px'
          }}></div>
          <div className="container relative px-4 md:px-6 z-10">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-t">
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What users are saying
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real stories from people who found fast, clear answers with ArogyaSetu.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-1 text-primary mb-3">
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm text-muted-foreground">
                  "I asked about my child's vaccine schedule and got a clear plan in seconds."
                </p>
                <p className="mt-3 text-sm font-medium">Priya, Pune</p>
              </div>
              <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-1 text-primary mb-3">
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm text-muted-foreground">
                  "The Hindi voice answers make it so easy for my parents to use."
                </p>
                <p className="mt-3 text-sm font-medium">Rohit, Lucknow</p>
              </div>
              <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-1 text-primary mb-3">
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                  <Star className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm text-muted-foreground">
                  "Outbreak alerts helped our community clinic prepare faster."
                </p>
                <p className="mt-3 text-sm font-medium">Anita, Community Worker</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Quick answers to common questions about privacy, languages, and reliability.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl divide-y rounded-xl border bg-card shadow-sm">
              <details className="p-6 group hover:bg-muted/50 transition-colors duration-200">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium hover:text-primary transition-colors duration-200">
                  Which languages are supported?
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hindi, English, and regional languages. We're adding more regularly.
                </p>
              </details>
              <details className="p-6 group hover:bg-muted/50 transition-colors duration-200">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium hover:text-primary transition-colors duration-200">
                  Do you store my health data?
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  We minimize storage and follow strict privacy practices. See Privacy for details.
                </p>
              </details>
              <details className="p-6 group hover:bg-muted/50 transition-colors duration-200">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium hover:text-primary transition-colors duration-200">
                  Can I use voice input?
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes. Use the mic feature in chat to speak your query.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container relative px-4 md:px-6 z-10 text-primary-foreground">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to try ArogyaSetu?</h3>
                <p className="text-primary-foreground/90 max-w-[700px]">
                  Start a conversation now and get instant, multilingual health guidance.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/chat"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-foreground shadow hover:bg-background/90 hover:scale-105 transition-all duration-300"
                  prefetch={false}
                >
                  Open Chatbot
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-background/40 px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23007CFF;stop-opacity:0.4'/%3E%3Cstop offset='100%25' style='stop-color:%23007CFF;stop-opacity:0.2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M75 15v120' stroke='url(%23grad2)' stroke-width='6' fill='none'/%3E%3Ccircle cx='75' cy='15' r='8' fill='url(%23grad2)'/%3E%3Cpath d='M65 30 Q75 20 85 30 Q75 40 65 30' fill='%23007CFF' opacity='0.3'/%3E%3Cpath d='M68 25 Q75 18 82 25' stroke='%23007CFF' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '150px 150px'
          }}></div>
          <div className="container relative px-4 md:px-6 z-10">
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
                <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-3">
                        <Languages className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold">Multilingual Chat</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Talk in Hindi, English, or your local language.
                    </p>
                </div>
                <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-3">
                        <Mic className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold">Voice Support</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Speak your query if you can't type.
                    </p>
                </div>
                <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-3">
                        <Syringe className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold">Vaccination Reminders</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Never miss your child's vaccine schedule.
                    </p>
                </div>
                <div className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2 mb-3">
                        <Bell className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold">Outbreak Alerts</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Stay informed about local disease risks.
                    </p>
                </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23007CFF;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23007CFF;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M60 12v96' stroke='url(%23grad3)' stroke-width='4' fill='none'/%3E%3Ccircle cx='60' cy='12' r='6' fill='url(%23grad3)'/%3E%3Cpath d='M52 24 Q60 16 68 24 Q60 32 52 24' fill='%23007CFF' opacity='0.2'/%3E%3Cpath d='M54 20 Q60 14 66 20' stroke='%23007CFF' stroke-width='1.5' fill='none' opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '120px 120px'
          }}></div>
          <div className="container relative grid items-center justify-center gap-4 px-4 text-center md:px-6 z-10">
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
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-white">
          <div className="container relative px-4 md:px-6 z-10">
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
    </div>
  );
}
