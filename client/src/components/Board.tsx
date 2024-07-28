import React, { useEffect } from "react";
import "../styling/Board.css";
import Maze from "./Maze";
import { BoardProps } from "../utilities/types";
import { solver } from "../utilities/solver";
import { resetMaze } from "../utilities/utilities";

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

  useEffect(() => {
    if (resultRef.current === 'Solved' && algorithm === 'Depth First Search (DFS)') {
      resetMaze(maze, setMaze, 4)
    }
  }, [solving])


  return (
    <div className="board__card">
      <Maze maze={maze} mazeSize={mazeSize} />
    </div>
  );
};

export default Board;
