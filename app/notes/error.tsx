'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NotesErrorProps {
  error: Error;
}

function NotesError({ error }: NotesErrorProps) {
  return (
    <main>
      <ErrorMessage
        message={`Could not fetch the list of notes. ${error.message}`}
      />
    </main>
  );
}

export default NotesError;
