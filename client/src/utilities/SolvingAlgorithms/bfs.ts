import { directions } from "../objects";
import { Maze, Point, SetState } from "../types";
import { updateMaze } from "../utilities";

export const bfs = async (
  maze: Maze,
  curr: Point,
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
  setSolved: SetState<boolean>,
): Promise<boolean> => {
  
  const isValid = (seen: boolean[][], cell: Point | null) => {
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

  const queue: Point[] = []
  queue.push(curr); 
  const parentCells: { [key: string]: Point | null | undefined} = {}
  parentCells[`${curr.x},${curr.y}`] = null;
  seen[curr.x][curr.y] = true;
  let currentMaze = maze;

  //*while queue is not empty
  while (queue.length !== 0) {
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }

    const currCell = queue.shift();
    currentMaze = updateMaze(currentMaze, parentCells[`${currCell?.x},${currCell?.y}`] as Point, setMaze, 2);
    currentMaze = updateMaze(currentMaze, currCell, setMaze, 4);
    iterationRef.current += 1 
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (currCell?.x === end.x && currCell?.y === end.y) {
      currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);

      let cell: Point | null | undefined = currCell
      while (cell) {
        if (!solvingRef.current) {
          console.log("Stopped solving");
          return false;
        }

        path.unshift(cell)
        currentMaze = updateMaze(currentMaze, cell, setMaze, 4);
        iterationRef.current += 1 
        await new Promise((resolve) => setTimeout(resolve, delay));
        cell = parentCells[`${cell.x},${cell.y}`]
      }

      resultRef.current = 'Solved'
      setSolving(false);
      setSolved(true);
      console.log("Solved!");
      return true;
    }

    //*explore adjacent cells and add to queue if valid cells
    for (const direction of directions) {
      if (!solvingRef.current) {
        console.log("Stopped solving");
        return false;
      }

      const newX = currCell?.x + direction.x;
      const newY = currCell?.y + direction.y;
      const newPoint: Point = { x: newX, y: newY }

      if (isValid(seen, newPoint)) {
        if (solvingRef.current) {
          queue.push(newPoint);
          parentCells[`${newPoint.x},${newPoint.y}`] = currCell;
          currentMaze = updateMaze(
            currentMaze,
            newPoint,
            setMaze,
            3,
          );
          seen[newX][newY] = true;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);
  }

  console.log("Not solvable");
  resultRef.current = 'Unsolvable'
  setSolved(false)
  setSolving(false);
  return false;
};
