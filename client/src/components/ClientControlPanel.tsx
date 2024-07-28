import React, { useState } from "react";
import "../styling/ClientControlPanel.css";
import { ClientControlPanelProps } from "../utilities/types";
import sampleMazes from "../utilities/sampleMazes";
import { algorithms } from "../utilities/objects";
import { resetMaze } from "../utilities/utilities";
import { solver } from "../utilities/solver";

const ClientControlPanel: React.FC<ClientControlPanelProps> = ({
  mazeSize,
  maze,
  solvingRef,
  iterationRef,
  resultRef,
  algorithm,
  setMazeSize,
  setAlgorithm,
  setMaze,
  setSolving,
  setSolved,
}) => {
  const [visualize, setVisualize] = useState<boolean>(false);

  //! generate an actual grid based on given gridSize
  //! Bug: clicking generateMaze to stop the maze would alternately flash the other maze for a brief moment
  const generateMaze = () => {
    solvingRef.current = false;
    iterationRef.current = 0;
    resultRef.current = "";
    setSolving(false);
    setSolved(false);
    setVisualize(false);

    const sampleMaze = Math.floor(Math.random() * sampleMazes.length);
    setMaze(sampleMazes[sampleMaze]);
  };

  const startSolving = () => {
    solvingRef.current = true;
    setSolving(true);
    setVisualize(true);
    solver(
      maze,
      algorithm,
      50,
      solvingRef,
      iterationRef,
      resultRef,
      setMaze,
      setSolving,
      setSolved,
    );
  };

  const clearMaze = () => {
    setSolving(false);
    setSolved(false);
    solvingRef.current = false;
    iterationRef.current = 0;
    resultRef.current = "";
    setVisualize(false);
    resetMaze(maze, setMaze, 0);
    console.log('Reset');
    
  };

  return (
    <div className="clientcontrolpanel__card">
      <div>
        Grid size:{" "}
        <input
          id="mazeSize"
          name="mazeSize"
          type="number"
          min="10"
          max="50"
          value={mazeSize}
          onChange={(e): void => setMazeSize(Number(e.target.value))}
        />
      </div>
      <div>
        Algorithm:{" "}
        <select
          name="algorithm"
          id="algorithm"
          onChange={(e): void =>
            setAlgorithm(e.target.value as keyof typeof algorithms)
          }
        >
          {Object.keys(algorithms).map((key) => (
            <option id={key} key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <button onClick={generateMaze}>Generate Maze</button>
      {!visualize ? (
        <button onClick={startSolving}>Visualize Solver</button>
      ) : (
        <>
          <button onClick={clearMaze}>Reset</button>
        </>
      )}
    </div>
  );
};

export default ClientControlPanel;
