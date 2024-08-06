import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";
import { Maze, Point } from "../utilities/types";
import { isValidBoardPoint, isValidEndPoint, isValidStartPoint, switchBlockType, updateMaze } from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";

type BlockProps = {
  blockType: number;
  maze: Maze;
  rowIndex: number;
  colIndex: number;
};

const Block: React.FC<BlockProps> = ({ blockType, maze, rowIndex, colIndex }) => {
  const {currentPage} = useContext(PageContext)
  const {mazeSize, setMaze} = useContext(MazeContext)
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
      default: return "";
    }
  }

  const handleClick = () => {
    const newMaze: Maze = maze

    //*Set start point at top row or most left column
    if (isValidStartPoint(cell.x, cell.y, newMaze)) {
      newMaze.map((row, rowIndex) => 
        row.map((cellValue, colIndex) => {
          if (isValidStartPoint(rowIndex, colIndex, newMaze)) {
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
    if (isValidEndPoint(cell.x, cell.y, newMaze)) {
      newMaze.map((row, rowIndex) => 
        row.map((cellValue, colIndex) => {
          if (isValidEndPoint(rowIndex, colIndex, newMaze)) {
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

    //*Set wall point within board
    if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
      const cellValue: number = switchBlockType(newMaze[cell.x][cell.y])
      updateMaze(newMaze, cell, setMaze, cellValue)
    }
  }

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const newMaze: Maze = maze
    if (e.shiftKey) {   
      if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
        const cellValue: number = switchBlockType(newMaze[cell.x][cell.y])
        updateMaze(newMaze, cell, setMaze, cellValue)
      }
    }

  }

  return (
    <>
      {currentPage === 'Home' && (<div
        className={blockTypeColor(blockType)}
        style={maze_block}
      />)}
      {currentPage === 'build-board' && (<div onClick={handleClick} onMouseOver={handleHover}
        className={blockTypeColor(blockType)}
        style={maze_block}
      />)}
    </>
    
  );
};

export default Block;
