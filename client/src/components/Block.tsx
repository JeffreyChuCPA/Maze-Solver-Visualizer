import React from "react";
import "../styling/Maze.css";

type BlockProps = {
  blockType: number;
  mazeSize: number;
};

const Block: React.FC<BlockProps> = ({ blockType, mazeSize }) => {
  const maze_block = {
    width: `${mazeSize}%`,
    aspectRatio: "1",
    border: "1px solid #ccc",
  };

  return (
    <div
      className={`${
        blockType === 1
          ? "maze__wall"
          : blockType === 0
            ? "maze__path"
            : blockType === 2
              ? "maze__walked"
              : "maze__queued"
      }`}
      style={maze_block}
    />
  );
};

export default Block;
