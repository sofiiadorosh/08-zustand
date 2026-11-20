'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { deleteNote, fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import EmptyMessage from '@/components/EmptyMessage/EmptyMessage';
import css from './NotesPage.module.css';
import { type NoteTag } from '@/types/note';

interface NotesClientProps {
  tag: NoteTag | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', query, selectedPage, tag],
    queryFn: () => fetchNotes({ search: query, page: selectedPage, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      if (data?.notes.length === 1 && selectedPage > 1) {
        setSelectedPage(selectedPage - 1);
      }
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSearchNotes = useDebouncedCallback((query: string) => {
    setQuery(query);
    setSelectedPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchNotes} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pages={data.totalPages}
            selectedPage={selectedPage}
            onPageChange={setSelectedPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isSuccess && data.notes.length === 0 && <EmptyMessage query={query} />}
      {isSuccess && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={deleteNoteMutation.mutate}
          isDeleting={deleteNoteMutation.isPending}
        />
      )}
    </div>
  );
}

export default NotesClient;
