import React from 'react'
import "../styling/Board.css";
import Maze from './Maze';
import { AlgorithmName } from '../utilities/types';
import { solver } from '../utilities/solver';

type BoardProps = {
  mazeSize: number;
  algorithm: AlgorithmName;
  maze: number[][];
  solving: boolean;
  setSolving: React.Dispatch<React.SetStateAction<boolean>>;
  setMaze: React.Dispatch<React.SetStateAction<number[][]>>;
} 

const Board: React.FC<BoardProps> = ({mazeSize, algorithm, maze, setMaze, solving, setSolving}) => {


  //*when solving == True, use given algorithm to solve the grid
  if (solving) {
    const solvedPath = solver(maze, algorithm, setMaze, 10, setSolving)
    console.log(solvedPath);
  }
  

  return (
    <div className='board__card'>
      <Maze maze={maze} mazeSize={mazeSize} />
    </div>
  )
}

export default Board