import { Maze, Point, SetState } from "../types";

export const dijkstraAlgorithm = (
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
): void => {
  console.log("Dijkstra's Algorithm");
};
