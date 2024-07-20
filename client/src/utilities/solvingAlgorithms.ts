import { Point } from "./types";

export const dfs = (
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
): Promise<boolean> => {
    return new Promise((resolve) => {
        console.log(curr);

        if (!curr || !end || !start) {
            console.error("Start or end point is null");
            resolve(false);
            return;
        }

        const directions: Point[] = [
            { x: curr.x + 1, y: curr.y },
            { x: curr.x, y: curr.y - 1 },
            { x: curr.x - 1, y: curr.y },
            { x: curr.x, y: curr.y + 1 }
        ];

        if (!solvingRef.current) {
            console.log("Stopped solving");
            resolve(false);
            return;
        }

        setTimeout(async () => {
            //*1. base case. Recursive case is separate from base case
            //* off the map, 2D arrays u traverse column then row
            if (
                curr.x < 0 ||
                curr.x >= maze[0].length ||
                curr.y < 0 ||
                curr.y >= maze.length
            ) {
                resolve(false);
                return;
            }

            //* on a wall
            if (maze[curr.x][curr.y] === 1) {
                resolve(false);
                return;
            }

            //* At the end, end recursion
            if (curr.x === end.x && curr.y === end.y) {
                path.push(end);
                const updatedMaze: number[][] = maze.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        rowIndex === curr.x && colIndex === curr.y ? 2 : cell
                    )
                );
                // console.log(updatedMaze);
                setMaze(updatedMaze);
                setSolving(false);
                resolve(true);
                return;
            }

            //*No more possible moves
            if (curr.x === start.x && curr.y === start.y) {
                const hasValidMoves = directions.some((direction) => {
                    return (
                        direction.x >= 0 &&
                        direction.x < maze[0].length &&
                        direction.y >= 0 &&
                        direction.y < maze.length &&
                        maze[direction.x][direction.y] === 0 &&
                        !seen[direction.x][direction.y]
                    );
                });

                if (!hasValidMoves) {
                    console.log("Not solvable");
                    setSolving(false);
                    resolve(false);
                    return;
                }
            }

            //*returning to the start point after first move
            //   if (curr.x === start.x && curr.y === start.y && seen.flat().filter(val => val === true).length > 1) {
            //     console.log("No path to endpoint found");
            //     const deleteLastCurr = path.pop();
            //     if (deleteLastCurr) {
            //       const { x: deleteX, y: deleteY } = deleteLastCurr;
            //       const updatedMazeBackTrack: number[][] = maze.map(
            //         (row, rowIndex) =>
            //           row.map((cell, colIndex) =>
            //             rowIndex === deleteX && colIndex === deleteY
            //         ? 0
            //         : cell
            //       )
            //     );
            //     setMaze(updatedMazeBackTrack);
            //   }
            //   resolve(true);
            //   return;
            // }

            //* if seen the spot already (using argument of seen that is boolean 2D array)
            if (seen[curr.x][curr.y]) {
                resolve(false);
                return;
            }

            //*2. recurse steps
            //* pre
            seen[curr.x][curr.y] = true;
            path.push(curr);
            console.log(seen);
            console.log(path);

            const updatedMaze: number[][] = maze.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    rowIndex === curr.x && colIndex === curr.y ? 2 : cell
                )
            );
            setMaze(updatedMaze);

            //* recurse

            for (const direction of directions) {
                if (
                    await dfs(
                        updatedMaze,
                        direction,
                        start,
                        end,
                        seen,
                        path,
                        setMaze,
                        delay,
                        setSolving,
                        solvingRef
                    )
                ) {
                    resolve(true);
                    return;
                }
            }

            //* post
            const deleteCurr = path.pop();
            console.log(`popped x:${deleteCurr.x} , y:${deleteCurr.y}`);
            console.log(path);

            if (deleteCurr) {
                const { x: deleteX, y: deleteY } = deleteCurr;
                const updatedMazeBackTrack: number[][] = maze.map(
                    (row, rowIndex) =>
                        row.map((cell, colIndex) =>
                            rowIndex === deleteX && colIndex === deleteY
                                ? 0
                                : cell
                        )
                );
                // console.log(updatedMazeBackTrack);
                setMaze(updatedMazeBackTrack);
            }

            resolve(false);
            return;
        }, delay);
    });
};

export const bfs = (
    maze: number[][],
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    console.log("Breadth First Search (BFS) algorithm");
};

export const aStarSearch = (
    maze: number[][],
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    console.log("A* Search algorithm");
};

export const dijkstraAlgorithm = (
    maze: number[][],
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    console.log("Dijkstra's Algorithm");
};

export const wallFollower = (
    maze: number[][],
    curr: Point | null,
    start: Point | null,
    end: Point | null,
    seen: boolean[][],
    path: Point[],
    setMaze: React.Dispatch<React.SetStateAction<number[][]>>,
    delay: number,
    setSolving: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    console.log("Wall Follower algorithm");
};
