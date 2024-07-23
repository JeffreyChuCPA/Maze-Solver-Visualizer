import React from "react";
import "../styling/Board.css";
import Maze from "./Maze";
import { BoardProps } from "../utilities/types";
import { solver } from "../utilities/solver";

const Board: React.FC<BoardProps> = ({
  mazeSize,
  algorithm,
  maze,
  solvingRef,
  solving,
  setMaze,
  setSolving,
}) => {
  //*when solving == True, use given algorithm to solve the grid
  if (solving) {
    solvingRef.current = true;
    solver(maze, algorithm, 0, solvingRef, setMaze, setSolving);
  }

  return (
    <div className="board__card">
      <Maze maze={maze} mazeSize={mazeSize} />
    </div>
  );
};

export default Board;
