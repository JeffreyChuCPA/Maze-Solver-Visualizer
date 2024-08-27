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
};

export type BoardProps = {
  mazeSize: number;
  maze: Maze;
  setMaze: SetState<Maze>;
};

export type MazeProps = {
  maze: Maze;
  mazeSize: number;
  setMaze: SetState<Maze>;
};

export type FetchedBoardsProps = {
  displayedBoards: BoardPost[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  numberOfMazes: number;
  setNumberOfMazes: SetState<number>
};

export type UserCreatedBoardProps = {
  boardData: BoardPost;
};

export type Point = {
  x: number;
  y: number;
};

export type QueuePoint = {
  x: number;
  y: number;
  cost: number;
};

export type BoardPost = {
  name: string;
  mazeID: number | null;
  maze: Maze;
  mazeSize: number;
  date: string;
  image: string;
  numberSolved: number;
  numberLikes: number;
  pathColor: string;
  wallColor: string;
  walkedColor: string;
  queuedColor: string;
  shortPathColor: string;
};
