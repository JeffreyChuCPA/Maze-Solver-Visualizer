import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";
import { Maze, Point } from "../utilities/types";
import { isValidBoardPoint, isValidEndPoint, isValidStartPoint, resetStartOrEndPoint, switchBlockType, updateMaze } from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";

type BlockProps = {
  blockType: number;
  maze: Maze;
  rowIndex: number;
  colIndex: number;
};

const Block: React.FC<BlockProps> = ({ blockType, maze, rowIndex, colIndex }) => {
  const {currentPage} = useContext(PageContext)
  const {mazeSize, setMaze, pathColor, wallColor, walkedColor, queuedColor, shortPathColor} = useContext(MazeContext)
  const cell: Point = {x: rowIndex, y: colIndex}
  
  const blockTypeColor = (blockType: number, pathColor: string, wallColor: string, walkedColor: string, queuedColor: string, shortPathColor: string) => {
    switch (blockType) {
      case 0: return pathColor
      case 1: return wallColor
      case 2: return walkedColor
      case 3: return queuedColor
      case 4: return shortPathColor
      default: return "#000000";
    }
  }

  const maze_block = {
    width: `${mazeSize}%`,
    aspectRatio: "1",
    border: "1px solid #ccc",
    backgroundColor: `${blockTypeColor(blockType, pathColor, wallColor, walkedColor, queuedColor, shortPathColor)}`
  };


  const handleClick = () => {
    setMaze(prevMaze => {
      const newMaze: Maze = prevMaze.map(row => [...row])

      //*Set start point at top row or most left column
      if (isValidStartPoint(cell.x, cell.y, newMaze)) {
        resetStartOrEndPoint('start', newMaze)
        newMaze[cell.x][cell.y] = 0
      }
      
      //*Set end point at bottom row or most right column
      else if (isValidEndPoint(cell.x, cell.y, newMaze)) {
        resetStartOrEndPoint('end', newMaze)
        newMaze[cell.x][cell.y] = 0
      }
      //*Set wall point within board
      if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
        const cellValue: number = switchBlockType(newMaze[cell.x][cell.y])
        newMaze[cell.x][cell.y] = cellValue
      }
      return newMaze
    })
  }

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setMaze(prevMaze => {
      const newMaze: Maze = prevMaze.map(row => [...row])
      if (e.shiftKey) {   
        if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
          const cellValue: number = switchBlockType(newMaze[cell.x][cell.y])
          newMaze[cell.x][cell.y] = cellValue
        }
      }
      return newMaze
    })
  }

  return (
    <>
      {currentPage === 'Home' && (<div
        style={maze_block}
      />)}
      {currentPage === 'build-board' && (<div onClick={handleClick} onMouseOver={handleHover}
        style={maze_block}
      />)}
    </>
    
  );
};

export default Block;
