import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/seo';
import css from './page.module.css';

const TITLE = `${SITE_NAME} — Personal notes in one place`;
const DESCRIPTION =
  'Write, edit, search and organize your personal notes with NoteHub — a clean and productive notes app.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: 'website',
  },
};

function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>
    </main>
  );
}

export default Home;
