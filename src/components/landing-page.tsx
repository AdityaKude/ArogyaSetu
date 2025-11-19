'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Logo } from './icons';
import { BotMessageSquare, Languages, Mic, Syringe, Bell, Star, HelpCircle, HeartPulse, ShieldCheck, Stethoscope, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials, faq } from '@/lib/landing-page-data';
import dynamic from 'next/dynamic';
const StatsSection = dynamic(() => import('@/components/stats-section').then(m => m.StatsSection), { ssr: false });
import { BackToTop } from '@/components/back-to-top';
import { useI18n } from '@/lib/i18n-context';

export function LandingPage() {
  const { t } = useI18n();
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Parallax state for subtle 3D motion ---
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      setMouse({ x, y });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const parallaxStyle = useMemo(() => {
    const rotateX = (0.5 - mouse.y) * 6; // tilt up/down
    const rotateY = (mouse.x - 0.5) * 6; // tilt left/right
    return {
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    } as React.CSSProperties;
  }, [mouse]);

  const layerOffset = (depth: number) => ({
    transform: `translateX(${(mouse.x - 0.5) * depth}px) translateY(${(mouse.y - 0.5) * depth}px)`,
  } as React.CSSProperties);

  // Simple scroll animation: reveal on intersect
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

  // Touch gesture: swipe up to features
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 50) {
        scrollToFeatures();
      }
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchend', onTouchEnd as any);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-body">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content" className="flex-1" ref={containerRef}>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-emerald-50 to-white" />
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" style={layerOffset(20)} />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" style={layerOffset(-20)} />
          </div>
          <div className="container relative px-4 md:px-6 z-10">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4" style={parallaxStyle}>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
                    {t('hero.title')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('hero.subtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/chat" className="inline-flex h-10 items-center justify-center rounded-full bg-sky-600 px-8 text-sm font-medium text-white shadow-lg shadow-sky-300/40 transition-transform hover:scale-[1.02] hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 btn-glow" prefetch={false}>{t('hero.try-chatbot')}</Link>
                  <Button variant="outline" onClick={scrollToFeatures} className="backdrop-blur border-muted-foreground/20 hover:translate-y-[-1px] transition-transform">{t('hero.learn-more')}</Button>
                </div>
              </div>
              {/* Hero image panel (clean, medical-themed) */}
              <div className="relative" style={parallaxStyle}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-sky-200/40 to-emerald-100/30 blur-2xl" />
                <div className="relative rounded-3xl border bg-white/80 backdrop-blur shadow-2xl p-8 overflow-hidden" data-aos>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-100" />
                  <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-emerald-100" />
                  <div className="relative grid grid-cols-3 gap-6">
                    <div className="rounded-2xl p-4 bg-sky-50 border flex flex-col items-center text-sky-700" data-aos>
                      <HeartPulse className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Health Insights</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-emerald-50 border flex flex-col items-center text-emerald-700" data-aos>
                      <ShieldCheck className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Reminders</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-sky-50 border flex flex-col items-center text-sky-700" data-aos>
                      <Stethoscope className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Ask a Doctor (AI)</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-emerald-50 border flex flex-col items-center text-emerald-700" data-aos>
                      <BotMessageSquare className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Multilingual</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-sky-50 border flex flex-col items-center text-sky-700" data-aos>
                      <Mic className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Voice</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-emerald-50 border flex flex-col items-center text-emerald-700" data-aos>
                      <Leaf className="h-10 w-10" />
                      <p className="mt-2 text-sm font-medium">Wellness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full pt-16 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-white to-sky-50/60">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">Features</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{t('features.title')}</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">{t('features.subtitle')}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Languages, title: 'Multilingual', desc: 'Chat in your preferred language for clearer guidance.' },
                { icon: Mic, title: 'Voice Support', desc: 'Talk to the assistant hands‑free with voice input.' },
                { icon: Syringe, title: 'Vaccination Reminders', desc: 'Never miss important vaccines for you and family.' },
                { icon: Bell, title: 'Outbreak Alerts', desc: 'Get timely health and safety notifications near you.' },
              ].map((f, i) => (
                <div key={i} className="group perspective" data-aos>
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 [transform-style:preserve-3d] hover:[transform:rotateX(6deg)_rotateY(-6deg)] hover:shadow-xl">
                    <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 grid place-items-center mb-4 translate-z-10">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold translate-z-10">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground translate-z-10">{f.desc}</p>
                    <div className="mt-6 h-1 w-16 rounded bg-gradient-to-r from-sky-600 to-emerald-500 opacity-60 group-hover:opacity-100 translate-z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Health Tips Section */}
        <section className="w-full pt-4 pb-16 md:pt-6 md:pb-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">Health Tips</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{t('health-tips.title')}</h2>
              <p className="mt-2 text-muted-foreground md:text-lg">{t('health-tips.subtitle')}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: Leaf, title: 'Eat Balanced Meals', text: 'Fill half your plate with vegetables and fruits. Choose whole grains and lean proteins.' },
                { icon: HeartPulse, title: 'Move Your Body', text: 'Aim for at least 30 minutes of moderate activity most days of the week.' },
                { icon: ShieldCheck, title: 'Sleep & Hydrate', text: 'Get 7–9 hours of sleep and drink enough water throughout the day.' },
              ].map((t, i) => (
                <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all" data-aos>
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center mb-4">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-t relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,215,0,0.15),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(255,165,0,0.12),transparent_35%)]" />
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
                <div key={index} className="group rounded-xl border bg-card/80 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            <div className="mx-auto max-w-3xl mb-4">
              <input
                type="search"
                placeholder="Search FAQs..."
                aria-label="Search FAQs"
                onChange={(e) => {
                  const q = e.target.value.toLowerCase();
                  const items = document.querySelectorAll('#faq-list details');
                  items.forEach((el) => {
                    const text = el.textContent?.toLowerCase() || '';
                    (el as HTMLElement).style.display = text.includes(q) ? '' : 'none';
                  });
                }}
                className="w-full h-10 rounded-md border px-3 text-sm"
              />
            </div>
            <div id="faq-list" className="mx-auto grid max-w-3xl divide-y rounded-xl border bg-card/80 backdrop-blur shadow-sm">
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
      <BackToTop />
    </div>
  );
}
