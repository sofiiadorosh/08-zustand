import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import { NOTE_TAGS, type NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

interface NotesFilterPageProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesFilterPage({ params }: NotesFilterPageProps) {
  const { slug } = await params;
  const [filter] = slug;

  const isAllNotes = filter === 'all';

  if (!isAllNotes && !NOTE_TAGS.includes(filter as NoteTag)) {
    notFound();
  }

  const tag = isAllNotes ? undefined : (filter as NoteTag);
  const search = '';
  const page = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes({ search, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesFilterPage;
