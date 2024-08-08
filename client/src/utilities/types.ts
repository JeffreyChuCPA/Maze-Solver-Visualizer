import React from "react";
import { algorithms, generateMazeAlgorithms } from "./objects";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Maze = number[][];

export type AlgorithmName = keyof typeof algorithms;

export type GeneratingAlgorithmName = keyof typeof generateMazeAlgorithms;

export type ClientControlPanelProps = {
  mazeSize: number;
  maze: Maze;
  solvingRef: React.MutableRefObject<boolean>;
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
};

export type BoardProps = {
  mazeSize: number;
  maze: Maze;
  setMaze: SetState<Maze>;
};

export type DataDisplayProps = {
  iterationRef: React.MutableRefObject<number>;
  resultRef: React.MutableRefObject<string>
};

export type MazeProps = {
  maze: Maze;
  mazeSize: number;
  setMaze: SetState<Maze>;
};

export type Point = {
  x: number;
  y: number;
};

export type QueuePoint = {
  x: number;
  y: number;
  cost: number
};
