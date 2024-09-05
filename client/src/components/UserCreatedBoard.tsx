import React, { useCallback, useContext } from "react";
import { UserCreatedBoardProps } from "../utilities/types";
import { MazeContext } from "../MazeProvider";
import { ColorContext } from "../ColorProvider";

const UserCreatedBoard: React.FC<UserCreatedBoardProps> = ({ boardData }) => {
  const {
    solvingRef,
    setMaze,
    setMazeSize,
    setVisualize,
    setLikes,
    setMazeID,
    setNumberSolved,
    setSolved,
  } = useContext(MazeContext);
  const colorStates = useContext(ColorContext);

  const handleMazeSelection = useCallback(() => {
    solvingRef.current = false;
    setMaze(boardData.maze);
    setMazeSize(boardData.mazeSize);
    setVisualize(false);
    setSolved(false);
    setLikes(boardData.numberLikes);
    setMazeID(boardData.mazeID);
    setNumberSolved(boardData.numberSolved);
    colorStates.setPathColor(boardData.pathColor);
    colorStates.setWallColor(boardData.wallColor);
    colorStates.setWalkedColor(boardData.walkedColor);
    colorStates.setQueuedColor(boardData.queuedColor);
    colorStates.setShortPathColor(boardData.shortPathColor);
  }, [
    boardData.maze,
    boardData.mazeID,
    boardData.mazeSize,
    boardData.numberLikes,
    boardData.numberSolved,
    boardData.pathColor,
    boardData.queuedColor,
    boardData.shortPathColor,
    boardData.walkedColor,
    boardData.wallColor,
    colorStates,
    setLikes,
    setMaze,
    setMazeID,
    setMazeSize,
    setNumberSolved,
    setSolved,
    setVisualize,
    solvingRef,
  ]);

  return (
    <div className="fetchboards__card">
      <img
        src={boardData.image}
        alt="User created board image"
        className="fetchboards__image"
        onClick={handleMazeSelection}
      />
      <div className="fetchboards__text">
        <div className="fetchboards__text__name">{boardData.name}</div>
        <div>Likes: {boardData.numberLikes}</div>
        <div>Solved Amount: {boardData.numberSolved}</div>
      </div>
    </div>
  );
};

export default UserCreatedBoard;
