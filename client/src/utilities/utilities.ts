import { Point } from "./types";

export const findStartPoint = (maze: number[][]): Point | null => {
  let startPoint: Point = {x: 0, y: 0}
  if (maze.length > 0) {
    for (let i: number = 0; i < maze[0].length; i++) {
      if (maze[0][i] === 0) {
        startPoint = {x: 0, y: i}
        return startPoint
      } else if (maze[i][0] === 0) {
        startPoint = {x: i, y: 0}
        return startPoint
      }
    }
  }
  return null
}

export const findEndPoint = (maze: number[][]): Point | null => {
  
  if (maze.length > 0) {
    let endPoint: Point = {x: maze[0].length - 1, y: maze[0].length - 1}
    for (let i: number = 0; i < maze[0].length; i++) {
      if (maze[maze[0].length - 1][i] === 0) {
        endPoint = {x: maze[0].length - 1, y: i}
        return endPoint
      } else if (maze[i][maze[0].length - 1] === 0) {
        endPoint = {x: i, y: maze[0].length - 1}
        return endPoint
      }
    }
  }
  return null
}