import { aStarSearch } from "./SolvingAlgorithms/aStarSearch";
import { bfs } from "./SolvingAlgorithms/bfs";
import { dfs } from "./SolvingAlgorithms/dfs";
import { dijkstraAlgorithm } from "./SolvingAlgorithms/dijkstraAlgorithm";
import { wallFollower } from "./SolvingAlgorithms/wallFollower";

export const algorithms = {
  "Depth First Search (DFS)": dfs,
  "Breadth First Search (BFS)": bfs,
  "A* Search": aStarSearch,
  "Dijkstra's Algorithm": dijkstraAlgorithm,
  "Wall Follower": wallFollower,
};
