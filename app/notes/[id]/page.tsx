import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import { OG_IMAGE, SITE_NAME, truncate } from '@/lib/seo';
import NoteDetailsClient from './NoteDetails.client';
import css from './NoteDetails.module.css';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const url = `/notes/${id}`;

  try {
    const note = await fetchNoteById(id);
    const description = truncate(note.content || `Note tagged ${note.tag}`);

    return {
      title: note.title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title: `${note.title} | ${SITE_NAME}`,
        description,
        url,
        siteName: SITE_NAME,
        images: [OG_IMAGE],
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Note not found',
      description: 'The requested note could not be loaded.',
      robots: { index: false, follow: true },
    };
  }
}

async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <main className={css.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </main>
  );
}

export default NoteDetailsPage;
