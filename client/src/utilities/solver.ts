import { algorithms } from "./objects";
import { AlgorithmName, Maze, Point, SetState } from "./types";
import { findEndPoint, findStartPoint } from "./utilities";

export const solver = (
  maze: Maze,
  algorithmName: AlgorithmName,
  delay: number,
  solvingRef: React.MutableRefObject<boolean>,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  setMaze: SetState<Maze>,
  setSolving: SetState<boolean>,
	setSolved: SetState<boolean>,
): Point[] | void => {

  const seen: boolean[][] = [];
  const path: Point[] = [];

  //!techincally need to change functions to return Point only
  const start = findStartPoint(maze);
  const end = findEndPoint(maze);

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  const algorithmFunction = algorithms[algorithmName];
  //!Update to switch case, then update to useContext
  if (algorithmFunction) {
    algorithmFunction(
      maze,
      start,
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
    );}
	else {
    console.error(`Algorithm ${algorithmName} not found.`);
  }

  console.log("Final path:", path);
  return path;
};
