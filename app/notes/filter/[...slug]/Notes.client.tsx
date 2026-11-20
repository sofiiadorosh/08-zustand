'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { useState } from 'react';
import { createNote, deleteNote, fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
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
  const [isModalOpened, setModalOpened] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', query, selectedPage, tag],
    queryFn: () => fetchNotes({ search: query, page: selectedPage, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleModalClose();
    },
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

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

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
        <button className={css.button} type="button" onClick={handleModalOpen}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length === 0 && <EmptyMessage query={query} />}
      {isSuccess && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={deleteNoteMutation.mutate}
          isDeleting={deleteNoteMutation.isPending}
        />
      )}
      {isModalOpened && (
        <Modal onClose={handleModalClose}>
          <NoteForm
            onCancel={handleModalClose}
            onSubmit={createNoteMutation.mutate}
            isSubmitting={createNoteMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
