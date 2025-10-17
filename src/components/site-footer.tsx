import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; 2025 ArogyaSetu.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="/about" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
        <Link href="/contact" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <div className="ml-2 flex items-center gap-3">
          <a href="https://github.com/AdityaKude" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </footer>
  );
}


