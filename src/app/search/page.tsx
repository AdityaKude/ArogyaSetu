'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { faq } from '@/lib/landing-page-data';

type SearchItem = {
  title: string;
  href: string;
  body?: string;
};

export default function SearchPage() {
  const index = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about', body: 'About ArogyaSetu project' },
      { title: 'Quiz', href: '/quiz', body: 'Health awareness quiz' },
      { title: 'Chatbot', href: '/chat', body: 'AI health assistant' },
      ...faq.map((f) => ({ title: `FAQ: ${f.question}`, href: '/#faq', body: f.answer })),
    ];
    return items;
  }, []);

  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as SearchItem[];
    return index.filter((item) =>
      item.title.toLowerCase().includes(query) || (item.body?.toLowerCase().includes(query) ?? false)
    );
  }, [q, index]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-sky-50/30">
      <main className="container flex-1 py-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <input
          autoFocus
          type="search"
          placeholder="Search pages, features, FAQs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full h-11 rounded-md border px-3 text-sm mb-6"
        />

        {q && (
          <p className="text-sm text-muted-foreground mb-3">{results.length} result(s) for "{q}"</p>
        )}

        <div className="space-y-3">
          {results.map((r, i) => (
            <Card key={i} className="p-4 hover:shadow-md transition-all">
              <Link href={r.href} className="font-semibold hover:underline">{r.title}</Link>
              {r.body && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.body}</p>}
            </Card>
          ))}
          {q && results.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
}



