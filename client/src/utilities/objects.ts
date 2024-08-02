import { kruskals } from "./GeneratingAlgorithms/kruskals";
import { prims } from "./GeneratingAlgorithms/prims";
import { recursiveBacktracking } from "./GeneratingAlgorithms/recursiveBacktracking";
import { aStarSearch } from "./SolvingAlgorithms/aStarSearch";
import { bfs } from "./SolvingAlgorithms/bfs";
import { dfs } from "./SolvingAlgorithms/dfs";
import { dijkstraAlgorithm } from "./SolvingAlgorithms/dijkstraAlgorithm";
import { greedyBestFirstSearch } from "./SolvingAlgorithms/greedyBestFirstSearch";
import { wallFollower } from "./SolvingAlgorithms/wallFollower";
import { Point } from "./types";

export const algorithms = {
  "Depth First Search (DFS)": dfs,
  "Breadth First Search (BFS)": bfs,
  "A* Search": aStarSearch,
  "Dijkstra's Algorithm": dijkstraAlgorithm,
  "Wall Follower": wallFollower,
  "Greedy Best-First Search": greedyBestFirstSearch
};

export const generateMazeAlgorithms = {
  "Recursive Backtracking": recursiveBacktracking,
  "Prim's Algorithm": prims,
  "Kruskal's Algorithm": kruskals,
}

export const directions: Point[] = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];