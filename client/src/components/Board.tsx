import { useCallback, useContext, useEffect, useState } from "react";
import "../styling/Board.css";
import Maze from "./Maze";
import { MazeContext } from "../MazeProvider";
import { PageContext } from "../PageProvider";
import { useMutation } from "@tanstack/react-query";
import { updateBoardLikes } from "../utilities/api";
import { debounce, fetchLocalClientLikedState } from "../utilities/utilities";
import html2canvas from "html2canvas";

const Board = () => {
  const { currentPage } = useContext(PageContext);
  const { mazeID, mazeName, imageRef, setLikes } = useContext(MazeContext);
  const [liked, setLiked] = useState<boolean>(false); //*state to be used for visual button indication
  const mutationLikes = useMutation({
    mutationFn: ({ id, isLiked }: { id: number; isLiked: boolean }) =>
      updateBoardLikes(id, isLiked),
  });

  //!to test this and maybe bring up to Home component level with liked/setLiked
  useEffect(() => {
    if (currentPage === "Home" && mazeID) {
      setLiked(fetchLocalClientLikedState(mazeID));
    }
  }, [mazeID, currentPage]);

  //!to test this and maybe bring up to Home component level with liked/setLiked
  useEffect(() => {
    if (mazeID) {
      const savedLikeState = localStorage.getItem("likes");
      const parsedLikeState = savedLikeState ? JSON.parse(savedLikeState) : {};
      parsedLikeState[mazeID] = liked;
      localStorage.setItem("likes", JSON.stringify(parsedLikeState));
    }
  }, [liked, mazeID]);

  //Debounce the data being sent to the network request
  const debounceMutate = useCallback(
    debounce<number, boolean>((id: number, isLiked: boolean) => {
      console.log("Like debounced mutation called with:", id, isLiked); // Debugging log
      mutationLikes.mutate({
        id,
        isLiked,
      });
    }, 2000),
    [],
  );

  //! do i need to update the setLikes?
  const handleLikes = () => {
    if (mazeID) {
      setLiked((prevLiked) => !prevLiked);

      setLikes((prevLikes) => {
        const updatedLikes = liked ? prevLikes - 1 : prevLikes + 1;
        console.log(updatedLikes);

        debounceMutate(mazeID, !liked);
        return updatedLikes;
      });
    } else {
      console.log("Maze not valid for likes");
    }
  };

  const handleDownload = async () => {
    if (imageRef.current) {
      const image = await html2canvas(imageRef.current);
      const imageData = image.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imageData;
      link.download = mazeName ? `${mazeName}.png` : `maze_image.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      return alert("Unable to download maze image");
    }
  };

  return (
    <>
      {currentPage === "Home" && (
        <div className="board__card">
          {mazeName ? (
            <h1 className="board__name">{mazeName}</h1>
          ) : (
            <div className="board__name"></div>
          )}
          <Maze />
          <div className="board__buttons">
            {mazeName && (
              <button
                onClick={handleLikes}
                className="board__like interactive__button"
              >
                Like
                <span style={{ color: liked ? "red" : "#C5C6C7" }}> ❤</span>
              </button>
            )}
            <button
              onClick={handleDownload}
              className="board__download interactive__button"
            >
              Download
            </button>
          </div>
        </div>
      )}
      {currentPage === "build-board" && (
        <div className="board__card build">
          <div className="board__name"></div>
          <Maze />
          <div className="board__buttons">
            <button
              onClick={handleDownload}
              className="board__download interactive__button"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
