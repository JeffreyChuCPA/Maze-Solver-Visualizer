import { Maze, Point, QueuePoint, SetState } from "../types";
import PriorityQueue from "js-priority-queue";
import { updateMaze } from "../utilities";
import { directions } from "../objects";

export const greedyBestFirstSearch = async (
  maze: Maze,
  curr: Point | null,
  start: Point | null,
  end: Point | null,
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
  if (!curr || !start || !end) {
    return false;
  }

  //calc distance between 2 points via Manhattan Distance
  const heuristic = (a: Point, b: Point): number => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

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

  const priorityQueue = new PriorityQueue({
    comparator: (a: QueuePoint, b: QueuePoint) => a.cost - b.cost,
  });
  const parents: Point[][] | null = Array.from({ length: maze.length }, () =>
    Array(maze[0].length).fill(null),
  );

  priorityQueue.queue({
    x: start?.x,
    y: start?.y,
    cost: heuristic(start, end),
  });
  seen[start.x][start.y] = true;
  let currentMaze = maze;

  while (priorityQueue.length > 0) {
    if (!solvingRef.current) {
      return false;
    }

    const currCell: QueuePoint = priorityQueue.dequeue();
    currentMaze = updateMaze(
      currentMaze,
      parents[currCell.x][currCell.y] as Point,
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
    if (!currCell) break;

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
      return true;
    }

    for (const direction of directions) {
      if (!solvingRef.current) {
        return false;
      }

      const newX = currCell.x + direction.x;
      const newY = currCell.y + direction.y;

      if (isValid(seen, { x: newX, y: newY })) {
        if (solvingRef.current) {
          parents[newX][newY] = { x: currCell.x, y: currCell.y };
          priorityQueue.queue({
            x: newX,
            y: newY,
            cost: heuristic({ x: newX, y: newY }, end),
          });
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
    if (!solvingRef.current) {
      return false;
    }
    currentMaze = updateMaze(
      currentMaze,
      { x: currCell.x, y: currCell.y },
      setMaze,
      2,
    );
  }
  resultRef.current = "Unsolvable";
  setSolved && setSolved(false);
  setSolving(false);
  return false;
};
