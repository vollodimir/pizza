import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  curentPage: number;
  onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ curentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={curentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
