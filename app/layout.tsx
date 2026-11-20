import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

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
    <html lang="en" data-scroll-behavior="smooth" className={roboto.variable}>
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
