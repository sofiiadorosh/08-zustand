import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type NewNote } from '@/types/note';

export const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
  draft: NewNote;
  setDraft: (note: Partial<NewNote>) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ draft: state.draft }),
      skipHydration: true,
    },
  ),
);
