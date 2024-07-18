import React, { useState } from 'react'
import Board from '../components/Board'
import ClientControlPanel from '../components/ClientControlPanel'
import DataDisplay from '../components/DataDisplay'
import { AlgorithmName } from '../utilities/types'

const Home = () => {

  const [gridSize, setGridSize] = useState<number>(50)
  const [algorithm, setAlgorithm] = useState<AlgorithmName>('Depth First Search (DFS)')
  console.log(gridSize);
  console.log(algorithm);
  

  return (
    <>
      <ClientControlPanel gridSize={gridSize} setGridSize={setGridSize} setAlgorithm={setAlgorithm} />
      <Board/>
      <DataDisplay/>
    </>
  )
}

export default Home