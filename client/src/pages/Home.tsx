import { useRef, useState } from "react";
import Board from "../components/Board";
import ClientControlPanel from "../components/ClientControlPanel";
import DataDisplay from "../components/DataDisplay";
import { AlgorithmName, Maze } from "../utilities/types";

const Home = () => {
  const [mazeSize, setMazeSize] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Depth First Search (DFS)",
  );
  const [maze, setMaze] = useState<Maze>([]);
  const [solving, setSolving] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const solvingRef = useRef<boolean>(false);
  const iterationRef = useRef<number>(0);
  const resultRef = useRef<string>('');
  // console.log(algorithm);
  console.log(solving);
  // console.log(solvingRef.current);
  console.log(solved);

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
        algorithm={algorithm}
        solving={solving}
        solvingRef={solvingRef}
        iterationRef={iterationRef}
        resultRef={resultRef}
        setSolving={setSolving}
        setMaze={setMaze}
        setSolved={setSolved}
      />
      <DataDisplay iterationRef={iterationRef} resultRef={resultRef} />
    </>
  );
};

export default Home;
