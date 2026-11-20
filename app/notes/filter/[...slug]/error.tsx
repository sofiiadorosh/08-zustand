'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NotesFilterErrorProps {
  error: Error;
}

function NotesFilterError({ error }: NotesFilterErrorProps) {
  return (
    <main>
      <ErrorMessage
        message={`Could not fetch the list of notes. ${error.message}`}
      />
    </main>
  );
}

export default NotesFilterError;
