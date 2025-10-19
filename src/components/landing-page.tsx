'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './icons';
import { BotMessageSquare, Languages, Mic, Syringe, Bell, Star, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials, faq } from '@/lib/landing-page-data';

export function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen font-body">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white relative">
          <div role="presentation" className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%23FFA500;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M100 20v160' stroke='url(%23grad1)' stroke-width='8' fill='none'/%3E%3Ccircle cx='100' cy='20' r='12' fill='url(%23grad1)'/%3E%3Cpath d='M85 40 Q100 30 115 40 Q100 50 85 40' fill='%23FFD700' opacity='0.2'/%3E%3Cpath d='M90 35 Q100 25 110 35' stroke='%23FFD700' stroke-width='3' fill='none' opacity='0.2'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '200px 200px' }}></div>
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
                  <Link href="/chat" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>Try Chatbot</Link>
                  <Button variant="outline" onClick={scrollToFeatures}>Learn More</Button>
                </div>
              </div>
              <BotMessageSquare title="ArogyaSetu AI Assistant Icon" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square text-primary" />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-t">
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What users are saying</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Real stories from people who found fast, clear answers with ArogyaSetu.</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-1 text-primary mb-3">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary group-hover:scale-110 transition-transform duration-300" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                  <p className="mt-3 text-sm font-medium">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Quick answers to common questions about privacy, languages, and reliability.</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl divide-y rounded-xl border bg-card shadow-sm">
              {faq.map((item, index) => (
                <details key={index} className="p-6 group hover:bg-muted/50 transition-colors duration-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium hover:text-primary transition-colors duration-200">
                    {item.question}
                    <HelpCircle className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
