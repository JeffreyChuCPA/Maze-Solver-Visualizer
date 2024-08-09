import { directions } from "../objects";
import { Maze, Point, SetState } from "../types";
import { updateMaze } from "../utilities";

export const aStarSearch = async (
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
  setSolved: SetState<boolean>,
): Promise<boolean> => {
  if (!curr || !start || !end) {
    console.log("Provided points are not usable");
    return false;
  }
  class Node {
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    parent: Node | null;

    constructor(x: number, y: number, g = 0, h = 0) {
      this.x = x;
      this.y = y;
      this.g = g;
      this.h = h;
      this.f = g + h;
      this.parent = null;
    }
  }

  //calc distance between 2 points via Manhattan Distance
  const heuristic = (a: Point | null, b: Point | null): number => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

  const openList: Node[] = []; //queue of nodes to visit and check base case
  const closedList: Node[] = []; //list of nodes already visted and checked for base case
  const startNode = new Node(start.x, start.y, 0, heuristic(start, end));
  const endNode = new Node(end.x, end.y);
  let currentMaze = maze;

  openList.push(startNode);

  while (openList.length > 0) {
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    //get currentNode from openList with the lowest F cost
    openList.sort((a: Node, b: Node) => {
      if (a.f === b.f) {
        return a.h - b.h; //sort by lowest H cost if F cost the same, so priority is given to check nodes that are closer to end point. Not necessarily needed
      }
      return a.f - b.f; //sort by lowest F cost
    });

    const currentNode = openList.shift()!; //* ! asserts as a non-null return value
    currentMaze = updateMaze(
      currentMaze,
      { x: currentNode.parent?.x, y: currentNode.parent?.y } as Point,
      setMaze,
      2,
    );
    currentMaze = updateMaze(currentMaze, currentNode, setMaze, 4);
    iterationRef.current += 1;
    await new Promise((resolve) => setTimeout(resolve, delay));
    closedList.push(currentNode);

    //  if currentNode is final, return the successful path
    if (currentNode?.x === endNode.x && currentNode?.y === endNode.y) {
      currentMaze = updateMaze(currentMaze, currentNode, setMaze, 2);
      iterationRef.current += 1;
      let cell: Node | null = currentNode;
      while (cell) {
        if (!solvingRef.current) {
          console.log("Stopped solving");
          return false;
        }

        path.unshift({ x: cell.x, y: cell.y } as Point);
        currentMaze = updateMaze(currentMaze, cell, setMaze, 4);
        iterationRef.current += 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        cell = cell.parent;
      }
      resultRef.current = "Solved";
      setSolving(false);
      setSolved(true);
      console.log("Solved!");
      return true;
    }

    //  foreach neighbor of currentNode {
    for (const { x, y } of directions) {
      if (!solvingRef.current) {
        console.log("Stopped solving");
        return false;
      }

      const newX = currentNode.x + x;
      const newY = currentNode.y + y;

      if (solvingRef.current) {
        //if neighbor node is considered out of bound
        if (
          newX < 0 ||
          newX >= maze[0].length ||
          newY < 0 ||
          newY >= maze.length
        ) {
          continue;
        }

        //if neighbor node is considered a wall or already seen and in closedList
        if (
          maze[newX][newY] === 1 ||
          closedList.some((node: Node) => node.x === newX && node.y === newY)
        ) {
          continue;
        }

        const neighbor = new Node(
          newX,
          newY,
          currentNode.g + 1,
          heuristic({ x: newX, y: newY }, endNode),
        );
        neighbor.parent = currentNode;
        const existingNode: Node | undefined = openList.find(
          (node: Node) => node.x === newX && node.y === newY,
        );

        // if neighbor already exists in openList but the neighbor being evaluated has a higher G cost, then pass
        if (existingNode && neighbor.g >= existingNode.g) {
          continue;

          // if neighbor already exists in openList but the neighbor being evaluated has a lower G cost, replace the one in the list already
        } else if (existingNode && neighbor.g < existingNode.g) {
          existingNode.g = neighbor.g;
          existingNode.f = existingNode.g + existingNode.h;
          existingNode.parent = neighbor.parent;
        } else {
          //else, we never seen this neighbor before and therefore add to openList to be traversed and checked for base case
          openList.push(neighbor);
          currentMaze = updateMaze(
            currentMaze,
            { x: neighbor.x, y: neighbor.y },
            setMaze,
            3,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    if (!solvingRef.current) {
      console.log("Stopped solving");
      return false;
    }
    currentMaze = updateMaze(currentMaze, currentNode, setMaze, 2);
  }
  console.log("Not solvable");
  resultRef.current = "Unsolvable";
  setSolved(false);
  setSolving(false);
  return false;
};
