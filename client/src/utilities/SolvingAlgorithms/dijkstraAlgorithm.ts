import { Maze, Point, QueuePoint, SetState } from "../types";
import PriorityQueue from "js-priority-queue";
import { updateMaze } from "../utilities";
import { directions } from "../objects";

export const dijkstraAlgorithm = async (
  maze: Maze,
  _curr: Point,
  start: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
  delay: number,
  solvingRef: React.MutableRefObject<boolean>,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  setMaze: SetState<Maze>,
  setSolving: SetState<boolean>,
  setSolved?: SetState<boolean>,
): Promise<boolean> => {
  const isValid = (seen: boolean[][], cell: Point) => {
    if (
      cell.x < 0 ||
      cell.x >= maze[0].length ||
      cell.y < 0 ||
      cell.y >= maze.length ||
      maze[cell.x][cell.y] !== 0 ||
      seen[cell.x][cell.y]
    )
      return false;
    return true;
  };

  const distances: number[][] = Array.from({ length: maze.length }, () =>
    Array(maze[0].length).fill(Infinity),
  );
  const parents: Point[][] | null = Array.from({ length: maze.length }, () =>
    Array(maze[0].length).fill(null),
  );
  const priorityQueue = new PriorityQueue({
    comparator: (a: QueuePoint, b: QueuePoint) => a.cost - b.cost,
  });

  distances[start.x][start.y] = 0;
  priorityQueue.queue({ x: start?.x, y: start?.y, cost: 0 });
  seen[start.x][start.y] = true;
  let currentMaze = maze;

  while (priorityQueue.length > 0) {
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }

    const currCell: QueuePoint = priorityQueue.dequeue();
    currentMaze = updateMaze(
      currentMaze,
      parents[currCell.x][currCell.y],
      setMaze,
      2,
    );
    currentMaze = updateMaze(
      currentMaze,
      { x: currCell.x, y: currCell.y },
      setMaze,
      4,
    );
    iterationRef.current += 1;
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (currCell.x === end?.x && currCell.y === end?.y) {
      currentMaze = updateMaze(
        currentMaze,
        { x: currCell.x, y: currCell.y },
        setMaze,
        2,
      );

      let cell: Point | null | undefined = { x: currCell.x, y: currCell.y };
      while (cell) {
        if (!solvingRef.current) {
          console.log("Stopped solving");
          return false;
        }

        path.unshift(cell);
        currentMaze = updateMaze(currentMaze, cell, setMaze, 4);
        iterationRef.current += 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        cell = parents[cell.x][cell.y];
      }

      resultRef.current = "Solved";
      setSolving(false);
      setSolved && setSolved(true);
      console.log("Solved!");
      return true;
    }
    for (const direction of directions) {
      if (!solvingRef.current) {
        console.log("Stopped solving");
        return false;
      }

      const newX = currCell.x + direction.x;
      const newY = currCell.y + direction.y;

      if (isValid(seen, { x: newX, y: newY })) {
        if (solvingRef.current) {
          const newCost = currCell.cost + 1;

          if (newCost < distances[newX][newY]) {
            distances[newX][newY] = newCost;
            parents[newX][newY] = { x: currCell.x, y: currCell.y };
            priorityQueue.queue({ x: newX, y: newY, cost: newCost });
            currentMaze = updateMaze(
              currentMaze,
              { x: newX, y: newY },
              setMaze,
              3,
            );
            seen[newX][newY] = true;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    }
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    currentMaze = updateMaze(
      currentMaze,
      { x: currCell.x, y: currCell.y },
      setMaze,
      2,
    );
  }
  console.log("Not solvable");
  resultRef.current = "Unsolvable";
  setSolved && setSolved(false);
  setSolving(false);
  return false;
};
