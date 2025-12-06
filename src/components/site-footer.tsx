'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-sky-50/30 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">
              ArogyaSetu
            </h3>
            <p className="text-sm text-muted-foreground">
              Your trusted AI-powered health assistant. Accessible healthcare information in your language.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/AdityaKude" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-sky-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-sky-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-sky-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                About
              </Link>
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Features
              </Link>
              <Link href="/quiz" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Health Quiz
              </Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Chatbot
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Contact Us
              </Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-sky-600 transition-colors" prefetch={false}>
                Login
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@arogyasetu.gov</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">Subscribe for health tips and important updates.</p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for subscribing!');
              }}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-md bg-sky-600 text-white hover:bg-sky-700 btn-glow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 ArogyaSetu. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for a healthier society
          </p>
        </div>
      </div>
    </footer>
  );
}


