import { Maze, Point, SetState } from "./types";

//* finding/generating a Point on maze
export const findStartPoint = (maze: Maze): Point => {
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

export const generateStartPoint = (maze: Maze): Maze => {
  const side: number = Math.floor(Math.random() * 2)
  const startIndex: number = Math.floor(Math.random() * ( (maze.length - 1) - 1) + 1)

  if (!side) {
    maze[0][startIndex] = 0
  } else {
    maze[startIndex][0] = 0
  }
  return maze
}

export const generateEndPoint = (maze: Maze, setMaze: SetState<Maze>) => {
  const updatedMaze: Maze = maze
  const {x, y} = findStartPoint(maze)

  if (x === 0) {
    for (let row = maze.length - 2; row > 0; row--) {
      if (updatedMaze[row].includes(0)) {
        const pathIndices = updatedMaze[row].map((value, index) => value === 0 ? index: -1).filter( index => index !== -1)
        const randomEndIndex = pathIndices[Math.floor(Math.random() * pathIndices.length)]
        for (let endRow = row; endRow < maze.length; endRow++) {
          updatedMaze[endRow][randomEndIndex] = 0
        }
        setMaze(updatedMaze)
        break
      }
    }
  } else if (y === 0) {
    const pathIndices = []
    for (let col = maze.length - 2; col > 0; col--) {
      for (let row = 0; row < maze.length; row++) {
        if (updatedMaze[row][col] === 0) {
          pathIndices.push(row)
        }
      }
      if (pathIndices.length > 0) {
        const randomEndIndex = pathIndices[Math.floor(Math.random() * pathIndices.length)]
        for (let endCol = col; endCol < maze.length; endCol++) {
          updatedMaze[randomEndIndex][endCol] = 0
        }
        setMaze(updatedMaze)
        break
      }
    }
  }
}

//*Updating the maze
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

//*generating a maze
export const generateBaseMaze = (
  mazeSize: number,
  setMaze: SetState<Maze>
): number[][] => {
  const baseMaze: number[][] = []
  for (let i: number = 0; i < mazeSize; i++) {
    baseMaze.push(new Array(mazeSize).fill(1))
  }
  setMaze(baseMaze)
  return generateStartPoint(baseMaze)

}