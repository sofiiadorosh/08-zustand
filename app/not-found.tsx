import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/seo';
import css from './page.module.css';

const TITLE = 'Page not found';
const DESCRIPTION =
  'Sorry, the page you are looking for does not exist in NoteHub.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: '/404',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: 'website',
  },
};

function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}

export default NotFound;
