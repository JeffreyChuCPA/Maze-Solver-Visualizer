import React, { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "../PageProvider";
import { AlgorithmName, Maze } from "../utilities/types";
import ClientControlPanel from "../components/ClientControlPanel";
import Board from "../components/Board";
import { generateBaseBuildMaze } from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";

const BuildBoard = () => {
  const {currentPage} = useContext(PageContext)
  const {mazeSize, setMaze} = useContext(MazeContext)

    useEffect(() => {
    if (currentPage === "build-board") {
      setMaze(generateBaseBuildMaze(mazeSize))
    }
  }, [mazeSize, setMaze, currentPage])  
  
  return (
    <>
      <ClientControlPanel/>
      <Board/>
    </>
  );
};

export default BuildBoard;
