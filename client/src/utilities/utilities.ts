import { Maze, Point, SetState } from "./types";

export const findStartPoint = (maze: Maze): Point  => {
  if (maze.length > 0) {
    for (let i: number = 0; i < maze.length; i++) {
      if (maze[0][i] === 0 ) {
        return { x: 0, y: i };
      } else if (maze[i][0] === 0) {
        return { x: i, y: 0 };
      }
    }
  }
  return {x: 0, y: 0};
};

export const findEndPoint = (maze: Maze): Point => {
  if (maze.length > 0) {
    const last = maze.length - 1;
    for (let i: number = 0; i < maze.length; i++) {
      if (maze[last][i] === 0) {
        return { x: last, y: i };
      } else if (maze[i][last] === 0) {
        return { x: i, y: last };
      }
    }
  }
  return {x: 0, y: 0};
};

export const updateMaze = (
  maze: Maze,
  point: Point | undefined,
  setMaze: SetState<Maze>,
  value: number,
): Maze => {
  const updatedMaze: Maze = maze.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return rowIndex === point?.x && colIndex === point?.y ? value : cell;
    });
  });
  setMaze(updatedMaze);
  return updatedMaze;
};

export const resetMaze = (
  maze: Maze,
  setMaze: SetState<Maze>,
  value: number
): Maze => {
  const updatedMaze: Maze = maze.map((row) => {
    return row.map((cell) => {
      return cell === 2 || cell === 3 || cell === 4 ? value : cell;
    });
  });
  setMaze(updatedMaze);
  return updatedMaze;
};

export const updateMazePath = (
  maze: Maze,
  path: Point[],
  setMaze: SetState<Maze>,
  value: number,
): Maze => {
  const updatedMaze = maze
  for (const cell of path) {
    updatedMaze[cell.x][cell.y] = value
  }
  setMaze(updatedMaze);
  return updatedMaze;
};