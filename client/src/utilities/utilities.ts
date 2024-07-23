import { Maze, Point, SetState } from "./types";

export const findStartPoint = (maze: Maze): Point | null => {
  if (maze.length > 0) {
    for (let i: number = 0; i < maze.length; i++) {
      if (maze[0][i] === 0) {
        return {x: 0, y: i}
      } else if (maze[i][0] === 0) {
        return {x: i, y: 0}
      }
    }
  }
  return null
}

export const findEndPoint = (maze: Maze): Point | null => {
  if (maze.length > 0) {
    const last = maze.length - 1
    for (let i: number = 0; i < maze.length; i++) {
      if (maze[last][i] === 0) {
        return {x: last, y: i}
      } else if (maze[i][last] === 0) {
        return {x: i, y: last}
      }
    }
  }
  return null
}

export const updateMaze = (
  maze: Maze,
  point: Point | undefined,
  setMaze: SetState<Maze>,
  value: number
): Maze => {
  const updatedMaze: Maze = maze.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
          return rowIndex === point?.x && colIndex === point?.y ? value : cell;
      });
  });
  setMaze(updatedMaze);
  return updatedMaze;
};