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
  console.log(curr);
  console.log(start);
  

  const directions: Point[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ];

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

  path.push(curr);
  seen[curr.x][curr.y] = true;
  let currentMaze = maze;

  //*while queue is not empty
  while (path.length !== 0) {
    const currCell = path.shift();
    currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);
    iterationRef.current += 1 
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    
    if (currCell?.x === end.x && currCell?.y === end.y) {
      path.push(end);
      iterationRef.current += 1 
      resultRef.current = 'Solved'
      currentMaze = updateMaze(currentMaze, currCell, setMaze, 2);
      setSolving(false);
      setSolved(true);
      console.log("Solved!");
      return true;
    }

    //*explore adjacent cells and add to queue if valid cells
    for (const direction of directions) {
      const adjCurrCellX = currCell?.x + direction.x;
      const adjCurrCellY = currCell?.y + direction.y;

      if (isValid(seen, { x: adjCurrCellX, y: adjCurrCellY } as Point)) {
        path.push({ x: adjCurrCellX, y: adjCurrCellY } as Point);
        currentMaze = updateMaze(
          currentMaze,
          { x: adjCurrCellX, y: adjCurrCellY } as Point,
          setMaze,
          3,
        );
        seen[adjCurrCellX][adjCurrCellY] = true;
      }
    }
  }

  console.log("Not solvable");
  resultRef.current = 'Unsolvable'
  setSolved(false)
  setSolving(false);
  return false;
};
