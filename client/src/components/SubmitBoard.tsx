import React, { useContext, useRef, useState } from "react";
import "../styling/SubmitBoard.css";
import { MazeContext } from "../MazeProvider";
import { BoardPost } from "../utilities/types";
import { ColorContext } from "../ColorProvider";
import { solver } from "../utilities/solver";
import {
  findEndPoint,
  findStartPoint,
  isEnoughWalls,
  minWalls,
  remainingWallsNeeded,
  resetMaze,
  totalWalls,
} from "../utilities/utilities";
import { postBoard } from "../utilities/api";
import html2canvas from "html2canvas";

const SubmitBoard = () => {
  const {
    maze,
    mazeSize,
    iterationRef,
    resultRef,
    solvingRef,
    setMaze,
    setSolving,
    imageRef,
  } = useContext(MazeContext);
  const colorStates = useContext(ColorContext);
  const [boardPost, setBoardPost] = useState<BoardPost>({
    name: "",
    mazeID: null,
    maze,
    mazeSize,
    date: "",
    image: "",
    numberSolved: 0,
    numberLikes: 0,
    pathColor: colorStates.pathColor,
    wallColor: colorStates.wallColor,
    walkedColor: colorStates.walkedColor,
    queuedColor: colorStates.queuedColor,
    shortPathColor: colorStates.shortPathColor,
  });
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleBoardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsValidating(true);

    // const clearMazeForValidation = async () => {
    //   setSolving(false);
    //   solvingRef.current = false;
    //   iterationRef.current = 0;
    //   resultRef.current = "";
    //   new Promise((resolved) => {
    //     resolved(resetMaze(maze, setMaze, 0))
    //   })
    //   console.log("Reset");
    // }

    // await clearMazeForValidation()

    //is there a start and end point
    const start = findStartPoint(maze);
    const end = findEndPoint(maze);

    if (!start || !end) {
      setIsValidating(false);
      return alert("No valid start or endpoint");
    }

    //validate maze with x walls
    if (!isEnoughWalls(maze, mazeSize)) {
      setIsValidating(false);
      console.log(
        `Need to place ${remainingWallsNeeded(minWalls(mazeSize), totalWalls(maze))} block(s)`,
      );
      return alert(
        `Need to place ${remainingWallsNeeded(minWalls(mazeSize), totalWalls(maze))} block(s)`,
      );
    }

    //*create image to be added to boardpost whnen maze is considered solvable
    let imageData = "";
    if (imageRef.current) {
      const image = await html2canvas(imageRef.current);
      imageData = image.toDataURL("image/png");
    }

    //validate maze is solvable via DFS
    const isSolvable = async () => {
      iterationRef.current = 0;
      resultRef.current = "";
      solvingRef.current = true;
      setSolving(true);
      await solver(
        maze,
        "Depth First Search (DFS)",
        0,
        solvingRef,
        iterationRef,
        resultRef,
        setMaze,
        setSolving,
      );
    };

    await isSolvable();

    //*to add custom modal when condition met as alert() interferes with the rendering timing
    if (resultRef.current !== "Solved") {
      iterationRef.current = 0;
      resultRef.current = "";
      setIsValidating(false);
      resetMaze(maze, setMaze, 0);
      return console.log("Can't submit an unsolvable maze");
    }

    //add name, maze, mazesize, date, etc to board post
    //! maze variable that is set is the maze before the handleBoardSubmit is called
    setBoardPost((prevBoardPost) => {
      const updatedBoardPost: BoardPost = {
        ...prevBoardPost,
        name: nameRef.current!.value,
        // mazeID: crypto.randomUUID(),
        maze,
        mazeSize,
        date: Date.now().toString(),
        image: imageData,
        pathColor: colorStates.pathColor,
        wallColor: colorStates.wallColor,
        walkedColor: colorStates.walkedColor,
        queuedColor: colorStates.queuedColor,
        shortPathColor: colorStates.shortPathColor,
      };

      //post to API
      console.log(updatedBoardPost);
      
      postBoard(updatedBoardPost);
      return updatedBoardPost;
    });

    setIsValidating(false);
    resetMaze(maze, setMaze, 0);
    iterationRef.current = 0;
    resultRef.current = "";
    console.log(boardPost);
    
  };

  return (
    <>
      <div className="submitboard__card">
        <form onSubmit={handleBoardSubmit}>
          <div className="submitboard__name">
            Maze Name:{" "}
            <input
              type="text"
              ref={nameRef}
              id="mazename"
              name="mazename"
              minLength={5}
              maxLength={25}
              required
            />
          </div>
          {isValidating ? (
            <button className="submitboard__button" disabled>
              Checking...
            </button>
          ) : (
            <button className="submitboard__button" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default SubmitBoard;
