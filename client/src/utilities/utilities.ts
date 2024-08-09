import { Maze, Point, SetState } from "./types";

//* finding/generating/validating a Point on maze
export const findStartPoint = (maze: Maze): Point => {
  if (maze.length > 0) {
    for (let i: number = 0; i < maze.length; i++) {
      if (maze[0][i] === 0) {
        return { x: 0, y: i };
      } else if (maze[i][0] === 0) {
        return { x: i, y: 0 };
      }
    }
  }
  return { x: 0, y: 0 };
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
  return { x: 0, y: 0 };
};

export const isValidStartPoint = (
  x: number,
  y: number,
  maze: Maze,
): boolean => {
  return (
    (x === 0 && y !== maze.length - 1 && y !== 0) ||
    (x !== 0 && x !== maze.length - 1 && y === 0)
  );
};

export const isValidEndPoint = (x: number, y: number, maze: Maze): boolean => {
  return (
    (x === maze.length - 1 && y !== maze.length - 1 && y !== 0) ||
    (x !== 0 && x !== maze.length - 1 && y === maze.length - 1)
  );
};

export const isValidBoardPoint = (
  x: number,
  y: number,
  maze: Maze,
): boolean => {
  return (
    x !== 0 && x !== maze.length - 1 && y !== 0 && y !== maze[0].length - 1
  );
};

export const switchBlockType = (blockValue: number): number => {
  return blockValue === 0 ? 1 : 0;
};

export const resetStartOrEndPoint = (mode: "start" | "end", maze: Maze) => {
  let row: number;
  let column: number;

  if (mode === "start") {
    row = 0;
    column = 0;
  } else if (mode === "end") {
    row = maze.length - 1;
    column = maze.length - 1;
  } else {
    throw new Error("Invalid Mode Selected");
  }

  if (maze.length === 0) return;

  //*looping through row and column
  for (let i = 0; i < maze.length; i++) {
    maze[row][i] = 1;
    maze[i][column] = 1;
  }
};

export const generateStartPoint = (
  maze: Maze,
  setMaze: SetState<Maze>,
  afterAlgoExecution: boolean,
): Maze => {
  const side: number = Math.floor(Math.random() * 2);
  const updatedMaze: Maze = maze;

  if (!afterAlgoExecution) {
    const startIndex: number =
      Math.floor(Math.random() * (maze.length - 2)) + 1;
    if (!side) {
      updatedMaze[0][startIndex] = 0;
    } else {
      updatedMaze[startIndex][0] = 0;
    }
    setMaze(updatedMaze);
    return updatedMaze;
  }

  if (afterAlgoExecution) {
    const isValidStartIndex = (side: number, index: number): boolean => {
      if (!side) {
        for (let i = 1; i < maze.length - 1; i++) {
          if (updatedMaze[i][index] === 0) return true;
        }
      } else {
        for (let i = 1; i < maze[0].length - 1; i++) {
          if (updatedMaze[index][i] === 0) return true;
        }
      }
      return false;
    };

    let startIndex: number;
    do {
      startIndex = Math.floor(Math.random() * (maze.length - 2)) + 1;
    } while (!isValidStartIndex(side, startIndex));

    if (!side) {
      updatedMaze[0][startIndex] = 0;
      console.log(`start point x: ${0}, y: ${startIndex}`);
      let i = 1;
      while (i < maze.length - 1 && updatedMaze[i][startIndex] !== 0) {
        updatedMaze[i][startIndex] = 0;
        if (
          (startIndex + 1 < maze[0].length &&
            updatedMaze[i][startIndex + 1] === 0) ||
          (startIndex - 1 >= 0 && updatedMaze[i][startIndex - 1] === 0)
        ) {
          break;
        }
        i++;
      }
    } else {
      updatedMaze[startIndex][0] = 0;
      console.log(`start point x: ${startIndex}, y: ${0}`);
      let i = 1;
      while (i < maze[0].length - 1 && updatedMaze[startIndex][i] !== 0) {
        updatedMaze[startIndex][i] = 0;
        if (
          (startIndex + 1 < maze.length &&
            updatedMaze[startIndex + 1][i] === 0) ||
          (startIndex - 1 >= 0 && updatedMaze[startIndex - 1][i] === 0)
        ) {
          break;
        }
        i++;
      }
    }
    setMaze(updatedMaze);
    return updatedMaze;
  }

  console.log("No start point generated");
  return updatedMaze;
};

export const generateEndPoint = (maze: Maze, setMaze: SetState<Maze>) => {
  const updatedMaze: Maze = maze;
  const { x, y } = findStartPoint(maze);

  if (x === 0) {
    for (let row = maze.length - 2; row > 0; row--) {
      if (updatedMaze[row].includes(0)) {
        const pathIndices = updatedMaze[row]
          .map((value, index) => (value === 0 ? index : -1))
          .filter((index) => index !== -1);
        const randomEndIndex =
          pathIndices[Math.floor(Math.random() * pathIndices.length)];
        for (let endRow = row; endRow < maze.length; endRow++) {
          updatedMaze[endRow][randomEndIndex] = 0;
        }
        setMaze(updatedMaze);
        break;
      }
    }
  } else if (y === 0) {
    const pathIndices = [];
    for (let col = maze.length - 2; col > 0; col--) {
      for (let row = 0; row < maze.length; row++) {
        if (updatedMaze[row][col] === 0) {
          pathIndices.push(row);
        }
      }
      if (pathIndices.length > 0) {
        const randomEndIndex =
          pathIndices[Math.floor(Math.random() * pathIndices.length)];
        for (let endCol = col; endCol < maze.length; endCol++) {
          updatedMaze[randomEndIndex][endCol] = 0;
        }
        setMaze(updatedMaze);
        break;
      }
    }
  }
};

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
  value: number,
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
  const updatedMaze = maze;
  for (const cell of path) {
    updatedMaze[cell.x][cell.y] = value;
  }
  setMaze(updatedMaze);
  return updatedMaze;
};

//*generating a maze
export const generateBaseMaze = (
  mazeSize: number,
  setMaze: SetState<Maze>,
): number[][] => {
  const baseMaze: number[][] = [];
  for (let i: number = 0; i < mazeSize; i++) {
    baseMaze.push(new Array(mazeSize).fill(1));
  }
  setMaze(baseMaze);
  return baseMaze;
};

export const generateBaseBuildMaze = (mazeSize: number): number[][] => {
  const baseMaze: number[][] = [];
  for (let i: number = 0; i < mazeSize; i++) {
    if (i === 0 || i === mazeSize - 1) {
      baseMaze.push(new Array(mazeSize).fill(1));
    } else {
      const row = [1, ...new Array(mazeSize - 2).fill(0), 1];
      baseMaze.push(row);
    }
  }
  return baseMaze;
};
