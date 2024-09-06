import React, { useMemo, useState } from "react";
import "../styling/FetchedBoards.css";
import { BoardPost, FetchedBoardsProps } from "../utilities/types";
import UserCreatedBoard from "./UserCreatedBoard";
import MazePagination from "./MazePagination";
import { errorMaze } from "../utilities/sampleMazes";

const sortOptions = ["Latest", "Most Liked", "Most Solved", "Oldest"];
const numberMazesOptions = [10, 15, 20];

const FetchedBoards: React.FC<FetchedBoardsProps> = ({
  displayedBoards,
  isLoading,
  isError,
  numberOfMazes,
  setNumberOfMazes,
}) => {
  const [sortOption, setSortOption] = useState<string>("Latest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedBoards = useMemo(() => {
    const boards = [...displayedBoards];
    switch (sortOption) {
      case "Latest":
        return boards.sort((a: BoardPost, b: BoardPost) =>
          a.date < b.date ? 1 : -1,
        );

      case "Most Liked":
        return boards.sort((a: BoardPost, b: BoardPost) =>
          a.numberLikes < b.numberLikes ? 1 : -1,
        );

      case "Most Solved":
        return boards.sort((a: BoardPost, b: BoardPost) =>
          a.numberSolved < b.numberSolved ? 1 : -1,
        );

      case "Oldest":
        return boards.sort((a: BoardPost, b: BoardPost) =>
          a.date > b.date ? 1 : -1,
        );

      default:
        return boards;
    }
  }, [displayedBoards, sortOption]);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex: number = (currentPage - 1) * numberOfMazes;
  const endIndex: number = startIndex + numberOfMazes;
  const paginatedBoards = sortedBoards.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="fetchboards__loading">
        <div className="fetchboards__loading__animation"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fetchboards__error">
        Unable to load mazes
        <img className="fetchboards__error__img" src={errorMaze} alt="Error Image" />
      </div>
    );
  }

  if (displayedBoards.length === 0) {
    return <div className="fetchboards__loading">No mazes to show</div>;
  }

  return (
    <div className="fetchboards__section">
      <div className="fetchboards__sortoptions">
        <div>
          <span className="fetchboards__sortoptions__title">Sort: </span>
          <select
            name="sortingOptions"
            id="sortingOptions"
            value={sortOption}
            onChange={(e): void => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            {sortOptions.map((selection) => (
              <option key={selection} id={selection} value={selection}>
                {selection}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="fetchboards__sortoptions__title">
            Mazes per page:{" "}
          </span>
          <select
            name="itemsOptions"
            id="itemsOptions"
            value={numberOfMazes}
            onChange={(e): void => {
              setNumberOfMazes(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {numberMazesOptions.map((selection) => (
              <option
                key={selection}
                id={selection.toString()}
                value={selection}
              >
                {selection}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="fetchboards__displayedboards">
        {paginatedBoards.map((boardData) => (
          <UserCreatedBoard boardData={boardData} key={boardData.mazeID} />
        ))}
      </div>
      <MazePagination
        mazePerPage={numberOfMazes}
        resultsLength={displayedBoards.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default FetchedBoards;
