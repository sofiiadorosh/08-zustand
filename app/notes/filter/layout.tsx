import { type ReactNode } from 'react';
import css from './NotesLayout.module.css';

interface NotesLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}

export default NotesLayout;
