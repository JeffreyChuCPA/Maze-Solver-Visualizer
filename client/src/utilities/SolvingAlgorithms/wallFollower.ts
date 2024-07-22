import { Maze, Point, SetState } from "../types";

export const wallFollower = (
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
  console.log("Wall Follower algorithm");
};
