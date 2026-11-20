import Link from 'next/link';
import { type NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

interface SidebarNotesProps {
  tags: readonly NoteTag[];
}

function SidebarNotes({ tags }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
