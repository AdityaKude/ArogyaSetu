'use client';

import { useEffect, useState } from 'react';
import { Users, MessageSquare, HeartPulse, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Active Users', value: '10K+', color: 'text-sky-600' },
  { icon: MessageSquare, label: 'Messages Sent', value: '500K+', color: 'text-emerald-600' },
  { icon: HeartPulse, label: 'Health Queries', value: '250K+', color: 'text-sky-600' },
  { icon: ShieldCheck, label: 'Vaccinations Tracked', value: '50K+', color: 'text-emerald-600' },
];

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('stats');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="stats" className="w-full pt-4 pb-4 md:pt-6 md:pb-6 bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12" data-aos>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of health-conscious individuals
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all text-center"
              data-aos
            >
              <stat.icon className={`h-10 w-10 mx-auto mb-4 ${stat.color}`} />
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {isVisible ? stat.value : '0'}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

