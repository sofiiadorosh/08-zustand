'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NoteDetailsErrorProps {
  error: Error;
}

function NoteDetailsError({ error }: NoteDetailsErrorProps) {
  return (
    <main>
      <ErrorMessage
        message={`Could not fetch note details. ${error.message}`}
      />
    </main>
  );
}

export default NoteDetailsError;
