'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Languages, Mic, Sparkles, Users, Target } from 'lucide-react';

export default function AboutPage() {
  // Scroll animation initialization
  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-sky-50/30">
      <main className="flex-1 container py-12 md:py-16 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12" data-aos>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
            About ArogyaSetu
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tackling critical public health challenges by providing accessible, reliable health information to underserved communities.
          </p>
        </div>

        {/* The Problem Section */}
        <Card className="mb-8 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all" data-aos>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <Target className="h-6 w-6" />
              The Problem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              In many rural and semi-literate populations, access to accurate health information is limited. This can lead to delayed treatment, misunderstanding of vaccination schedules, and lack of awareness during disease outbreaks. Language barriers and low literacy levels further complicate the issue.
            </p>
          </CardContent>
        </Card>

        {/* Our Solution Section */}
        <section className="mb-12" data-aos>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Solution</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            ArogyaSetu is an AI-powered chatbot designed for public health outreach. It addresses these challenges by offering:
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all hover-scale">
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 grid place-items-center mb-4">
                <Languages className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Multilingual Support</h3>
              <p className="text-sm text-muted-foreground">Breaking down language barriers.</p>
            </Card>
            <Card className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all hover-scale">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center mb-4">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Voice-Based Interaction</h3>
              <p className="text-sm text-muted-foreground">Making it accessible for users with low literacy.</p>
            </Card>
            <Card className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all hover-scale">
              <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 grid place-items-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Information</h3>
              <p className="text-sm text-muted-foreground">Providing clear, AI-generated answers to health queries.</p>
            </Card>
            <Card className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all hover-scale">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center mb-4">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Proactive Alerts</h3>
              <p className="text-sm text-muted-foreground">Sending timely vaccination reminders and outbreak warnings.</p>
            </Card>
          </div>
        </section>

        {/* Mission Section */}
        <Card className="rounded-2xl border bg-gradient-to-br from-sky-50 to-emerald-50 shadow-sm" data-aos>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Users className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              This project is being developed for Healthier Society, with the goal of leveraging technology to create a healthier, more informed society.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
