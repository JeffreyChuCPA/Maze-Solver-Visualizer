import React from "react";
import "../styling/Maze.css";
import Block from "./Block";

type MazeProps = {
    maze: number[][];
    mazeSize: number;
};

const Maze: React.FC<MazeProps> = ({ maze, mazeSize }) => {

    return (
        <div className="maze">
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="maze__row">
                    {row.map((cell, colIndex) => (
                        <Block  blockType={cell} key={colIndex} mazeSize={mazeSize}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Maze;
