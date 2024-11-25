import { useState } from 'react';

import { PaginationWrapper, PageNumber } from '@shared/ui/pagination/pagination.style';

import ArrowButton from '@shared/ui/button/arrow-button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);

      if (currentPage - 1 < startPage && startPage > 1) {
        setStartPage(startPage - 10);
      }
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);

      if (currentPage + 1 > startPage + 9 && startPage + 10 <= totalPages) {
        setStartPage(startPage + 10);
      }
    }
  };

  const endPage = Math.min(startPage + 9, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <PaginationWrapper>
      <ArrowButton
        direction="left"
        size="sm"
        color={currentPage === 1 ? '#d3d3d3' : 'black'}
        onClick={handlePrevClick}
      />
      {pageNumbers.map((page) => (
        <PageNumber key={page} isActive={currentPage === page} onClick={() => onPageChange(page)}>
          {page}
        </PageNumber>
      ))}
      <ArrowButton
        direction="right"
        size="sm"
        color={currentPage === totalPages ? '#d3d3d3' : 'black'}
        onClick={handleNextClick}
      />
    </PaginationWrapper>
  );
};

export default Pagination;
