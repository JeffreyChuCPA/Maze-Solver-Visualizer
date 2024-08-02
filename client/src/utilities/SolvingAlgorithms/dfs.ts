import { Maze, Point, SetState } from "../types";
import { updateMaze } from "../utilities";

export const dfs = async (
  maze: Maze,
  curr: Point,
  start: Point,
  end: Point,
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
  console.log(curr);

  const directions: Point[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

  if (!solvingRef.current) {
    console.log("Stopped solving");
    console.log(maze);
    return false;
  }

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
    iterationRef.current += 1
    resultRef.current = 'Solved' 
    updateMaze(maze, curr, setMaze, 2);
    setSolving(false);
    setSolved(true)
    console.log("Solved");
    return true;
  }

  // //*No more possible moves after checking and returning to start cell
  if (curr.x === start.x && curr.y === start.y && !seen.flat().includes(true)) {
    const hasValidMoves = directions.some((direction) => {
      const newX = curr.x + direction.x
      const newY = curr.y + direction.y
      const validMove = (
        newX >= 0 &&
        newX < maze.length &&
        newY >= 0 &&
        newY < maze[0].length &&
        maze[newX][newY] === 0 &&
        !seen[newX][newY]
      );
      console.log(`Direction (${direction.x}, ${direction.y}) leads to (${newX}, ${newY}): ${validMove ? "Valid" : "Invalid"}`);
      return validMove;
    });

    if (!hasValidMoves) {
      console.log("Not solvable");
      resultRef.current = 'Unsolvable' 
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
  iterationRef.current += 1 
  await new Promise((resolve) => setTimeout(resolve, delay));

  //* recurse

  for (const direction of directions) {
    const newX = curr.x + direction.x
    const newY = curr.y + direction.y
    if (
      await dfs(
        updatedMaze,
        {x: newX, y: newY},
        start,
        end,
        seen,
        path,
        delay,
        solvingRef,
        iterationRef,
        resultRef,
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
