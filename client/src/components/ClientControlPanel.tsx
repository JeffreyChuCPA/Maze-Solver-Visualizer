import { useContext, useState } from "react";
import "../styling/ClientControlPanel.css";
import { algorithms, generateMazeAlgorithms } from "../utilities/objects";
import {
  delayCalculation,
  delayPercentage,
  generateBaseBuildMaze,
  generateBaseMaze,
  resetMaze,
} from "../utilities/utilities";
import { solver } from "../utilities/solver";
import { generate } from "../utilities/generate";
import { PageContext } from "../PageProvider";
import { MazeContext } from "../MazeProvider";
import { ColorContext, ColorContextType } from "../ColorProvider";

const ClientControlPanel = () => {
  const { currentPage } = useContext(PageContext);
  const {
    mazeSize,
    maze,
    solvingRef,
    iterationRef,
    resultRef,
    algorithm,
    generatingAlgorithm,
    generatingRef,
    generating,
    visualize,
    setVisualize,
    setMazeSize,
    setAlgorithm,
    setGeneratingAlgorithm,
    setMaze,
    setSolving,
    setSolved,
    setGenerating,
    setMazeID,
  } = useContext(MazeContext);
  const colorStates: ColorContextType = useContext(ColorContext);

  const [delay, setDelay] = useState<number>(0);

  const generateMaze = () => {
    solvingRef.current = false;
    if (generatingRef) generatingRef.current = true;
    iterationRef.current = 0;
    resultRef.current = "";
    setSolving(false);
    setSolved(false);
    setVisualize(false);
    if (setGenerating) setGenerating(true);
    setMazeID("");

    generate(
      mazeSize,
      generatingAlgorithm ?? "Recursive Backtracking",
      delay,
      iterationRef,
      resultRef,
      generatingRef || { current: true },
      setMaze,
      setGenerating,
      colorStates.setHighlightedRow,
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
  };

  const clearBuildBoard = () => {
    setVisualize(false);
    iterationRef.current = 0;
    resultRef.current = "";
    solvingRef.current = false;
    setMaze(generateBaseBuildMaze(mazeSize));
  };

  const fillBuildBoard = () => {
    setVisualize(false);
    iterationRef.current = 0;
    resultRef.current = "";
    solvingRef.current = false;
    setMaze(generateBaseMaze(mazeSize, setMaze));
  };

  return (
    <>
      {currentPage === "Home" && (
        <div className="clientcontrolpanel__card">
          <div>
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
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              onChange={(e) =>
                setDelay(delayCalculation(parseFloat(e.target.value)))
              }
              value={delayPercentage(delay)}
            />
            <div>Speed: {delayPercentage(delay)}%</div>
            <div>Number of Iterations: {iterationRef.current}</div>
            <div>Result: {resultRef.current}</div>
          </div>
          <div className="clientcontrolpanel__colorselection">
            <div className="clientcontrolpanel__colorselector">
              <span>Path Color: </span>
              <input
                type="color"
                value={colorStates.pathColor}
                onChange={(e) => colorStates.setPathColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span>Wall Color: </span>
              <input
                type="color"
                value={colorStates.wallColor}
                onChange={(e) => colorStates.setWallColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span> Walked Color: </span>
              <input
                type="color"
                value={colorStates.walkedColor}
                onChange={(e) => colorStates.setWalkedColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span>Queued Color: </span>
              <input
                type="color"
                value={colorStates.queuedColor}
                onChange={(e) => colorStates.setQueuedColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span> Current Color: </span>
              <input
                type="color"
                value={colorStates.shortPathColor}
                onChange={(e) => colorStates.setShortPathColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}{" "}
      {currentPage === "build-board" && (
        <div className="clientcontrolpanel__card">
          <div>
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
                  setMazeSize(Number(e.target.value));
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
            <button onClick={fillBuildBoard}>Fill Board</button>
            {!visualize ? (
              <button onClick={startSolving}>Visualize Solver</button>
            ) : (
              <>
                <button onClick={clearMaze}>Reset</button>
              </>
            )}
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              onChange={(e) =>
                setDelay(delayCalculation(parseFloat(e.target.value)))
              }
              value={delayPercentage(delay)}
            />
            <div>Speed: {delayPercentage(delay)}%</div>
            <div>Number of Iterations: {iterationRef.current}</div>
            <div>Result: {resultRef.current}</div>
          </div>
          <div className="clientcontrolpanel__colorselection">
            <div className="clientcontrolpanel__colorselector">
              <span>Path Color: </span>
              <input
                type="color"
                value={colorStates.pathColor}
                onChange={(e) => colorStates.setPathColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span>Wall Color: </span>
              <input
                type="color"
                value={colorStates.wallColor}
                onChange={(e) => colorStates.setWallColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span> Walked Color: </span>
              <input
                type="color"
                value={colorStates.walkedColor}
                onChange={(e) => colorStates.setWalkedColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span>Queued Color: </span>
              <input
                type="color"
                value={colorStates.queuedColor}
                onChange={(e) => colorStates.setQueuedColor(e.target.value)}
              />
            </div>
            <div className="clientcontrolpanel__colorselector">
              <span> Current Color: </span>
              <input
                type="color"
                value={colorStates.shortPathColor}
                onChange={(e) => colorStates.setShortPathColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientControlPanel;
