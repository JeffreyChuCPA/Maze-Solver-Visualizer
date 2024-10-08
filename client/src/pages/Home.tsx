import { useCallback, useContext, useEffect, useState } from "react";
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
  const [numberOfMazes, setNumberOfMazes] = useState<number>(10);
  const {
    setMaze,
    iterationRef,
    resultRef,
    setVisualize,
    solvingRef,
    solved,
    setNumberSolved,
    mazeID,
    setMazeName,
  } = useContext(MazeContext);
  const {
    isError,
    data = [],
    isLoading,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(),
    staleTime: 30000,
  });

  const mutationSolved = useMutation({
    mutationFn: ({ id }: { id: number }) => updateNumberSolved(id),
  });

  const debounceMutate = useCallback(
    debounce<number, number>((id: number, updatedNumberSolved: number) => {
      console.log(
        "Solving debounced mutation called with:",
        id,
        updatedNumberSolved,
      ); // Debugging
      mutationSolved.mutate({
        id,
      });
    }, 1000),
    [],
  );

  useEffect(() => {
    if (currentPage === "Home") {
      setMaze(sampleMazes.welcome);
      setMazeName(null);
      iterationRef.current = 0;
      resultRef.current = "";
      solvingRef.current = false;
      setVisualize(false);
    }
  }, [
    setMaze,
    currentPage,
    iterationRef,
    resultRef,
    setVisualize,
    solvingRef,
    setMazeName,
  ]);

  useEffect(() => {
    if (solved && mazeID) {
      setNumberSolved((prevNum) => {
        const updatedNumberSolved = prevNum + 1;
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
        numberOfMazes={numberOfMazes}
        setNumberOfMazes={setNumberOfMazes}
      />
    </>
  );
};

export default Home;
