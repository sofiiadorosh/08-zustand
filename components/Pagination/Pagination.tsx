import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pages: number;
  selectedPage: number;
  onPageChange: (nextPage: number) => void;
}

function Pagination({ pages, selectedPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={selectedPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
