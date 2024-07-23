import React from "react";
import "../styling/ClientControlPanel.css";
import { ClientControlPanelProps } from "../utilities/types";
import sampleMazes from "../utilities/sampleMazes";
import { algorithms } from "../utilities/objects";

const ClientControlPanel: React.FC<ClientControlPanelProps> = ({
  mazeSize,
  maze,
  solving,
  solvingRef,
  setMazeSize,
  setAlgorithm,
  setMaze,
  setSolving,
}) => {
  // const [showMaze, setShowMaze] = useState<boolean>(false);

  //! generate an actual grid based on given gridSize
  //! Bug: clicking generateMaze to stop the maze would alternately flash the other maze for a brief moment
  const generateMaze = () => {
    setSolving(false);
    solvingRef.current = false;

    const sampleMaze = Math.floor(Math.random() * sampleMazes.length);
    console.log(sampleMaze);
    setMaze(sampleMazes[sampleMaze]);
  };

  const startSolving = () => {
    setSolving(!solving);
    solvingRef.current = false;
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
      <button onClick={startSolving}>Visualize Solver</button>
    </div>
  );
};

export default ClientControlPanel;
