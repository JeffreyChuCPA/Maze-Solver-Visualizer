import { BoardPost } from "./types";

//*Post method to API
export const postBoard = async (board: BoardPost) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-maze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(board),
    });
    if (response.ok) {
      console.log("successfully submitted");

      const data = await response.json();
      console.log(data);

      alert("Maze has been successfully posted.");
      return data;
    } else {
      alert("Failed to submit board post.");
    }
  } catch (error) {
    alert(`Error occurred: ${error}`);
  }
};

//*Get method to API
export const getBoards = async (amount: number) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mazes?amount=${amount}`);
    if (response.ok) {
      const boards = await response.json();
      console.log(boards);
      return boards;
    } else {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    alert(`Error occurred: ${error}`);
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
        body: JSON.stringify({id, isLiked})
      },
    );

    if (!response.ok) {
      throw new Error("Failed to like maze.");
    }

    const data = await response.json();
    console.log("Maze was liked: ", data);
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
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
        body: JSON.stringify({id})
      },
    );

    if (!response.ok) {
      throw new Error("Failed to updated number of times solved.");
    }

    const data = await response.json();
    console.log("Maze solve count is updated: ", data);
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
