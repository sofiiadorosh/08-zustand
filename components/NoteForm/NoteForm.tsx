'use client';

import { type ChangeEvent, useEffect, useId } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { NOTE_TAGS, type NewNote, type NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function NoteForm() {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteDraftStore((state) => state.draft);
  const setDraft = useNoteDraftStore((state) => state.setDraft);
  const clearDraft = useNoteDraftStore((state) => state.clearDraft);

  useEffect(() => {
    useNoteDraftStore.persist.rehydrate();
  }, []);

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (event: ChangeEvent<FieldElement>) => {
    const { name, value } = event.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (formData: FormData) => {
    const note: NewNote = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: formData.get('tag') as NoteTag,
    };

    createNoteMutation.mutate(note);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          required
        >
          {NOTE_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {createNoteMutation.isError && (
        <span className={css.error}>
          Could not create the note. Please try again.
        </span>
      )}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
