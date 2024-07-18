import React from "react";
import "../styling/ClientControlPanel.css";
import { algorithm, AlgorithmName } from "../utilities/types";

type ClientControlPanelProps = {
    gridSize: number;
    setGridSize: React.Dispatch<React.SetStateAction<number>>;
    setAlgorithm: React.Dispatch<React.SetStateAction<AlgorithmName>>
};

const ClientControlPanel: React.FC<ClientControlPanelProps> = ({
    gridSize,
    setGridSize,
    setAlgorithm
}) => {
    return (
        <div className="clientcontrolpanel__card">
            <div>
                Grid size:{" "}
                <input
                    id="gridSize"
                    name="gridSize"
                    type="number"
                    min="10"
                    max="100"
                    value={gridSize}
                    onChange={(e): void => setGridSize(Number(e.target.value))}
                />
            </div>
            <div>
                Algorithm:{" "}
                <select name="algorithm" id="algorithm" onChange={(e): void => setAlgorithm(e.target.value as AlgorithmName)}>
                  {Object.keys(algorithm).map((key) => <option id={key} value={key}>{key}</option>)}
                </select>
            </div>
        </div>
    );
};

export default ClientControlPanel;
