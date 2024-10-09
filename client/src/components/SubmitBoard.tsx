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
    setVisualize
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

    //*If not solvable, display on clientcontroller that it is unsolvable
    if (resultRef.current !== "Solved") {
      iterationRef.current = 0;
      resultRef.current = "Unsolvable maze";
      setVisualize(true)
      setIsValidating(false);
      resetMaze(maze, setMaze, 0);
      return
    }

    //* if its a valid board, set it to BoardPost and call api submission 
    setBoardPost((prevBoardPost) => {
      const updatedBoardPost: BoardPost = {
        ...prevBoardPost,
        name: nameRef.current!.value,
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
      postBoard(updatedBoardPost);
      return updatedBoardPost;
    });

    setIsValidating(false);
    resetMaze(maze, setMaze, 0);
    iterationRef.current = 0;
    resultRef.current = "";
    return boardPost;
  };

  return (
    <>
      <div className="submitboard__card build">
        <form onSubmit={handleBoardSubmit} className="submitboard__form">
          <div className="submitboard__name">
            Maze Name:{" "}
            <input
              type="text"
              ref={nameRef}
              id="mazename"
              name="mazename"
              minLength={4}
              maxLength={25}
              required
            />
          </div>
          {isValidating ? (
            <button
              className="submitboard__button interactive__button"
              disabled
            >
              Checking...
            </button>
          ) : (
            <button
              className="submitboard__button interactive__button"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default SubmitBoard;
