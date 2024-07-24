import { Maze, Point, SetState } from "../types";
import { updateMaze } from "../utilities";

export const dfs = async (
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
  console.log(curr);

  if (!curr || !end || !start) {
    console.error("Start or end point is null");
    return false;
  }

  const directions: Point[] = [
    { x: curr.x + 1, y: curr.y },
    { x: curr.x, y: curr.y - 1 },
    { x: curr.x - 1, y: curr.y },
    { x: curr.x, y: curr.y + 1 },
  ];

  if (!solvingRef.current) {
    console.log("Stopped solving");
    console.log(maze);
    return false;
  }

  // setTimeout(async () => {
  //*1. base case. Recursive case is separate from base case
  //* off the map, 2D arrays u traverse column then row
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze.length
  ) {
    return false;
  }

  //* on a wall
  if (maze[curr.x][curr.y] === 1) {
    return false;
  }

  //* At the end, end recursion
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    updateMaze(maze, curr, setMaze, 2);
    setSolving(false);
    setSolved(true)
    console.log("Solved!");
    return true;
  }

  //*No more possible moves
  if (curr.x === start.x && curr.y === start.y) {
    const hasValidMoves = directions.some((direction) => {
      return (
        direction.x >= 0 &&
        direction.x < maze[0].length &&
        direction.y >= 0 &&
        direction.y < maze.length &&
        maze[direction.x][direction.y] === 0 &&
        !seen[direction.x][direction.y]
      );
    });

    if (!hasValidMoves) {
      console.log("Not solvable");
      setSolving(false);
      return false;
    }
  }

  //* if seen the spot already (using argument of seen that is boolean 2D array)
  if (seen[curr.x][curr.y]) {
    return false;
  }

  //*2. recurse steps
  //* pre
  seen[curr.x][curr.y] = true;
  path.push(curr);
  const updatedMaze = updateMaze(maze, curr, setMaze, 2);
  await new Promise((resolve) => setTimeout(resolve, delay));

  //* recurse

  for (const direction of directions) {
    if (
      await dfs(
        updatedMaze,
        direction,
        start,
        end,
        seen,
        path,
        delay,
        solvingRef,
        setMaze,
        setSolving,
        setSolved,
      )
    ) {
      return true;
    }
  }

  //* post

  if (solvingRef.current) {
    const deleteCurr = path.pop();
    console.log(`popped x:${deleteCurr.x} , y:${deleteCurr.y}`);
    // console.log(path);

    if (deleteCurr) {
      updateMaze(maze, deleteCurr, setMaze, 0);
    }
  }
  return false;
};
