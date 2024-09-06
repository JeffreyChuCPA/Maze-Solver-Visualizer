import { kruskals } from "./GeneratingAlgorithms/kruskals";
import { prims } from "./GeneratingAlgorithms/prims";
import { recursiveBacktracking } from "./GeneratingAlgorithms/recursiveBacktracking";
import { aStarSearch } from "./SolvingAlgorithms/aStarSearch";
import { bfs } from "./SolvingAlgorithms/bfs";
import { dfs } from "./SolvingAlgorithms/dfs";
import { dijkstraAlgorithm } from "./SolvingAlgorithms/dijkstraAlgorithm";
import { greedyBestFirstSearch } from "./SolvingAlgorithms/greedyBestFirstSearch";
import { wallFollowerLeft } from "./SolvingAlgorithms/wallFollowerLeft";
import { wallFollowerRight } from "./SolvingAlgorithms/wallFollowerRight";
import { huntAndKill } from "./GeneratingAlgorithms/huntAndKill";
import { Point } from "./types";

export const algorithms = {
  "Depth First Search (DFS)": dfs,
  "Breadth First Search (BFS)": bfs,
  "A* Search": aStarSearch,
  "Dijkstra's Algorithm": dijkstraAlgorithm,
  "Wall Follower - Left": wallFollowerLeft,
  "Wall Follower - Right": wallFollowerRight,
  "Greedy Best-First Search": greedyBestFirstSearch,
};

export const generateMazeAlgorithms = {
  "Recursive Backtracking": recursiveBacktracking,
  "Prim's Algorithm": prims,
  "Kruskal's Algorithm": kruskals,
  "Hunt and Kill Algorithm": huntAndKill,
};

export const directions: Point[] = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];

export const delayValues = {
  '10': 600,
  '20': 540,
  '30': 420,
  '40': 360,
  '50': 300,
  '60': 200,
  '70': 100,
  '80': 60,
  '90': 40,
  '100': 0,
}
