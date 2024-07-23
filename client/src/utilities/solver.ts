import { algorithms } from "./objects";
import {
  aStarSearch,
  bfs,
  dfs,
  dijkstraAlgorithm,
  wallFollower,
} from "./SolvingAlgorithms/solvingAlgorithms";
import { AlgorithmName, Maze, Point, SetState } from "./types";
import { findEndPoint, findStartPoint } from "./utilities";

export const solver = (
  maze: Maze,
  algorithmName: AlgorithmName,
  delay: number,
  solvingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setSolving: SetState<boolean>,
): Point[] | void => {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  const start = findStartPoint(maze);
  const end = findEndPoint(maze);
  console.log(start);
  // console.log(end);

  if (start === null || end === null) {
    return console.log("Maze has not start or end points");
  }

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
      setMaze,
      setSolving,
    );
  } else {
    console.error(`Algorithm ${algorithmName} not found.`);
  }

  console.log("Final path:", path);
  return path;
};
