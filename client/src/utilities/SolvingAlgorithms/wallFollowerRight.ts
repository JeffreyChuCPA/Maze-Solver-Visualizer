import { directions } from "../objects";
import { Maze, Point, SetState } from "../types";
import { updateMaze, updateMazePath } from "../utilities";

export const wallFollowerRight = async (
  maze: Maze,
  curr: Point | null,
  start: Point | null,
  end: Point | null,
  seen: boolean[][],
  path: Point[],
  delay: number,
  solvingRef: React.MutableRefObject<boolean>,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  setMaze: SetState<Maze>,
  setSolving: SetState<boolean>,
  setSolved: SetState<boolean>,
): Promise<boolean> => {
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

  seen[start.x][start.y] = true;
  path.push(start);
  const parents: Point[][] | null = Array.from({ length: maze.length }, () =>
    Array(maze[0].length).fill(null),
  );
  let prevPoint: Point | null = null;
  let currentMaze = maze;
  currentMaze = updateMaze(currentMaze, start, setMaze, 4);
  iterationRef.current += 1;
  await new Promise((resolve) => setTimeout(resolve, delay));
  let directionIndex = 0;

  while (curr?.x !== end?.x || curr?.y !== end?.y) {
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }

    const hasValidMoves = directions.some((direction) => {
      const newX = curr.x + direction.x;
      const newY = curr.y + direction.y;
      const validMove =
        newX >= 0 &&
        newX < maze.length &&
        newY >= 0 &&
        newY < maze[0].length &&
        maze[newX][newY] === 0 &&
        !seen[newX][newY];
      return validMove;
    });

    if (!hasValidMoves) {
      if (!solvingRef.current) {
        console.log("Stopped solving");
        return false;
      }

      const lastPoint = path.pop();
      if (!lastPoint) break;

      prevPoint = lastPoint;
      curr = parents[lastPoint.x][lastPoint.y];
      iterationRef.current += 1;
      currentMaze = updateMaze(currentMaze, prevPoint, setMaze, 2);
      currentMaze = updateMaze(currentMaze, curr, setMaze, 4);

      await new Promise((resolve) => setTimeout(resolve, delay));
      if (!curr) {
        // No more parent node to reference, then maze is unsolvable
        resultRef.current = "Unsolvable";
        setSolving(false);
        setSolved(false);
        console.log("Unsolvable!");
        return false;
      }
    }

    //check cell to the left relative to the current direction
    const leftDirIndex = (directionIndex + 1) % 4;
    const rightX = curr?.x + directions[leftDirIndex].x;
    const rightY = curr?.y + directions[leftDirIndex].y;

    if (isValid(seen, { x: rightX, y: rightY })) {
      if (!solvingRef.current) {
        console.log("Stopped solving");
        return false;
      }

      //turn right
      directionIndex = leftDirIndex;
      prevPoint = curr;
      parents[rightX][rightY] = curr;
      curr = { x: rightX, y: rightY };
      iterationRef.current += 1;
      path.push(curr);
    } else {
      //move forward if possible
      const nextX = curr.x + directions[directionIndex].x;
      const nextY = curr.y + directions[directionIndex].y;

      if (isValid(seen, { x: nextX, y: nextY })) {
        if (!solvingRef.current) {
          console.log("Stopped solving");
          return false;
        }

        prevPoint = curr;
        parents[nextX][nextY] = curr;
        curr = { x: nextX, y: nextY };
        iterationRef.current += 1;
        path.push(curr);
      } else {
        //otherwise turn left
        if (!solvingRef.current) {
          console.log("Stopped solving");
          return false;
        }
        directionIndex = (directionIndex + 3) % 4;
      }
    }

    currentMaze = updateMaze(currentMaze, prevPoint, setMaze, 2);
    currentMaze = updateMaze(currentMaze, curr, setMaze, 4);
    await new Promise((resolve) => setTimeout(resolve, delay));
    seen[curr.x][curr.y] = true;
  }

  resultRef.current = "Solved";
  path.push(curr);
  updateMazePath(currentMaze, path, setMaze, 4);
  setSolving(false);
  setSolved(true);
  console.log("Solved!");
  return true;
};
