import { useContext, useEffect } from "react";
import Board from "../components/Board";
import ClientControlPanel from "../components/ClientControlPanel";
import { PageContext } from "../PageProvider";
import { MazeContext } from "../MazeProvider";
import sampleMazes from "../utilities/sampleMazes";
import FetchedBoards from "../components/FetchedBoards";

const Home = () => {
  const {currentPage} = useContext(PageContext)
  const {setMaze} = useContext(MazeContext)

  useEffect(() => {
      if (currentPage === "Home") {
        setMaze(sampleMazes.mazeSample50_1)
      }
  }, [setMaze, currentPage])  
  
  return (
    <>
      <ClientControlPanel/>
      <Board/>
      <FetchedBoards/> 
    </>
  );
};

export default Home;
