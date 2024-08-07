import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PageContext } from "../PageProvider";
import { AlgorithmName, Maze } from "../utilities/types";
import ClientControlPanel from "../components/ClientControlPanel";
import Board from "../components/Board";
import { generateBaseBuildMaze } from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";

const BuildBoard = () => {
  const {currentPage} = useContext(PageContext)
  const {mazeSize, setMaze, iterationRef, resultRef} = useContext(MazeContext)
  
  useEffect(() => {
    if (currentPage === "build-board") {
      setMaze(generateBaseBuildMaze(mazeSize))
      iterationRef.current = 0
      resultRef.current = ''
    }
  }, [mazeSize, setMaze, currentPage, iterationRef, resultRef])  
  
  return (
    <>
      <ClientControlPanel/>
      <Board/>
    </>
  );
};

export default BuildBoard;
