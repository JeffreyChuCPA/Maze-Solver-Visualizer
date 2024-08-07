import { useContext, useRef, useState } from "react";
import "../styling/ClientControlPanel.css";
import { algorithms, generateMazeAlgorithms } from "../utilities/objects";
import { generateBaseBuildMaze, resetMaze } from "../utilities/utilities";
import { solver } from "../utilities/solver";
import { generate } from "../utilities/generate";
import { PageContext } from "../PageProvider";
import { MazeContext } from "../MazeProvider";

const ClientControlPanel = () => {
  const { currentPage } = useContext(PageContext);
  console.log(currentPage);
  const {mazeSize,
    maze,
    solvingRef,
    iterationRef,
    resultRef,
    algorithm,
    generatingAlgorithm,
    generatingRef,
    generating,
    setMazeSize,
    setAlgorithm,
    setGeneratingAlgorithm,
    setMaze,
    setSolving,
    setSolved,
    setGenerating} = useContext(MazeContext)

  const [visualize, setVisualize] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(0)

  const generateMaze = () => {
    solvingRef.current = false;
    if (generatingRef) generatingRef.current = true;
    iterationRef.current = 0;
    resultRef.current = "";
    setSolving(false);
    setSolved(false);
    setVisualize(false);
    if (setGenerating) setGenerating(true);

    generate(
      mazeSize,
      generatingAlgorithm ?? "Recursive Backtracking",
      delay,
      iterationRef,
      resultRef,
      generatingRef || { current: true },
      setMaze,
      setGenerating,
    );
  };

  const startSolving = () => {
    iterationRef.current = 0;
    resultRef.current = "";
    solvingRef.current = true;
    if (generatingRef) generatingRef.current = false;
    setSolving(true);
    if (setGenerating) setGenerating(false);
    setVisualize(true);
    solver(
      maze,
      algorithm,
      delay,
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
    if (generatingRef) generatingRef.current = false;
    iterationRef.current = 0;
    resultRef.current = "";
    setVisualize(false);
    if (setGenerating) setGenerating(false);
    resetMaze(maze, setMaze, 0);
    console.log("Reset");
    console.log(generatingRef?.current);
    
  };

  const clearBuildBoard = () => {
    setMaze(generateBaseBuildMaze(mazeSize))
  }

  const delayCalculation = (delay: number): number => {
    return -60 / 9 * delay + 6000 / 9
  }

  return (
    <>
      {currentPage === "Home" && (
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
            Solving Algorithm:{" "}
            <select
              name="algorithm"
              id="algorithm"
              value={algorithm}
              onChange={(e): void => {
                setAlgorithm(e.target.value as keyof typeof algorithms);
                clearMaze();
              }}
            >
              {Object.keys(algorithms).map((key) => (
                <option id={key} key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div>
            Generating Algorithm:{" "}
            <select
              name="generatingAlgorithm"
              id="generatingAlgorithm"
              value={generatingAlgorithm}
              onChange={(e): void => {
                if (setGeneratingAlgorithm)
                  setGeneratingAlgorithm(
                    e.target.value as keyof typeof generateMazeAlgorithms,
                  );
                clearMaze();
              }}
            >
              {Object.keys(generateMazeAlgorithms).map((key) => (
                <option id={key} key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          {!generating ? (
            <button onClick={generateMaze}>Generate Maze</button>
          ) : (
            <>
              <button onClick={clearMaze}>Stop</button>
            </>
          )}
          {!visualize ? (
            <button onClick={startSolving}>Visualize Solver</button>
          ) : (
            <>
              <button onClick={clearMaze}>Reset</button>
            </>
          )}
          <input type="range" min={10} max={100} step={10} onChange={e => setDelay(delayCalculation(parseFloat(e.target.value)))} value={Math.round((delay - 6000/9) * 9 / -60)}/>
          <div>Speed: {Math.round((delay - 6000/9) * 9 / -60)}%</div>
          <div>Number of Iterations: {iterationRef.current}</div>
          <div>Result: {resultRef.current}</div>
        </div>
      )}{" "}
      {currentPage === "build-board" && (
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
              onChange={(e): void => {
                setMazeSize(Number(e.target.value))
              }}
            />
          </div>
          <div>
            Solving Algorithm:{" "}
            <select
              name="algorithm"
              id="algorithm"
              value={algorithm}
              onChange={(e): void => {
                setAlgorithm(e.target.value as keyof typeof algorithms);
                clearMaze();
              }}
            >
              {Object.keys(algorithms).map((key) => (
                <option id={key} key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <button onClick={clearBuildBoard}>Clear Board</button>
          {!visualize ? (
            <button onClick={startSolving}>Visualize Solver</button>
          ) : (
            <>
              <button onClick={clearMaze}>Reset</button>
            </>
          )}
          <input type="range" min={10} max={100} step={10} onChange={e => setDelay(delayCalculation(parseFloat(e.target.value)))} value={Math.round((delay - 6000/9) * 9 / -60)}/>
          <div>Speed: {Math.round((delay - 6000/9) * 9 / -60)}%</div>
          <div>Number of Iterations: {iterationRef.current}</div>
          <div>Result: {resultRef.current}</div>
        </div>
      )}
    </>
  );
};

export default ClientControlPanel;
