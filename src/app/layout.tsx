import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Lookup — Your Link in Bio',
  description: 'A pixel-art link-in-bio platform for creators. Share your links in style.',
  openGraph: {
    title: 'Lookup',
    description: 'Your link-in-bio, with pixel style.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-paper text-ink antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'var(--border)',
              boxShadow: 'var(--shadow)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              borderRadius: '0',
            },
          }}
        />
      </body>
    </html>
  );
}
