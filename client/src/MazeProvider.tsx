import React, {
  createContext,
  useState,
  ReactNode,
  useRef,
  useContext,
} from "react";
import {
  AlgorithmName,
  GeneratingAlgorithmName,
  Maze,
  SetState,
} from "./utilities/types";
import sampleMazes from "./utilities/sampleMazes";
import { PageContext } from "./PageProvider";

interface MazeContextType {
  mazeSize: number;
  maze: Maze;
  solvingRef: React.MutableRefObject<boolean>;
  solving: boolean;
  solved: boolean;
	iterationRef: React.MutableRefObject<number>;
  resultRef: React.MutableRefObject<string>
  algorithm: AlgorithmName;
  generatingAlgorithm?: GeneratingAlgorithmName;
  generatingRef?: React.MutableRefObject<boolean>;
  generating?: boolean
  setMazeSize: SetState<number>;
  setAlgorithm: SetState<AlgorithmName>;
  setGeneratingAlgorithm?: SetState<GeneratingAlgorithmName>
  setMaze: SetState<Maze>;
  setSolving: SetState<boolean>;
  setSolved: SetState<boolean>;
  setGenerating?: SetState<boolean>;
}

const MazeContext = createContext<MazeContextType>();

interface MazeProviderProps {
  children: ReactNode;
}




const MazeProvider: React.FC<MazeProviderProps> = ({ children }) => {

  const [mazeSize, setMazeSize] = useState<number>(30);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Depth First Search (DFS)",
  );
  const [generatingAlgorithm, setGeneratingAlgorithm] =
    useState<GeneratingAlgorithmName>("Recursive Backtracking");
  const [maze, setMaze] = useState<Maze>(sampleMazes.mazeSample50_1);
  const [solving, setSolving] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const solvingRef = useRef<boolean>(false);
  const generatingRef = useRef<boolean>(false);
  const iterationRef = useRef<number>(0);
  const resultRef = useRef<string>("");

  return (
    <MazeContext.Provider
      value={
        {mazeSize,
        setMazeSize,
        algorithm,
        setAlgorithm,
        generatingAlgorithm,
        setGeneratingAlgorithm,
        maze,
        setMaze,
        solving,
        setSolving,
        generating,
        setGenerating,
        solved,
        setSolved,
        solvingRef,
        generatingRef,
        iterationRef,
        resultRef
      }
      }
    >
      {children}
    </MazeContext.Provider>
  );
};

export {MazeContext, MazeProvider};