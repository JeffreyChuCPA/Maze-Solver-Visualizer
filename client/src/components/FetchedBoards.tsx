import React, { useMemo, useState } from "react";
import "../styling/FetchedBoards.css";
import { BoardPost, FetchedBoardsProps } from "../utilities/types";
import UserCreatedBoard from "./UserCreatedBoard";

const sortOptions = ["Latest", "Most Liked", "Most Solved", "Oldest"];

const FetchedBoards: React.FC<FetchedBoardsProps> = ({
  displayedBoards,
  isLoading,
  isError,
  error,
}) => {
  const [sortOption, setSortOption] = useState<string>("Latest");

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

  if (isLoading) {
    return <div className="fetchboards__loading">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="fetchboards__loading">
        Unable to load mazes: {error?.message}
      </div>
    );
  }

  return (
    <div className="fetchboards__section">
      <div className="fetchboards__sortoptions">
        Sort:{" "}
        <select
          name="sortingOptions"
          id="sortingOptions"
          value={sortOption}
          onChange={(e): void => {
            setSortOption(e.target.value);
          }}
        >
          {sortOptions.map((selection) => (
            <option key={selection} id={selection} value={selection}>
              {selection}
            </option>
          ))}
        </select>
      </div>
      <div className="fetchboards__displayedboards">
        {sortedBoards.map((boardData) => (
          <UserCreatedBoard boardData={boardData} key={boardData.mazeID} />
        ))}
      </div>
    </div>
  );
};

export default FetchedBoards;
