import React, { createContext, ReactNode, useState } from "react";
import { Point, SetState } from "./utilities/types";

export interface ColorContextType {
  pathColor: string;
  setPathColor: SetState<string>;
  wallColor: string;
  setWallColor: SetState<string>;
  walkedColor: string;
  setWalkedColor: SetState<string>;
  queuedColor: string;
  setQueuedColor: SetState<string>;
  shortPathColor: string;
  setShortPathColor: SetState<string>;
  highlightedRow: Point | null;
  setHighlightedRow: SetState<Point | null>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [pathColor, setPathColor] = useState<string>("#FFFFFF");
  const [wallColor, setWallColor] = useState<string>("#000000");
  const [walkedColor, setWalkedColor] = useState<string>("#16dbe9");
  const [queuedColor, setQueuedColor] = useState<string>("#1f666b");
  const [shortPathColor, setShortPathColor] = useState<string>("#fdf90d");
  const [highlightedRow, setHighlightedRow] = useState<Point | null>(null);

  const colorStates: ColorContextType = {
    pathColor,
    setPathColor,
    wallColor,
    setWallColor,
    walkedColor,
    setWalkedColor,
    queuedColor,
    setQueuedColor,
    shortPathColor,
    setShortPathColor,
    highlightedRow,
    setHighlightedRow,
  };

  return (
    <ColorContext.Provider value={colorStates}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };
