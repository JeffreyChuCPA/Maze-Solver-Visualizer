import { useRef, useState } from "react";
import Board from "../components/Board";
import ClientControlPanel from "../components/ClientControlPanel";
import DataDisplay from "../components/DataDisplay";
import { AlgorithmName, GeneratingAlgorithmName, Maze } from "../utilities/types";

const Home = () => {
  const [mazeSize, setMazeSize] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Depth First Search (DFS)",
  );
  const [generatingAlgorithm, setGeneratingAlgorithm] = useState<GeneratingAlgorithmName>(
    "Recursive Backtracking",
  );
  const [maze, setMaze] = useState<Maze>([]);
  const [solving, setSolving] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const solvingRef = useRef<boolean>(false);
  const generatingRef = useRef<boolean>(false);
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
        generatingAlgorithm={generatingAlgorithm}
        generatingRef={generatingRef}
        setSolving={setSolving}
        setGenerating={setGenerating}
        setMazeSize={setMazeSize}
        setAlgorithm={setAlgorithm}
        setGeneratingAlgorithm={setGeneratingAlgorithm}
        setMaze={setMaze}
        setSolved={setSolved}
      />
      <Board
        maze={maze}
        mazeSize={mazeSize}
      />
      <DataDisplay iterationRef={iterationRef} resultRef={resultRef} />
    </>
  );
};

export default Home;
