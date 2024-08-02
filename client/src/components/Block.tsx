import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";
import { SetState, Maze, Point } from "../utilities/types";
import { updateMaze } from "../utilities/utilities";

type BlockProps = {
  blockType: number;
  mazeSize: number;
  maze: Maze;
  rowIndex: number;
  colIndex: number;
  setMaze: SetState<Maze>;
};

const Block: React.FC<BlockProps> = ({ blockType, mazeSize, maze, rowIndex, colIndex, setMaze }) => {
  const {currentPage} = useContext(PageContext)
  const cell: Point = {x: rowIndex, y: colIndex}

  const maze_block = {
    width: `${mazeSize}%`,
    aspectRatio: "1",
    border: "1px solid #ccc",
  };

  const blockTypeColor = (blockType: number) => {
    switch (blockType) {
      case 0: return "maze__path"
      case 1: return "maze__wall"
      case 2: return "maze__walked"
      case 3: return "maze__queued"
      case 4: return "maze__shortpath"
      case 5: return "maze__startpoint"
      case 6: return "maze__endpoint"
      default: return "";
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(cell);
    console.log(blockType);
    const newMaze: Maze = maze

    //*Set start point at top row or most left column
    if (cell.x === 0 && cell.y !== maze.length - 1 && cell.y !== 0 || cell.x !== 0 && cell.x !== maze.length - 1 && cell.y === 0 ) {
      newMaze.map((row, rowIndex) => 
        row.map((cellValue, colIndex) => {
          if ((rowIndex === 0 && colIndex !== 0 && colIndex !== maze.length - 1) ||
          (colIndex === 0 && rowIndex !== 0 && rowIndex !== maze.length - 1)) {
            if (cellValue === 0) {
              newMaze[rowIndex][colIndex] = 1
            }
            if (rowIndex === cell.x && colIndex === cell.y) {
              newMaze[rowIndex][colIndex] = 0
            }
          }
        })
      );
      updateMaze(newMaze, cell, setMaze, 0)
    }

    //*Set end point at bottom row or most right column
    if (cell.x === maze.length - 1 && cell.y !== maze.length - 1 && cell.y !== 0|| cell.x !== 0 && cell.x !== maze.length - 1 && cell.y === maze.length - 1 ) {
      newMaze.map((row, rowIndex) => 
        row.map((cellValue, colIndex) => {
          if ((rowIndex === maze.length - 1 && colIndex !== 0 && colIndex !== maze.length - 1) ||
          (colIndex === maze.length - 1 && rowIndex !== 0 && rowIndex !== maze.length - 1)) {
            if (cellValue === 0) {
              newMaze[rowIndex][colIndex] = 1
            }
            if (rowIndex === cell.x && colIndex === cell.y) {
              newMaze[rowIndex][colIndex] = 0
            }
          }
        })
      );
      updateMaze(newMaze, cell, setMaze, 0)
    }

    if (cell.x !== 0 && cell.x !== maze.length - 1 && cell.y !== 0 && cell.y !== maze.length - 1) {
      let cellValue: number;
      if (newMaze[cell.x][cell.y] === 0) {
        cellValue = 1
      } else {
        cellValue = 0
      }
      updateMaze(newMaze, cell, setMaze, cellValue)
    }
  }

  return (
    <>
      {currentPage === 'Home' && (<div
        className={blockTypeColor(blockType)}
        style={maze_block}
      />)}
      {currentPage === 'build-board' && (<div onClick={handleClick}
        className={blockTypeColor(blockType)}
        style={maze_block}
      />)}
    </>
    
  );
};

export default Block;
