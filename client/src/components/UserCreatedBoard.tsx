import React, { useCallback, useContext } from "react";
import { UserCreatedBoardProps } from "../utilities/types";
import { MazeContext } from "../MazeProvider";
import { ColorContext } from "../ColorProvider";
import { useMediaQuery } from "react-responsive";

const UserCreatedBoard: React.FC<UserCreatedBoardProps> = ({ boardData }) => {
  const {
    solvingRef,
    setMaze,
    setMazeSize,
    setVisualize,
    setLikes,
    setMazeID,
    setMazeName,
    setNumberSolved,
    setSolved,
  } = useContext(MazeContext);
  const colorStates = useContext(ColorContext);
  const isMobile: boolean = useMediaQuery({ maxWidth: "767px" });

  const handleMazeSelection = useCallback(() => {
    solvingRef.current = false;
    setMaze(boardData.maze);
    setMazeSize(boardData.mazeSize);
    setVisualize(false);
    setSolved(false);
    setLikes(boardData.numberLikes);
    setMazeID(boardData.mazeID);
    setMazeName(boardData.name);
    setNumberSolved(boardData.numberSolved);
    colorStates.setPathColor(boardData.pathColor);
    colorStates.setWallColor(boardData.wallColor);
    colorStates.setWalkedColor(boardData.walkedColor);
    colorStates.setQueuedColor(boardData.queuedColor);
    colorStates.setShortPathColor(boardData.shortPathColor);

    let displayedMaze;
    if (isMobile) {
      displayedMaze = document.getElementById("top-page-mobile")
    } else {
      displayedMaze = document.getElementById("top-page-desktop")
    }
    displayedMaze!.scrollIntoView({behavior: 'smooth'})
  }, [
    boardData.maze,
    boardData.mazeID,
    boardData.name,
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
    setMazeName,
    setMazeSize,
    setNumberSolved,
    setSolved,
    setVisualize,
    solvingRef,
    isMobile
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
        <div>Solved Count: {boardData.numberSolved}</div>
      </div>
    </div>
  );
};

export default UserCreatedBoard;
