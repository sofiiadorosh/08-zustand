'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NotePreview.module.css';

function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message="Something went wrong." />}
      {data && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button className={css.backBtn} type="button" onClick={handleClose}>
              ← Back
            </button>
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
    </Modal>
  );
}

export default NotePreview;
