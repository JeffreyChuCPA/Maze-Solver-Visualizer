import { dfs, bfs, aStarSearch, dijkstraAlgorithm, wallFollower } from "./solvingAlgorithms"

type Algorithms = {
  "Depth First Search (DFS)": (maze: string[], start: number[][], end: []) => void,
  "Breadth First Search (BFS)": (maze: string[], start: number[][], end: []) => void,
  "A* Search": (maze: string[], start: number[][], end: []) => void,
  "Dijkstra's Algorithm": (maze: string[], start: number[][], end: []) => void,
  "Wall Follower": (maze: string[], start: number[][], end: []) => void
}

export type AlgorithmName = keyof Algorithms

export const algorithm: Algorithms = {
  "Depth First Search (DFS)": dfs,
  "Breadth First Search (BFS)": bfs,
  "A* Search": aStarSearch,
  "Dijkstra's Algorithm": dijkstraAlgorithm,
  "Wall Follower": wallFollower,
}
