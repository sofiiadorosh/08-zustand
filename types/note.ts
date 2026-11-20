export const NOTE_TAGS = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NewNote = Pick<Note, 'title' | 'content' | 'tag'>;

export interface FetchNotesParams {
  search: string;
  page: number;
  tag: NoteTag | undefined;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
