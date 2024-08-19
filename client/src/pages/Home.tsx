import { useCallback, useContext, useEffect } from "react";
import Board from "../components/Board";
import ClientControlPanel from "../components/ClientControlPanel";
import { PageContext } from "../PageProvider";
import { MazeContext } from "../MazeProvider";
import sampleMazes from "../utilities/sampleMazes";
import FetchedBoards from "../components/FetchedBoards";
import { getBoards, updateNumberSolved } from "../utilities/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "../utilities/utilities";

const Home = () => {
  const { currentPage } = useContext(PageContext);
  const {
    setMaze,
    iterationRef,
    resultRef,
    setVisualize,
    solvingRef,
    solved,
    setNumberSolved,
    mazeID,
  } = useContext(MazeContext);
  const {
    isError,
    data = [],
    error,
    isLoading,
  } = useQuery({ queryKey: ["boards"], queryFn: getBoards, staleTime: 30000 });
  const mutationSolved = useMutation({
    mutationFn: ({
      id,
      updatedNumberSolved,
    }: {
      id: string;
      updatedNumberSolved: number;
    }) => updateNumberSolved(id, updatedNumberSolved),
  });

  const debounceMutate = useCallback(
    debounce((id: string, updatedNumberSolved: number) => {
      console.log(
        "Solving debounced mutation called with:",
        id,
        updatedNumberSolved,
      ); // Debugging
      mutationSolved.mutate({
        id,
        updatedNumberSolved,
      });
    }, 1000),
    [],
  );

  useEffect(() => {
    if (currentPage === "Home") {
      setMaze(sampleMazes.welcome);
      iterationRef.current = 0;
      resultRef.current = "";
      solvingRef.current = false;
      setVisualize(false);
      console.log("this ran");
    }
  }, [setMaze, currentPage, iterationRef, resultRef, setVisualize, solvingRef]);

  //! should I PUT +1 for each request or the +x for the new number of solved for the board? clicking between different user boards changes the # of solved back to the original fetched value
  useEffect(() => {
    if (solved && mazeID) {
      setNumberSolved((prevNum) => {
        const updatedNumberSolved = prevNum + 1;
        console.log(updatedNumberSolved);

        debounceMutate(mazeID, updatedNumberSolved);
        return updatedNumberSolved;
      });
    }
  }, [debounceMutate, mazeID, setNumberSolved, solved]);

  return (
    <>
      <ClientControlPanel />
      <Board />
      <FetchedBoards
        displayedBoards={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default Home;
