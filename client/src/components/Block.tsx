import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";
import { Maze, Point } from "../utilities/types";
import { isValidBoardPoint, isValidEndPoint, isValidStartPoint, resetStartOrEndPoint, switchBlockType, switchStartOrEndPoint, updateMaze } from "../utilities/utilities";
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
