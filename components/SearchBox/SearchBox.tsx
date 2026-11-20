import { type ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (query: string) => void;
}

function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value.trim());
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}

export default SearchBox;
