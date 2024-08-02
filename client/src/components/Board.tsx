import React from "react";
import "../styling/Board.css";
import Maze from "./Maze";
import { BoardProps } from "../utilities/types";

const Board: React.FC<BoardProps> = ({
  mazeSize,
  maze,
  setMaze,
}) => {

  return (
    <div className="board__card">
      <Maze maze={maze} mazeSize={mazeSize} setMaze={setMaze} />
    </div>
  );
};

export default Board;
