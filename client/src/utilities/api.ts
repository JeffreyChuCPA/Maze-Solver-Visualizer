import { BoardPost } from "./types";

//*Post method to API
export const postBoard = async (board: BoardPost) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/create-maze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
      },
    );
    if (response.ok) {
      const data = await response.json();
      alert("Maze has been successfully posted.");
      return data;
    } else {
      alert("Failed to submit board post.");
    }
  } catch (error) {
    alert(`Post Error occurred: ${error}`);
  }
};

//*Get method to API
export const getBoards = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mazes`);
    if (response.ok) {
      const boards = await response.json();
      return boards;
    } else {
      const message = `Unable to retrieve mazes`;
      throw new Error(message);
    }
  } catch (error) {
    console.error(`${error}`);
  }
};

//*Update like for user created maze
export const updateBoardLikes = async (id: number, isLiked: boolean) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/update-likes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isLiked }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to like maze.");
    }

    const data = await response.json();
    console.log("Maze was liked: ", data);
    return data;
  } catch (error) {
    console.error("Update Error occurred:", error);
    throw error;
  }
};

//*Update number of times solved for user created maze
export const updateNumberSolved = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/update-solved`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to updated number of times solved.");
    }

    const data = await response.json();
    console.log("Maze solve count is updated: ", data);
    return data;
  } catch (error) {
    console.error("Update Error occurred:", error);
    throw error;
  }
};
