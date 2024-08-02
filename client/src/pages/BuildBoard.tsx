import React, { useContext, useRef, useState } from "react";
import { PageContext } from "../PageProvider";
import { AlgorithmName, Maze } from "../utilities/types";
import ClientControlPanel from "../components/ClientControlPanel";
import Board from "../components/Board";
import { generateBaseBuildMaze } from "../utilities/utilities";

const BuildBoard = () => {
  const {currentPage} = useContext(PageContext)
  console.log(currentPage);
  const [mazeSize, setMazeSize] = useState<number>(20);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Depth First Search (DFS)",
  );
  const [maze, setMaze] = useState<Maze>(generateBaseBuildMaze(mazeSize));
  const [solving, setSolving] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const solvingRef = useRef<boolean>(false);
  const iterationRef = useRef<number>(0);
  const resultRef = useRef<string>('');

  return (
    <>
      <ClientControlPanel
        mazeSize={mazeSize}
        maze={maze}
        solvingRef={solvingRef}
        iterationRef={iterationRef}
        resultRef={resultRef}
        algorithm={algorithm}
        setSolving={setSolving}
        setMazeSize={setMazeSize}
        setAlgorithm={setAlgorithm}
        setMaze={setMaze}
        setSolved={setSolved}
      />
      <Board
        maze={maze}
        mazeSize={mazeSize}
      />
    </>
  );
};

export default BuildBoard;
