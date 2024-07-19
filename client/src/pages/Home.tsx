import React, { useState } from 'react'
import Board from '../components/Board'
import ClientControlPanel from '../components/ClientControlPanel'
import DataDisplay from '../components/DataDisplay'
import { AlgorithmName } from '../utilities/types'


const Home = () => {

  const [mazeSize, setMazeSize] = useState<number>(50)
  const [algorithm, setAlgorithm] = useState<AlgorithmName>('Depth First Search (DFS)')
  const [maze, setMaze] = useState<number[][]>([])
  const [solving, setSolving] = useState<boolean>(false)
  console.log(mazeSize);
  console.log(algorithm);
  console.log(solving);
  
  
  

  return (
    <>
      <ClientControlPanel mazeSize={mazeSize} solving={solving} maze={maze} setSolving={setSolving} setMazeSize={setMazeSize} setAlgorithm={setAlgorithm} setMaze={setMaze}/>
      <Board maze={maze} mazeSize={mazeSize} algorithm={algorithm} solving={solving} setSolving={setSolving} setMaze={setMaze}/>
      <DataDisplay/>
    </>
  )
}

export default Home