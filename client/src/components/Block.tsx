import React, { useContext } from "react";
import "../styling/Maze.css";
import { PageContext } from "../PageProvider";
import { Maze, Point } from "../utilities/types";
import {
  isValidBoardPoint,
  isValidEndPoint,
  isValidStartPoint,
  resetStartOrEndPoint,
  switchBlockType,
} from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";
import { ColorContext, ColorContextType } from "../ColorProvider";

type BlockProps = {
  blockType: number;
  rowIndex: number;
  colIndex: number;
};

const Block: React.FC<BlockProps> = ({ blockType, rowIndex, colIndex }) => {
  const { currentPage } = useContext(PageContext);
  const { mazeSize, setMaze, resultRef } = useContext(MazeContext);
  const colorStates: ColorContextType = useContext(ColorContext);
  const cell: Point = { x: rowIndex, y: colIndex };

  const blockTypeColor = (blockType: number, colorStates: ColorContextType) => {
    switch (blockType) {
      case 0:
        return colorStates.pathColor;
      case 1:
        return colorStates.wallColor;
      case 2:
        return colorStates.walkedColor;
      case 3:
        return colorStates.queuedColor;
      case 4:
        return colorStates.shortPathColor;
      default:
        return "#000000";
    }
  };

  let selectedBackgroundColor;

  if (
    cell.x === colorStates.highlightedRow?.x &&
    cell.y === colorStates.highlightedRow?.y
  ) {
    selectedBackgroundColor = colorStates.shortPathColor;
  } else if (cell.x === colorStates.highlightedRow?.x) {
    selectedBackgroundColor = colorStates.queuedColor;
  } else {
    selectedBackgroundColor = `${blockTypeColor(blockType, colorStates)}`;
  }

  const maze_block = {
    width: `${mazeSize}%`,
    aspectRatio: "1",
    border: "1px solid #ccc",
    backgroundColor: selectedBackgroundColor,
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleClick();
  };

  const handleClick = () => {
    if (!resultRef.current) {
      setMaze((prevMaze) => {
        const newMaze: Maze = prevMaze.map((row) => [...row]);

        //*Set start point at top row or most left column
        if (isValidStartPoint(cell.x, cell.y, newMaze)) {
          resetStartOrEndPoint("start", newMaze);
          newMaze[cell.x][cell.y] = 0;
        }

        //*Set end point at bottom row or most right column
        else if (isValidEndPoint(cell.x, cell.y, newMaze)) {
          resetStartOrEndPoint("end", newMaze);
          newMaze[cell.x][cell.y] = 0;
        }
        //*Set wall point within board
        else if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
          const cellValue: number = switchBlockType(newMaze[cell.x][cell.y]);
          newMaze[cell.x][cell.y] = cellValue;
        }
        return newMaze;
      });
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!resultRef.current) {
      if (e.buttons === 1) {
        setMaze((prevMaze) => {
          const newMaze: Maze = prevMaze.map((row) => [...row]);

          if (isValidBoardPoint(cell.x, cell.y, newMaze)) {
            const cellValue: number = switchBlockType(newMaze[cell.x][cell.y]);
            newMaze[cell.x][cell.y] = cellValue;
          }

          return newMaze;
        });
      }
    }
  };

  return (
    <>
      {currentPage === "Home" && <div style={maze_block} />}
      {currentPage === "build-maze" && (
        <div
          onMouseDown={handleMouseDown}
          onMouseOver={handleHover}
          style={maze_block}
        />
      )}
    </>
  );
};

export default Block;
