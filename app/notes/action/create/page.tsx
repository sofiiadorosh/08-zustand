import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import { OG_IMAGE, SITE_NAME } from '@/lib/seo';
import css from './CreateNote.module.css';

const TITLE = 'Create note';
const DESCRIPTION =
  'Create a new note in NoteHub: add a title, write the content and pick a tag.';
const URL_PATH = '/notes/action/create';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: URL_PATH,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: 'website',
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
