import axios from 'axios';
import {
  type FetchNotesParams,
  type FetchNotesResponse,
  type NewNote,
  type Note,
} from '@/types/note';

const PER_PAGE = 12;

const notehub = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await notehub.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: PER_PAGE,
      ...(tag && { tag }),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await notehub.get<Note>(`/notes/${id}`);

  return data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const { data } = await notehub.post<Note>('/notes', note);

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await notehub.delete<Note>(`/notes/${id}`);

  return data;
}
