import { Maze, SetState } from "../types";
import { generateEndPoint, generateStartPoint, updateMaze } from "../utilities";

export const kruskals = async (
  baseMaze: Maze,
  delay: number,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  generatingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setGenerating: SetState<boolean>,
): Promise<boolean> => {
  type Cell = [number, number];
  type Wall = [Cell, Cell];

  class DisjointSet {
    parent: Map<string, string>;
    rank: Map<string, number>;

    constructor() {
      this.parent = new Map();
      this.rank = new Map();
    }

    makeSet(cell: Cell) {
      const key = cell.toString();
      this.parent.set(key, key);
      this.rank.set(key, 0);
    }

    find(cell: Cell): string {
      const key = cell.toString();
      if (this.parent.get(key) !== key) {
        this.parent.set(
          key,
          this.find(this.parent.get(key)!.split(",").map(Number) as Cell),
        );
      }
      return this.parent.get(key)!;
    }

    join(cell1: Cell, cell2: Cell) {
      const root1: string = this.find(cell1);
      const root2: string = this.find(cell2);

      if (root1 !== root2) {
        const rank1: number | undefined = this.rank.get(root1)!;
        const rank2: number | undefined = this.rank.get(root2)!;

        if (rank1 > rank2) {
          this.parent.set(root2, root1);
        } else if (rank1 < rank2) {
          this.parent.set(root1, root2);
        } else {
          this.parent.set(root2, root1);
          this.rank.set(root1, rank1 + 1);
        }
      }
    }
  }

  const walls: Wall[] = [];
  const disjointSet = new DisjointSet();
  let currentMaze: Maze = baseMaze;

  for (let i = 1; i < currentMaze.length - 1; i += 2) {
    for (let j = 1; j < currentMaze[0].length - 1; j += 2) {
      const cell = [i, j] as Cell;
      disjointSet.makeSet(cell); // Make set for cell at (i, j)

      if (i + 2 < currentMaze.length - 1) {
        const neighbor = [i + 2, j] as Cell;
        walls.push([cell, neighbor]);
      }

      if (j + 2 < currentMaze[0].length - 1) {
        const neighbor = [i, j + 2] as Cell;
        walls.push([cell, neighbor]);
      }
    }
  }

  for (let i = walls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }

  for (const wall of walls) {
    if (!generatingRef.current) {
      console.log("Stopped generating");
      return false;
    }
    const [cell1, cell2] = wall;

    if (disjointSet.find(cell1) !== disjointSet.find(cell2)) {
      disjointSet.join(cell1, cell2);

      const midCell: Cell = [
        (cell1[0] + cell2[0]) / 2,
        (cell1[1] + cell2[1]) / 2,
      ];

      currentMaze = updateMaze(
        currentMaze,
        { x: cell1[0], y: cell1[1] },
        setMaze,
        0,
      );
      currentMaze = updateMaze(
        currentMaze,
        { x: cell2[0], y: cell2[1] },
        setMaze,
        0,
      );
      currentMaze = updateMaze(
        currentMaze,
        { x: midCell[0], y: midCell[1] },
        setMaze,
        0,
      );
      iterationRef.current += 1;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // Return after maze generated
  if (generatingRef.current) {
    generateStartPoint(currentMaze, setMaze, true);
    generateEndPoint(currentMaze, setMaze);
    resultRef.current = "Generation Successful";
    setGenerating(false);
    console.log("Done Generating");
    // disjointSet.printParents()
    // disjointSet.printRanks()
    return true;
  }
  resultRef.current = "Generation Unsuccessful";
  setGenerating(false);
  console.log("Done Generating");
  return false;
};
