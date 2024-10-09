import { Maze, Point, SetState } from "../types";
import { generateEndPoint, generateStartPoint, updateMaze } from "../utilities";

export const prims = async (
  baseMaze: Maze,
  delay: number,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  generatingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setGenerating: SetState<boolean>,
  _setHighlightedRow: SetState<Point | null>,
  currentGenerationID: number,
  generatingIDRef: React.MutableRefObject<number>,
): Promise<boolean> => {
  const directions: Point[] = [
    { x: 0, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: -2 },
    { x: -2, y: 0 },
  ];

  const isValid = (maze: Maze, cell: Point) => {
    return (
      cell.x > 0 &&
      cell.x < maze.length - 1 &&
      cell.y > 0 &&
      cell.y < maze[0].length - 1 &&
      maze[cell.x][cell.y] === 1
    );
  };

  const shuffleDirections = (directions: Point[]) => {
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }
  };

  const inFrontierCellsList = (
    frontierCells: { point: Point; parent: Point }[],
    point: Point,
  ): boolean => {
    return frontierCells.some(
      (cell) => cell.point.x === point.x && cell.point.y === point.y,
    );
  };

  let currentMaze: Maze = baseMaze;
  const frontierCells: { point: Point; parent: Point }[] = [];

  //pick a random cell and set it to path and compute the frontier cells
  const start: Point = {
    x: Math.floor(Math.random() * (baseMaze.length - 1 - 1) + 1),
    y: Math.floor(Math.random() * (baseMaze.length - 1 - 1) + 1),
  };
  currentMaze = updateMaze(currentMaze, start, setMaze, 0);
  iterationRef.current += 1;
  await new Promise((resolve) => setTimeout(resolve, delay));

  shuffleDirections(directions);
  for (const direction of directions) {
    const frontier = { x: start.x + direction.x, y: start.y + direction.y };
    if (isValid(currentMaze, frontier)) {
      frontierCells.push({
        point: frontier,
        parent: start,
      });
    }
  }

  while (frontierCells.length > 0) {
    if (
      !generatingRef.current ||
      currentGenerationID !== generatingIDRef.current
    ) {
      return false;
    }

    //pick random frontier cell from list
    const randomFrontierCell: { point: Point; parent: Point } =
      frontierCells[Math.floor(Math.random() * frontierCells.length)];

    //Set the cell inbetween to a path
    if (
      currentMaze[randomFrontierCell.point.x][randomFrontierCell.point.y] === 1
    ) {
      const inBetweenCell: Point = {
        x: (randomFrontierCell.point.x + randomFrontierCell.parent.x) / 2,
        y: (randomFrontierCell.point.y + randomFrontierCell.parent.y) / 2,
      };
      currentMaze = updateMaze(
        currentMaze,
        { x: randomFrontierCell.point.x, y: randomFrontierCell.point.y },
        setMaze,
        0,
      );
      currentMaze = updateMaze(
        currentMaze,
        { x: inBetweenCell.x, y: inBetweenCell.y },
        setMaze,
        0,
      );
      iterationRef.current += 1;
      await new Promise((resolve) => setTimeout(resolve, delay));

      //compute the frontier cells of the chosen frontier cell and add to list
      shuffleDirections(directions);
      for (const direction of directions) {
        const frontier = {
          x: randomFrontierCell.point.x + direction.x,
          y: randomFrontierCell.point.y + direction.y,
        };
        if (
          isValid(currentMaze, frontier) &&
          !inFrontierCellsList(frontierCells, frontier)
        ) {
          frontierCells.push({
            point: frontier,
            parent: randomFrontierCell.point,
          });
        }
      }

      //remove chosen frontier cell from the list
      const removeIndex = frontierCells.indexOf(randomFrontierCell);
      frontierCells.splice(removeIndex, 1);
    }
  }

  if (generatingRef.current) {
    generateStartPoint(currentMaze, setMaze, true);
    generateEndPoint(currentMaze, setMaze);
    resultRef.current = "Generation Successful";
    setGenerating(false);
    generatingRef.current = false;
    return true;
  }

  resultRef.current = "Generation Unsuccessful";
  setGenerating(false);
  generatingRef.current = false;
  return false;
};
