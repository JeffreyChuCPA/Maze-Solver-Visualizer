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
  iterationRef,
  resultRef,
  setMaze,
  setSolving,
  setSolved,
}) => {

  console.log('rerenderd');

  return (
    <div className="board__card">
      <Maze maze={maze} mazeSize={mazeSize} />
    </div>
  );
};

export default Board;
