import type { Metadata, Viewport } from 'next';
import '../styles/tokens.css';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF7EE',
};

export const metadata: Metadata = {
  title: 'Lookup — The Premium Link in Bio',
  description: 'An editorial, high-performance link-in-bio platform for creators. Share your links in style.',
  openGraph: {
    title: 'Lookup',
    description: 'Your link in bio, elevated.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="bg-paper text-ink antialiased font-sans">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#540B0E',
              color: '#FFF3B0',
              border: '1px solid rgba(224, 159, 62, 0.3)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              borderRadius: '12px',
              padding: '12px 20px',
              fontWeight: 600,
            },
          }}
        />
      </body>
    </html>
  );
}
