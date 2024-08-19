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
  setSolved?: SetState<boolean>,
): Promise<Point[] | void> => {
  return new Promise((resolve) => {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    const start = findStartPoint(maze);
    const end = findEndPoint(maze);

    if (!start || !end) {
      console.log("No valid start or endpoint");
      resultRef.current = "No valid start or endpoint";
      resolve(path);
      return;
    }

    for (let i = 0; i < maze.length; i++) {
      seen.push(new Array(maze[0].length).fill(false));
    }
    console.log(solvingRef.current);

    const algorithmFunction = algorithms[algorithmName];
    //!Update to switch case, then update to useContext
    if (algorithmFunction) {
      const runAlgorithm = async () => {
        await algorithmFunction(
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
        );
        console.log("Final path:", path);
        resolve(path);
      };
      runAlgorithm();
    } else {
      console.error(`Algorithm ${algorithmName} not found.`);
      resolve(path);
    }
  });
};
