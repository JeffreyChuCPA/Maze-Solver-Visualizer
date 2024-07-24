import { Maze, Point, SetState } from "../types";
import { updateMaze } from "../utilities";

export const bfs = async (
  maze: Maze,
  curr: Point | null,
  start: Point | null,
  end: Point | null,
  seen: boolean[][],
  path: Point[],
  delay: number,
  solvingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setSolving: SetState<boolean>,
  setSolved: SetState<boolean>,
): Promise<boolean> => {
  if (!curr || !end || !start) {
    console.error("Start or end point is null");
    return false;
  }

  const directions: Point[] = [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ];

  if (curr.x === start.x && curr.y === start.y) {
    const hasValidMoves = directions.some((direction) => {
      return (
        direction.x + curr.x >= 0 &&
        direction.x + curr.x < maze[0].length &&
        direction.y + curr.y >= 0 &&
        direction.y + curr.y < maze.length &&
        maze[direction.x + curr.x][direction.y + curr.y] === 0 &&
        !seen[direction.x + curr.x][direction.y + curr.y]
      );
    });

    if (!hasValidMoves) {
      console.log("Not solvable");
      setSolving(false);
      return false;
    }
  }

  const isValid = (seen: boolean[][], cell: Point | null) => {
    if (
      cell.x < 0 ||
      cell.x >= maze[0].length ||
      cell.y < 0 ||
      cell.y >= maze.length ||
      maze[cell.x][cell.y] !== 0 ||
      seen[cell.x][cell.y]
    )
      return false;
    return true;
  };

  path.push(curr);
  seen[curr.x][curr.y] = true;
  let currentMaze = maze;

  //*while queue is not empty
  while (path.length !== 0) {
    const currCell = path.shift();
    currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    
    if (currCell?.x === end.x && currCell?.y === end.y) {
      path.push(end);
      currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);
      setSolving(false);
      setSolved(true);
      console.log("Solved!");
      return true;
    }

    //*explore adjacent cells and add to queue if valid cells
    for (const direction of directions) {
      const adjCurrCellX = currCell?.x + direction.x;
      const adjCurrCellY = currCell?.y + direction.y;

      if (isValid(seen, { x: adjCurrCellX, y: adjCurrCellY } as Point)) {
        path.push({ x: adjCurrCellX, y: adjCurrCellY } as Point);
        currentMaze = updateMaze(
          currentMaze,
          { x: adjCurrCellX, y: adjCurrCellY } as Point,
          setMaze,
          2,
        );
        seen[adjCurrCellX][adjCurrCellY] = true;
      }
    }
  }

  console.log("Not solvable");
  setSolving(false);
  return false;
};
