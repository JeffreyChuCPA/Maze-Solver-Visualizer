import React, { createContext, useState, ReactNode, useRef } from "react";
import {
  AlgorithmName,
  GeneratingAlgorithmName,
  Maze,
  Point,
  SetState,
} from "./utilities/types";
import sampleMazes from "./utilities/sampleMazes";

interface MazeContextType {
  mazeSize: number;
  maze: Maze;
  solvingRef: React.MutableRefObject<boolean>;
  solving: boolean;
  solved: boolean;
  iterationRef: React.MutableRefObject<number>;
  resultRef: React.MutableRefObject<string>;
  algorithm: AlgorithmName;
  generatingAlgorithm?: GeneratingAlgorithmName;
  generatingRef?: React.MutableRefObject<boolean>;
  generating?: boolean;
  setMazeSize: SetState<number>;
  setAlgorithm: SetState<AlgorithmName>;
  setGeneratingAlgorithm?: SetState<GeneratingAlgorithmName>;
  setMaze: SetState<Maze>;
  setSolving: SetState<boolean>;
  setSolved: SetState<boolean>;
  setGenerating?: SetState<boolean>;
  pathColor: string;
  setPathColor: SetState<string>;
  wallColor: string;
  setWallColor: SetState<string>;
  walkedColor: string;
  setWalkedColor: SetState<string>;
  queuedColor: string;
  setQueuedColor: SetState<string>;
  shortPathColor: string;
  setShortPathColor: SetState<string>;
  highlightedRow: Point | null;
  setHighlightedRow: SetState<Point | null>;
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
  const [maze, setMaze] = useState<Maze>(sampleMazes.mazeSample10_2);
  const [solving, setSolving] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const solvingRef = useRef<boolean>(false);
  const generatingRef = useRef<boolean>(false);
  const iterationRef = useRef<number>(0);
  const resultRef = useRef<string>("");
  const [pathColor, setPathColor] = useState<string>("#FFFFFF");
  const [wallColor, setWallColor] = useState<string>("#000000");
  const [walkedColor, setWalkedColor] = useState<string>("#16dbe9");
  const [queuedColor, setQueuedColor] = useState<string>("#1f666b");
  const [shortPathColor, setShortPathColor] = useState<string>("#fdf90d");
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

  return (
    <MazeContext.Provider
      value={{
        mazeSize,
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
        resultRef,
        pathColor,
        setPathColor,
        wallColor,
        setWallColor,
        walkedColor,
        setWalkedColor,
        queuedColor,
        setQueuedColor,
        shortPathColor,
        setShortPathColor,
        highlightedRow,
        setHighlightedRow,
      }}
    >
      {children}
    </MazeContext.Provider>
  );
};

export { MazeContext, MazeProvider };
