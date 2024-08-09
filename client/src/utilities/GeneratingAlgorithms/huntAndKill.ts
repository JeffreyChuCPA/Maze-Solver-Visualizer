import { Maze, Point, SetState } from "../types";
import {
  findStartPoint,
  generateEndPoint,
  generateStartPoint,
  updateMaze,
} from "../utilities";

export const huntAndKill = async (
  baseMaze: Maze,
  delay: number,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  generatingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setGenerating: SetState<boolean>,
  setHighlightedRow: SetState<Point | null>,
): Promise<boolean> => {
  const start: Point = findStartPoint(
    generateStartPoint(baseMaze, setMaze, false),
  );

  const visited: boolean[][] = Array.from({ length: baseMaze.length }, () =>
    Array(baseMaze.length).fill(false),
  );

  let currentMaze: Maze = baseMaze;

  const directions: Point[] = [
    { x: 0, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: -2 },
    { x: -2, y: 0 },
  ];

  const isValid = (maze: Maze, cell: Point, validNeighbor: 1 | 0) => {
    return (
      cell.x > 0 &&
      cell.x < maze.length - 1 &&
      cell.y > 0 &&
      cell.y < maze[0].length - 1 &&
      maze[cell.x][cell.y] === validNeighbor
    );
  };

  const adjacentCellCheck = (maze: Maze, cell: Point): boolean => {
    return directions.every((direction) => {
      const middleX = cell.x + direction.x / 2;
      const middleY = cell.y + direction.y / 2;
      // console.log(`x: ${middleX}, y: ${middleY}`);
      if (
        middleX < 0 ||
        middleX >= maze[0].length ||
        middleY < 0 ||
        middleY >= maze.length
      ) {
        return false;
      }
      const validCell = maze[middleX][middleY] === 1;
      return validCell;
    });
  };

  const hasValidMoves = (maze: Maze, curr: Point): boolean => {
    return (
      directions.some((direction) => {
        const newX = curr.x + direction.x;
        const newY = curr.y + direction.y;
        // console.log(`x: ${newX}, y: ${newY}`);

        const validMove =
          newX > 0 &&
          newX < maze.length - 1 &&
          newY > 0 &&
          newY < maze[0].length - 1 &&
          maze[newX][newY] === 0;
        return validMove;
      }) && adjacentCellCheck(maze, curr)
    );
  };

  const possibleValidMoves = (maze: Maze, curr: Point) => {
    const possibleMoves = [];
    for (const direction of directions) {
      const newX = curr.x + direction.x;
      const newY = curr.y + direction.y;
      if (isValid(maze, { x: newX, y: newY }, 0)) {
        possibleMoves.push({ x: newX, y: newY });
      }
    }
    return possibleMoves;
  };

  const shuffleDirections = (directions: Point[]) => {
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
  };

  const carvePath = async (x: number, y: number): boolean => {
    if (!generatingRef.current) {
      console.log("Stopped generating");
      return false;
    }

    console.log("carved path called");
    console.log(visited);
    console.log(`x: ${x}, y: ${y}`);

    const stack: Point[] = [{ x, y }];
    visited[x][y] = true;

    while (stack.length) {
      const current = stack.pop();
      if (!current) continue;

      // console.log(`x: ${current.x}, y: ${current.y}`);
      const neighbors = directions
        .map((dir) => ({ x: current.x + dir.x, y: current.y + dir.y }))
        .filter(
          (neighbor) =>
            isValid(currentMaze, neighbor, 1) &&
            !visited[neighbor.x][neighbor.y] &&
            adjacentCellCheck(currentMaze, { x: neighbor.x, y: neighbor.y }),
        );

      // console.log(neighbors);

      if (neighbors.length) {
        if (!generatingRef.current) {
          console.log("Stopped generating");
          return false;
        }

        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        const wall = {
          x: (current.x + next.x) / 2,
          y: (current.y + next.y) / 2,
        };

        if (!visited[next.x][next.y] && !visited[wall.x][wall.y]) {
          if (!generatingRef.current) {
            console.log("Stopped generating");
            return false;
          }

          currentMaze[next.x][next.y] = 0;
          currentMaze[wall.x][wall.y] = 0;
          updateMaze(currentMaze, { x: next.x, y: next.y }, setMaze, 0);
          updateMaze(currentMaze, { x: wall.x, y: wall.y }, setMaze, 0);
          iterationRef.current += 1;
          await new Promise((resolve) => setTimeout(resolve, delay));
          visited[next.x][next.y] = true;
          visited[wall.x][wall.y] = true;
          stack.push(next);
        }
      }
    }

    return true;
  };

  const hunt = async () => {
    console.log("hunt called");

    let foundPath = false;
    for (let x = 1; x < currentMaze.length; x++) {
      for (let y = 1; y < currentMaze.length; y++) {
        if (!visited[x][y] && hasValidMoves(currentMaze, { x, y })) {
          if (!generatingRef.current) {
            console.log("Stopped generating");
            return false;
          }

          console.log("hunt value found");
          console.log(`x: ${x}, y: ${y}`);

          setHighlightedRow({ x, y });
          await new Promise((resolve) => setTimeout(resolve, 300)); // Highlight duration
          setHighlightedRow(null); // Revert the row back

          const possibleMoves = possibleValidMoves(currentMaze, { x, y });
          console.log(possibleMoves);
          const selectedMove =
            possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          // console.log(`x: ${selectedMove.x}, y: ${selectedMove.y}`);
          currentMaze[x][y] = 0;
          visited[x][y] = true;
          currentMaze[(x + selectedMove.x) / 2][(y + selectedMove.y) / 2] = 0;
          visited[(x + selectedMove.x) / 2][(y + selectedMove.y) / 2] = true;
          updateMaze(currentMaze, { x: x, y: y }, setMaze, 0);
          updateMaze(
            currentMaze,
            { x: (x + selectedMove.x) / 2, y: (y + selectedMove.y) / 2 },
            setMaze,
            0,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (await carvePath(x, y)) {
            foundPath = true;
          }
        }
      }
    }
    return foundPath;
  };

  // Start the algorithm
  const current = start;
  if (current) {
    currentMaze[current.x][current.y] = 0;
    visited[current.x][current.y] = true;
    await new Promise((resolve) => setTimeout(resolve, delay));
    await carvePath(current.x, current.y);
    let pathFound = true;
    while (pathFound) {
      pathFound = await hunt();
    }
  }

  generateEndPoint(baseMaze, setMaze);
  resultRef.current = "Maze Generated";
  setGenerating(false);
  setMaze(currentMaze);
  console.log("Maze Generation Completed!");

  return true;
};
