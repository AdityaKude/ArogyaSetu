import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/lib/auth-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: {
    default: 'ArogyaSetu',
    template: '%s | ArogyaSetu',
  },
  description: 'An AI-driven Public Health Chatbot',
  applicationName: 'ArogyaSetu',
  authors: [{ name: 'Team Studio' }],
  metadataBase: new URL('https://example.com'),
  openGraph: {
    type: 'website',
    url: 'https://example.com',
    title: 'ArogyaSetu',
    description: 'An AI-driven Public Health Chatbot',
    siteName: 'ArogyaSetu',
    images: [
      {
        url: '/favicon.ico',
        width: 256,
        height: 256,
        alt: 'ArogyaSetu',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArogyaSetu',
    description: 'An AI-driven Public Health Chatbot',
    images: ['/favicon.ico'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#007CFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
