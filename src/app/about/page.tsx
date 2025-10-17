import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
            <h2 className="text-2xl font-bold">Supported by AK</h2>
            <p className="mt-2">
                This project is being developed for Healthier Society, with the goal of leveraging technology to create a healthier, more informed society.
            </p>
        </section>
      </main>
    </div>
  );
}
