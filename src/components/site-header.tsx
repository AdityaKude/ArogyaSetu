"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useToast } from '@/hooks/use-toast';
import type { Language } from '@/lib/i18n';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { toast } = useToast();

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/80 border-b px-4 lg:px-6 h-14 flex items-center shadow-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false} aria-label="ArogyaSetu Home">
        <Logo className="h-6 w-6 text-sky-600" />
        <span className="font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-b from-sky-600 to-emerald-600">ArogyaSetu</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex ml-auto gap-4 sm:gap-6 items-center">
        <Link
          href="/"
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          prefetch={false}
        >
          {t('nav.home')}
        </Link>
        <button
          onClick={() => scrollToSection('features')}
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          aria-label="Scroll to features section"
        >
          {t('nav.features')}
        </button>
        <Link
          href="/about"
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          prefetch={false}
        >
          {t('nav.about')}
        </Link>
        <Link
          href="/quiz"
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          prefetch={false}
        >
          {t('nav.quiz')}
        </Link>
        <Link
          href="/chat"
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          prefetch={false}
        >
          {t('nav.chatbot')}
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium hover:text-sky-600 transition-colors duration-200"
          prefetch={false}
        >
          {t('nav.login')}
        </Link>
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <select
              aria-label="Select language"
              value={lang}
              onChange={(e) => {
                const val = e.target.value as Language;
                setLang(val);
                toast({
                  title: 'Language Changed',
                  description: `Language set to ${val.toUpperCase()}`,
                });
              }}
              className="appearance-none bg-background border border-input rounded-md px-3 py-1.5 pr-8 text-sm cursor-pointer hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="kn">KN</option>
              <option value="te">TE</option>
              <option value="bn">BN</option>
            </select>
            <Globe className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <button
          onClick={() => {
            const html = document.documentElement;
            html.classList.toggle('dark');
            const nowDark = html.classList.contains('dark');
            setIsDark(nowDark);
            if (nowDark) localStorage.setItem('theme', 'dark'); else localStorage.setItem('theme', 'light');
          }}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full hover:bg-muted"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        </div>
        <Link href="/chat" prefetch={false}>
          <Button className="h-9 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full btn-glow transition-colors duration-200">
            {t('nav.get-started')}
          </Button>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden ml-auto p-2 hover:bg-muted rounded-md transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute top-14 left-0 right-0 bg-background border-b shadow-lg md:hidden">
          <div className="px-4 py-4 space-y-3">
            {/* Language selector for mobile */}
            <div className="relative pb-2 border-b">
              <label className="text-xs text-muted-foreground mb-1 block">Language</label>
              <select
                aria-label="Select language"
                value={lang}
                onChange={(e) => {
                  const val = e.target.value as Language;
                  setLang(val);
                  toast({
                    title: 'Language Changed',
                    description: `Language set to ${val.toUpperCase()}`,
                  });
                }}
                className="w-full appearance-none bg-background border border-input rounded-md px-3 py-2 pr-8 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
                <option value="te">Telugu</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
            <Link
              href="/"
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200 w-full text-left"
              aria-label="Scroll to features section"
            >
              {t('nav.features')}
            </button>
            <Link
              href="/about"
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/quiz"
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.quiz')}
            </Link>
            <Link
              href="/chat"
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.chatbot')}
            </Link>
            <Link
              href="/login"
              className="block text-sm font-medium hover:text-sky-600 transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.login')}
            </Link>
            <Link href="/chat" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-9 mt-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full btn-glow transition-colors duration-200">
                {t('nav.get-started')}
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}


