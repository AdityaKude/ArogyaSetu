'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-b from-white to-sky-50/30">
          <div className="max-w-md w-full rounded-2xl border bg-white shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mb-4">An unexpected error occurred. Please try again.</p>
            <Button className="bg-sky-600 hover:bg-sky-700" onClick={() => reset()}>Reload</Button>
          </div>
        </div>
      </body>
    </html>
  );
}



