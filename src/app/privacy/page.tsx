import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">
          Your privacy is important to us. This policy explains what data we collect and how we use it.
        </p>

        <section className="mt-8">
            <h2 className="text-2xl font-bold">Data Collection</h2>
            <p className="mt-2">
                We only collect personal information when you voluntarily sign up for an account. This information includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your name</li>
                <li>Phone number</li>
                <li>Preferred language</li>
            </ul>
            <p className="mt-2">
                This data is used exclusively for sending personalized vaccination reminders and public health alerts. We do not store your chat conversations if you are not logged in.
            </p>
        </section>

        <section className="mt-8">
            <h2 className="text-2xl font-bold">Disclaimer</h2>
            <p className="mt-2">
                ArogyaSetu is an informational tool and does <span className="font-bold">not</span> provide medical diagnoses. The information provided by the chatbot is for educational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
        </section>

        <section className="mt-8">
            <h2 className="text-2xl font-bold">Data Security</h2>
            <p className="mt-2">
                We follow industry-standard data security guidelines to protect your information. All data is stored securely and is only accessible to authorized personnel for the purpose of managing reminders and alerts.
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
