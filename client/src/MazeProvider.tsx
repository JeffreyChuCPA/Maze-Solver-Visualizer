import React, { createContext, useState, ReactNode, useRef } from "react";
import {
  AlgorithmName,
  GeneratingAlgorithmName,
  Maze,
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
  imageRef: React.MutableRefObject<HTMLInputElement | null>;
  algorithm: AlgorithmName;
  generatingAlgorithm: GeneratingAlgorithmName;
  generatingRef: React.MutableRefObject<boolean>;
  generatingIDRef: React.MutableRefObject<number>;
  generating: boolean;
  visualize: boolean;
  likes: number;
  mazeID: number | null;
  mazeName: string | null;
  numberSolved: number;
  setMazeSize: SetState<number>;
  setAlgorithm: SetState<AlgorithmName>;
  setGeneratingAlgorithm?: SetState<GeneratingAlgorithmName>;
  setMaze: SetState<Maze>;
  setSolving: SetState<boolean>;
  setSolved: SetState<boolean>;
  setGenerating: SetState<boolean>;
  setVisualize: SetState<boolean>;
  setLikes: SetState<number>;
  setMazeID: SetState<number | null>;
  setMazeName: SetState<string | null>;
  setNumberSolved: SetState<number>;
}

const defaultContextValue: MazeContextType = {
  mazeSize: 30,
  maze: sampleMazes.welcome,
  solvingRef: { current: false } as React.MutableRefObject<boolean>,
  solving: false,
  solved: false,
  iterationRef: { current: 0 } as React.MutableRefObject<number>,
  resultRef: { current: "" } as React.MutableRefObject<string>,
  imageRef: {
    current: null,
  } as React.MutableRefObject<HTMLInputElement | null>,
  algorithm: "Wall Follower - Left",
  generatingAlgorithm: "Recursive Backtracking",
  generatingRef: { current: false } as React.MutableRefObject<boolean>,
  generatingIDRef: { current: 0 } as React.MutableRefObject<number>,
  generating: false,
  visualize: false,
  likes: 0,
  mazeID: null,
  mazeName: null,
  numberSolved: 0,
  setMazeSize: () => {},
  setAlgorithm: () => {},
  setGeneratingAlgorithm: () => {},
  setMaze: () => {},
  setSolving: () => {},
  setSolved: () => {},
  setGenerating: () => {},
  setVisualize: () => {},
  setLikes: () => {},
  setMazeID: () => {},
  setMazeName: () => {},
  setNumberSolved: () => {},
};

const MazeContext = createContext<MazeContextType>(defaultContextValue);

interface MazeProviderProps {
  children: ReactNode;
}

const MazeProvider: React.FC<MazeProviderProps> = ({ children }) => {
  const [mazeSize, setMazeSize] = useState<number>(30);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Wall Follower - Left",
  );
  const [generatingAlgorithm, setGeneratingAlgorithm] =
    useState<GeneratingAlgorithmName>("Recursive Backtracking");
  const [maze, setMaze] = useState<Maze>(sampleMazes.welcome);
  const [solving, setSolving] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const [visualize, setVisualize] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [numberSolved, setNumberSolved] = useState<number>(0);
  const [mazeID, setMazeID] = useState<number | null>(null);
  const [mazeName, setMazeName] = useState<string | null>(null);
  const solvingRef = useRef<boolean>(false);
  const generatingRef = useRef<boolean>(false);
  const generatingIDRef = useRef<number>(0);
  const iterationRef = useRef<number>(0);
  const resultRef = useRef<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <MazeContext.Provider
      value={{
        mazeSize,
        algorithm,
        generatingAlgorithm,
        maze,
        solving,
        generating,
        solved,
        visualize,
        likes,
        mazeID,
        mazeName,
        numberSolved,
        solvingRef,
        generatingRef,
        generatingIDRef,
        iterationRef,
        resultRef,
        imageRef,
        setMazeSize,
        setAlgorithm,
        setGeneratingAlgorithm,
        setMaze,
        setSolving,
        setGenerating,
        setSolved,
        setVisualize,
        setLikes,
        setMazeID,
        setMazeName,
        setNumberSolved,
      }}
    >
      {children}
    </MazeContext.Provider>
  );
};

export { MazeContext, MazeProvider };
