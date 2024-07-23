import React from "react";
import { algorithms } from "./objects";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Maze = number[][];

export type AlgorithmName = keyof typeof algorithms;

export type ClientControlPanelProps = {
  mazeSize: number;
  maze: Maze;
  solving: boolean;
  solvingRef: React.MutableRefObject<boolean>;
  setMazeSize: SetState<number>;
  setAlgorithm: SetState<AlgorithmName>;
  setMaze: SetState<Maze>;
  setSolving: SetState<boolean>;
};

export type BoardProps = {
  mazeSize: number;
  algorithm: AlgorithmName;
  maze: Maze;
  solving: boolean;
  solvingRef: React.MutableRefObject<boolean>;
  setSolving: SetState<boolean>;
  setMaze: SetState<Maze>;
};

export type MazeProps = {
  maze: Maze;
  mazeSize: number;
};

export type Point = {
  x: number;
  y: number;
};
