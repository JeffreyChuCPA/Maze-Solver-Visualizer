import { algorithm, AlgorithmName, Point } from "./types";
import { findEndPoint, findStartPoint } from "./utilities";

export const solver = (
    maze: number[][],
    algorithmName: AlgorithmName,
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>
): Point[] | void => {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    const start = findStartPoint(maze);
    const end = findEndPoint(maze);
    console.log(start);
    console.log(end);

    if (start === null || end === null) {
        return console.log("Maze has not start or end points");
    }

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    const algorithmFunction = algorithm[algorithmName];
    if (algorithmFunction) {
        algorithmFunction(
            maze,
            start,
            end,
            seen,
            path,
            setMaze,
            delay,
            setSolving
        );
    } else {
        console.error(`Algorithm ${algorithmName} not found.`);
    }

    console.log("Final path:", path);
    return path;
};
