import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div id="pagination">
      Page {currentPage} of {totalPages}
      <button
        id="previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        PREVIOUS
      </button>
      <button
        id="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
