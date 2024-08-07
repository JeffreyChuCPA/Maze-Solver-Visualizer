﻿# Maze-It-Yourself

## Features
- Visually implements 10 algorithms for maze creation and traversal.
- Control speed and cell colors of the algorithm execution.
- Build feature for custom maze creation that can be downloaded and posted.
- Access and solve custom mazes created by other users.
- Statistics tracking during algorithm execution.
- About page with general algorithm info and additional resources. (WIP)

## User and Engineer stories
User Story: As a User, I want to be able to select Wall Follower left or right algorithm
1. Implement options for selecting left and right wall follower algorithm
2. Implement the algorithm for both left and right wall follower algorithm

User Story: As a User, I want to be able to select the hunt-and-kill maze generation algorithm
1. Implement options for selecting hunt and kill maze generation algorithm
2. Implement the algorithm for hunt and kill maze generation algorithm

User Story: As a User, I want to be able to post my created maze
1. Implement Post feature and button to make a POST request to the BE
2. Implement validation before POST request is sent to the BE (#/% of walls drawn, name provided for maze, solvability of maze, etc)
3. Define a schema and properties for the POST request item (name, maze, date posted, image of the maze, mazeSize, # of times solved, number of likes)
4. Show that post was successful

User Story: As a User, I want to be able to see and select a maze created by another user
1. Fetch mazes from backend API
2. Implement section on the Home page to show the mazes pulled
3. Implement pagenation if there is alot of fetched mazes 
4. Implement a sorting feature to show the mazes (by newest, by hottest/highest # of times solved, by number of likes, by mazeSize, # of mazes per page in pagenation)
5. Implement visual card to show each individual maze pulled (show image of maze, name, date posted)  
6. Update the current maze to be the maze selected by the user (setMaze(selectedMaze))
7. If a user maze is solved, increase the # of times solved for that maze and make a PUT request before user goes to a different page or refreshes the page
8. if a user liked a maze, increase the like count fo that maze and make a PUT request


Engineering Story: As an engineer, I want to see unit tests for all modular functions used in the project
1. Implement Unit tests
2. Use Jest and start with functions in the utilities.ts

Engineering Story: As an engineer, I want to see DRY patterns
1. Implement linting
2. Checkout ESlint
3. Refactor repeated logic in algorithm files
