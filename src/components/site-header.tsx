"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold ml-2">ArogyaSetu</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex ml-auto gap-4 sm:gap-6 items-center">
        <Link
          href="/"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
          prefetch={false}
        >
          Home
        </Link>
        <button
          onClick={() => scrollToSection('features')}
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
        >
          Features
        </button>
        <Link
          href="/about"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/quiz"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
          prefetch={false}
        >
          Quiz
        </Link>
        <Link
          href="/chat"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
          prefetch={false}
        >
          Chatbot
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium hover:text-primary transition-colors duration-200"
          prefetch={false}
        >
          Login
        </Link>
        <Link href="/chat" prefetch={false}>
          <Button className="h-9 px-4 hover:bg-primary/90 transition-colors duration-200">
            Get Started
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
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              className="block text-sm font-medium hover:text-primary transition-colors duration-200 w-full text-left"
            >
              Features
            </button>
            <Link
              href="/about"
              className="block text-sm font-medium hover:text-primary transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/quiz"
              className="block text-sm font-medium hover:text-primary transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/chat"
              className="block text-sm font-medium hover:text-primary transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatbot
            </Link>
            <Link
              href="/login"
              className="block text-sm font-medium hover:text-primary transition-colors duration-200"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link href="/chat" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-9 mt-2 hover:bg-primary/90 transition-colors duration-200">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}


