import React from "react";
import "../styling/DataDisplay.css";
import { DataDisplayProps } from "../utilities/types";

const DataDisplay: React.FC<DataDisplayProps> = ({iterationRef, resultRef}) => {
  return <>
    <div className="datadisplay__card">
        <div>Number of Iterations: {iterationRef.current}</div>
        <div>Result: {resultRef.current}</div>
      </div>;
  </>
};

export default DataDisplay;
