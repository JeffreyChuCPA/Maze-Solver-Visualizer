import { useContext } from "react";
import "../styling/Maze.css";
import Block from "./Block";
import { MazeContext } from "../MazeProvider";

const Maze = () => {

  const { maze} = useContext(MazeContext)

  return (
    <div className="maze">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="maze__row">
          {row.map((cell, colIndex) => (
            <Block blockType={cell} rowIndex={rowIndex} colIndex={colIndex} key={colIndex} maze={maze}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
