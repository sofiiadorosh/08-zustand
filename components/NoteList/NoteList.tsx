import Link from 'next/link';
import { type Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function NoteList({ notes, onDelete, isDeleting }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link className={css.link} href={`/notes/${id}`}>
              View details
            </Link>
            <button
              type="button"
              className={css.button}
              disabled={isDeleting}
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
