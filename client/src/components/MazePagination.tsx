import React from "react";
import "../styling/FetchedBoards.css";
import { MazePaginationProps } from "../utilities/types";

const MazePagination: React.FC<MazePaginationProps> = ({
  mazePerPage,
  resultsLength,
  currentPage,
  handlePagination,
}) => {
  const paginationNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(resultsLength / mazePerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="fetchboards__pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            currentPage === pageNumber
              ? "fetchboards__pagination__active"
              : "fetchboards__pagination__inactive"
          }
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default MazePagination;
