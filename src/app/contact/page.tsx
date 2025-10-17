import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions? We'd love to hear from you.
        </p>
        <div className="mt-8">
            <p>For any inquiries, please reach out to the project team.</p>
            <p className='mt-2'>This project was developed for the Smart India Hackathon.</p>
        </div>
      </main>
      
    </div>
  );
}
