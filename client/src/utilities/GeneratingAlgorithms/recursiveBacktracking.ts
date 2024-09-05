import { Maze, Point, SetState } from "../types";
import {
  findStartPoint,
  generateEndPoint,
  generateStartPoint,
  updateMaze,
} from "../utilities";

export const recursiveBacktracking = async (
  baseMaze: Maze,
  delay: number,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  generatingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setGenerating: SetState<boolean>,
): Promise<boolean> => {
  const start: Point | boolean = findStartPoint(
    generateStartPoint(baseMaze, setMaze, false),
  );

  const directions: Point[] = [
    { x: 0, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: -2 },
    { x: -2, y: 0 },
  ];

  const isValid = (maze: Maze, cell: Point) => {
    return (
      cell.x > 0 &&
      cell.x < maze.length - 1 &&
      cell.y > 0 &&
      cell.y < maze[0].length - 1
    );
  };

  const shuffleDirections = (directions: Point[]) => {
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
  };

  const carvePath = async (maze: Maze, cell: Point | boolean) => {
    if (typeof cell === "boolean") {
      return false;
    }

    shuffleDirections(directions);
    for (const { x: dx, y: dy } of directions) {
      const nx = cell.x + dx;
      const ny = cell.y + dy;
      const mx = cell.x + dx / 2;
      const my = cell.y + dy / 2;

      if (isValid(maze, { x: nx, y: ny }) && maze[nx][ny] === 1) {
        if (!generatingRef.current) {
          console.log("Stopped generating");
          return false;
        }

        maze[nx][ny] = 0;
        maze[mx][my] = 0;
        updateMaze(maze, { x: nx, y: ny }, setMaze, 0);
        updateMaze(maze, { x: mx, y: my }, setMaze, 0);
        iterationRef.current += 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        await carvePath(maze, { x: nx, y: ny });
      }
    }
  };

  await carvePath(baseMaze, start);
  if (generatingRef.current) {
    generateEndPoint(baseMaze, setMaze);
    resultRef.current = "Generation Successful";
    setGenerating(false);
    console.log("Done Generating");
    return true;
  }

  setGenerating(false);
  console.log("Done Generating");
  return false;
};
