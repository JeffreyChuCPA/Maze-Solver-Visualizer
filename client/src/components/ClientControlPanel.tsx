import { useContext, useState } from "react";
import "../styling/ClientControlPanel.css";
import { algorithms, delayValues, generateMazeAlgorithms } from "../utilities/objects";
import {
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
import { useMediaQuery } from "react-responsive";

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
    generatingIDRef,
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
    setMazeName,
  } = useContext(MazeContext);
  const colorStates: ColorContextType = useContext(ColorContext);

  const [delay, setDelay] = useState<number>(0);
  const isMobile: boolean = useMediaQuery({ maxWidth: "767px" });

  const generateMaze = () => {
    solvingRef.current = false;
    generatingRef.current = true;
    iterationRef.current = 0;
    resultRef.current = "";
    setSolving(false);
    setSolved(false);
    setVisualize(false);
    setGenerating(true);
    setMazeID(null);
    setMazeName(null);

    generatingIDRef.current += 1;
    const currentGenerationID = generatingIDRef.current;

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
      currentGenerationID,
      generatingIDRef,
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
    generatingRef.current = false;
    generatingIDRef.current += 1;
    solvingRef.current = false;
    iterationRef.current = 0;
    resultRef.current = "";
    setSolving(false);
    setSolved(false);
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
          <div className="clientcontrolpanel__mazecontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Maze Controls</h1>
            <div className="clientcontrolpanel__mazecontrols__section">
              <div className="clientcontrolpanel__mazecontrols__input">
                Grid size:{" "}
                <input
                  id="mazeSize"
                  name="mazeSize"
                  type="number"
                  min="10"
                  max="50"
                  value={mazeSize}
                  disabled={generatingRef.current || solvingRef.current}
                  onChange={(e): void => setMazeSize(Number(e.target.value))}
                />
              </div>
              <div className="clientcontrolpanel__mazecontrols__input">
                Solving Algorithm:{" "}
                <select
                  name="algorithm"
                  id="algorithm"
                  value={algorithm}
                  disabled={generatingRef.current || solvingRef.current}
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
              <div className="clientcontrolpanel__mazecontrols__input">
                Generating Algorithm:{" "}
                <select
                  name="generatingAlgorithm"
                  id="generatingAlgorithm"
                  value={generatingAlgorithm}
                  disabled={generatingRef.current || solvingRef.current}
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
              {!isMobile && (
                <div className="clientcontrolpanel__mazecontrols__buttons">
                  {!generating ? (
                    <button
                      onClick={generateMaze}
                      disabled={solvingRef.current}
                      className="interactive__button"
                    >
                      Generate Maze
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Stop
                      </button>
                    </>
                  )}
                  {!visualize ? (
                    <button
                      onClick={startSolving}
                      disabled={generatingRef.current}
                      className="interactive__button"
                    >
                      Visualize Solver
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="clientcontrolpanel__colorcontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Color Controls</h1>
            <div className="clientcontrolpanel__colorcontrols__section">
              <div className="clientcontrolpanel__colorselector">
                <span>Path Color: </span>
                <input
                  type="color"
                  value={colorStates.pathColor}
                  onChange={(e) => colorStates.setPathColor(e.target.value)}
                  className="clientcontrolpanel__colorselector__input"
                />
              </div>
              <div className="clientcontrolpanel__colorselector">
                <span>Wall Color: </span>
                <input
                  type="color"
                  value={colorStates.wallColor}
                  onChange={(e) => colorStates.setWallColor(e.target.value)}
                  className="clientcontrolpanel__colorselector__input"
                />
              </div>
              <div className="clientcontrolpanel__colorselector">
                <span> Walked Color: </span>
                <input
                  type="color"
                  value={colorStates.walkedColor}
                  onChange={(e) => colorStates.setWalkedColor(e.target.value)}
                  className="clientcontrolpanel__colorselector__input"
                />
              </div>
              <div className="clientcontrolpanel__colorselector">
                <span>Queued Color: </span>
                <input
                  type="color"
                  value={colorStates.queuedColor}
                  onChange={(e) => colorStates.setQueuedColor(e.target.value)}
                  className="clientcontrolpanel__colorselector__input"
                />
              </div>
              <div className="clientcontrolpanel__colorselector">
                <span> Current Color: </span>
                <input
                  type="color"
                  value={colorStates.shortPathColor}
                  onChange={(e) =>
                    colorStates.setShortPathColor(e.target.value)
                  }
                  className="clientcontrolpanel__colorselector__input"
                />
              </div>
            </div>
          </div>

          <div className="clientcontrolpanel__statscontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Stats</h1>
            <div className="clientcontrolpanel__statscontrols__section">
              <div className="clientcontrolpanel__statscontrols__stats">
                Speed: {delayPercentage(delay)}%
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                onChange={(e) =>
                  setDelay(delayValues[e.target.value as keyof typeof delayValues])
                }
                value={delayPercentage(delay)}
              />
              <div className="clientcontrolpanel__statscontrols__stats">
                Number of Iterations: {iterationRef.current}
              </div>
              <div className="clientcontrolpanel__statscontrols__stats">
                Result: {resultRef.current}
              </div>
              {isMobile && (
                <div className="clientcontrolpanel__mazecontrols__buttons">
                  {!generating ? (
                    <button
                      onClick={generateMaze}
                      disabled={solvingRef.current}
                      className="interactive__button"
                    >
                      Generate Maze
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Stop
                      </button>
                    </>
                  )}
                  {!visualize ? (
                    <button
                      onClick={startSolving}
                      disabled={generatingRef.current}
                      className="interactive__button"
                    >
                      Visualize Solver
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}{" "}
      {currentPage === "build-board" && (
        <div className="clientcontrolpanel__card build">
          <div className="clientcontrolpanel__mazecontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Maze Controls</h1>
            <div className="clientcontrolpanel__mazecontrols__section">
              <div className="clientcontrolpanel__mazecontrols__input">
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
              <div className="clientcontrolpanel__mazecontrols__input">
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
              {!isMobile && (
                <div className="clientcontrolpanel__mazecontrols__buttons">
                  <button
                    onClick={clearBuildBoard}
                    className="interactive__button"
                  >
                    Clear Board
                  </button>
                  <button
                    onClick={fillBuildBoard}
                    className="interactive__button"
                  >
                    Fill Board
                  </button>
                  {!visualize ? (
                    <button
                      onClick={startSolving}
                      className="interactive__button"
                    >
                      Visualize Solver
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="clientcontrolpanel__colorcontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Color Controls</h1>
            <div className="clientcontrolpanel__colorcontrols__section">
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
                  onChange={(e) =>
                    colorStates.setShortPathColor(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="clientcontrolpanel__statscontrols__gridsection">
            <h1 className="clientcontrolpanel__title">Stats</h1>
            <div className="clientcontrolpanel__statscontrols__section">
              <div className="clientcontrolpanel__statscontrols__stats">
                Speed: {delayPercentage(delay)}%
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                onChange={(e) =>
                  setDelay(delayValues[e.target.value as keyof typeof delayValues])
                }
                value={delayPercentage(delay)}
              />
              <div className="clientcontrolpanel__statscontrols__stats">
                Number of Iterations: {iterationRef.current}
              </div>
              <div className="clientcontrolpanel__statscontrols__stats">
                Result: {resultRef.current}
              </div>
              {isMobile && (
                <div className="clientcontrolpanel__mazecontrols__buttons">
                  <button
                    onClick={clearBuildBoard}
                    className="interactive__button"
                  >
                    Clear Board
                  </button>
                  <button
                    onClick={fillBuildBoard}
                    className="interactive__button"
                  >
                    Fill Board
                  </button>
                  {!visualize ? (
                    <button
                      onClick={startSolving}
                      className="interactive__button"
                    >
                      Visualize Solver
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={clearMaze}
                        className="interactive__button"
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientControlPanel;
