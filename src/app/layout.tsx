import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'StartupExel - AI-Powered Startup Platform',
  description: 'Guide your startup journey from ideation to growth with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
