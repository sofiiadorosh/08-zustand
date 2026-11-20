import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: '07-routing-nextjs',
  description: 'NoteHub Homework Application built with Next.js',
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
