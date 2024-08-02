import React from "react";
import "../styling/Maze.css";
import Block from "./Block";
import { MazeProps } from "../utilities/types";

const Maze: React.FC<MazeProps> = ({ maze, mazeSize, setMaze }) => {
  return (
    <div className="maze">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="maze__row">
          {row.map((cell, colIndex) => (
            <Block blockType={cell} rowIndex={rowIndex} colIndex={colIndex} key={colIndex} maze={maze} mazeSize={mazeSize} setMaze={setMaze}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
