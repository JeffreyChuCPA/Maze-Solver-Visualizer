import { useContext, useEffect } from "react";
import { PageContext } from "../PageProvider";
import ClientControlPanel from "../components/ClientControlPanel";
import Board from "../components/Board";
import { generateBaseBuildMaze } from "../utilities/utilities";
import { MazeContext } from "../MazeProvider";
import SubmitBoard from "../components/SubmitBoard";

const BuildBoard = () => {
  const { currentPage } = useContext(PageContext);
  const {
    mazeSize,
    setMazeName,
    setMaze,
    iterationRef,
    resultRef,
    setVisualize,
    solvingRef,
    setSolved,
  } = useContext(MazeContext);

  useEffect(() => {
    if (currentPage === "build-board") {
      setMaze(generateBaseBuildMaze(mazeSize));
      setMazeName(null);
      iterationRef.current = 0;
      resultRef.current = "";
      solvingRef.current = false;
      setVisualize(false);
      setSolved(false);
    }
  }, [
    mazeSize,
    setMazeName,
    setMaze,
    currentPage,
    iterationRef,
    resultRef,
    setVisualize,
    solvingRef,
    setSolved,
  ]);

  return (
    <>
      <ClientControlPanel />
      <Board />
      <SubmitBoard />
    </>
  );
};

export default BuildBoard;
