import {
    dfs,
    bfs,
    aStarSearch,
    dijkstraAlgorithm,
    wallFollower
} from "./solvingAlgorithms";

type AlgorithmFunction = (
    maze: number[][],
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>,
    solvingRef: React.MutableRefObject<boolean>
) => void;

type Algorithms = {
    "Depth First Search (DFS)": AlgorithmFunction;
    "Breadth First Search (BFS)": AlgorithmFunction;
    "A* Search": AlgorithmFunction;
    "Dijkstra's Algorithm": AlgorithmFunction;
    "Wall Follower": AlgorithmFunction;
};

export type AlgorithmName = keyof Algorithms;

export const algorithm: Algorithms = {
    "Depth First Search (DFS)": dfs,
    "Breadth First Search (BFS)": bfs,
    "A* Search": aStarSearch,
    "Dijkstra's Algorithm": dijkstraAlgorithm,
    "Wall Follower": wallFollower
};

export type Point = {
    x: number;
    y: number;
};
