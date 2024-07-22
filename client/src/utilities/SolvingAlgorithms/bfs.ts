import { Maze, Point, SetState } from "../types";

export const bfs = (
  maze: Maze,
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    delay: number,
    solvingRef: React.MutableRefObject<boolean>,
    setMaze: SetState<Maze>,
    setSolving:SetState<boolean>,
): void => {
  console.log("Breadth First Search (BFS) algorithm");
};