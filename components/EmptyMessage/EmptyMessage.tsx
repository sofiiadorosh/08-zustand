import css from './EmptyMessage.module.css';

interface EmptyMessageProps {
  query: string;
}

function EmptyMessage({ query }: EmptyMessageProps) {
  return (
    <p className={css.text}>
      {query
        ? `No notes found for "${query}". Try another search.`
        : 'You have no notes yet. Create your first one!'}
    </p>
  );
}

export default EmptyMessage;
