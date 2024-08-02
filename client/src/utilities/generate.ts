import { generateMazeAlgorithms } from "./objects";
import { GeneratingAlgorithmName, Maze, SetState } from "./types";
import { generateBaseMaze } from "./utilities";

export const generate = (
  mazeSize: number,
  generatingAlgorithm:  GeneratingAlgorithmName,
  delay: number,
  iterationRef: React.MutableRefObject<number>,
  resultRef: React.MutableRefObject<string>,
  generatingRef: React.MutableRefObject<boolean>,
  setMaze: SetState<Maze>,
  setGenerating: SetState<boolean>,
): Maze => {

  const baseMaze = generateBaseMaze(mazeSize, setMaze)

  const algorithmFunction = generateMazeAlgorithms[generatingAlgorithm];
  if (algorithmFunction) {
    algorithmFunction(
      baseMaze,
      delay,
      iterationRef,
      resultRef,
      generatingRef,
      setMaze,
      setGenerating,
    )
  }
	else {
    console.error(`Algorithm ${generatingAlgorithm} not found.`);
  }

  return baseMaze
}