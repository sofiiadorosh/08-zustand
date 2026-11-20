import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: 'website',
  },
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
