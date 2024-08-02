import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";

type BlockProps = {
  blockType: number;
  mazeSize: number;
};

const Block: React.FC<BlockProps> = ({ blockType, mazeSize }) => {
  const {currentPage} = useContext(PageContext)

  const maze_block = {
    width: `${mazeSize}%`,
    aspectRatio: "1",
    border: "1px solid #ccc",
  };

  return (
    <>
      {currentPage === 'Home' && (<div
        className={`${
          blockType === 1
            ? "maze__wall"
            : blockType === 0
              ? "maze__path"
              : blockType === 2
                ? "maze__walked"
                : blockType === 4
                  ? "maze__shortpath"
                  : 'maze__queued'
        }`}
        style={maze_block}
      />)}
      {currentPage === 'build-board' && (<div
        className={`${
          blockType === 1
            ? "maze__wall"
            : blockType === 0
              ? "maze__path"
              : blockType === 2
                ? "maze__walked"
                : blockType === 4
                  ? "maze__shortpath"
                  : 'maze__queued'
        }`}
        style={maze_block}
      />)}
    </>
    
  );
};

export default Block;
