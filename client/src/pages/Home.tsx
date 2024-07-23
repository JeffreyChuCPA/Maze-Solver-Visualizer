import React, { useRef, useState } from "react";
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
  const solvingRef = useRef<boolean>(false);
  // console.log(maze);
  // console.log(algorithm);
  // console.log(solvingRef);

  return (
    <>
      <ClientControlPanel
        mazeSize={mazeSize}
        solving={solving}
        maze={maze}
        solvingRef={solvingRef}
        setSolving={setSolving}
        setMazeSize={setMazeSize}
        setAlgorithm={setAlgorithm}
        setMaze={setMaze}
      />
      <Board
        maze={maze}
        mazeSize={mazeSize}
        algorithm={algorithm}
        solving={solving}
        solvingRef={solvingRef}
        setSolving={setSolving}
        setMaze={setMaze}
      />
      <DataDisplay />
    </>
  );
};

export default Home;
