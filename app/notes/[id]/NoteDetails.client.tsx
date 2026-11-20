'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NoteDetails.module.css';

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message="Something went wrong." />}
      {data && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>
            {new Date(data.createdAt).toLocaleString('en-US', {
              timeZone: 'UTC',
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default NoteDetailsClient;
