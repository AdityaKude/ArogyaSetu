import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="px-4 lg:px-6 h-14 flex items-center bg-card shadow-sm">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold ml-2">ArogyaSetu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
           <Link
            href="/quiz"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Quiz
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Chatbot
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-4">About ArogyaSetu</h1>
        <p className="text-lg text-muted-foreground">
          This project is designed to tackle a critical public health challenge by providing accessible, reliable health information to underserved communities.
        </p>
        <section className="mt-8">
            <h2 className="text-2xl font-bold">The Problem</h2>
            <p className="mt-2">
                In many rural and semi-literate populations, access to accurate health information is limited. This can lead to delayed treatment, misunderstanding of vaccination schedules, and lack of awareness during disease outbreaks. Language barriers and low literacy levels further complicate the issue.
            </p>
        </section>
        <section className="mt-8">
            <h2 className="text-2xl font-bold">Our Solution</h2>
            <p className="mt-2">
            ArogyaSetu is an AI-powered chatbot designed for public health outreach. It addresses these challenges by offering:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li><span className="font-semibold">Multilingual Support:</span> Breaking down language barriers.</li>
                <li><span className="font-semibold">Voice-Based Interaction:</span> Making it accessible for users with low literacy.</li>
                <li><span className="font-semibold">Instant Information:</span> Providing clear, AI-generated answers to health queries.</li>
                <li><span className="font-semibold">Proactive Alerts:</span> Sending timely vaccination reminders and outbreak warnings.</li>
            </ul>
        </section>
        <section className="mt-8">
            <h2 className="text-2xl font-bold">Supported by SIH</h2>
            <p className="mt-2">
                This project is being developed for the Smart India Hackathon (SIH), with the goal of leveraging technology to create a healthier, more informed society.
            </p>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ArogyaSetu. Built for SIH 2025 by Team Studio.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
           <Link href="/contact" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
