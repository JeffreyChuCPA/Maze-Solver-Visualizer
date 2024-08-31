from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import base64

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# CORS settings
origins = [
    "http://localhost:5173",  # Add your frontend's URL
    # You can add more origins if needed, e.g., for deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def decode_base64_image(data_url):
    base64_str = data_url.split(",")[1]
    return base64.b64decode(base64_str)

class MazeBase(BaseModel):
    name: str
    mazeID: int | None
    maze: List[List[int]]
    mazeSize: int
    date: str
    image: str
    numberSolved: int
    numberLikes: int
    pathColor: str
    wallColor: str
    walkedColor: str
    queuedColor: str
    shortPathColor: str

class UpdatedLikeRequest(BaseModel):
    id: int
    isLiked: bool

class UpdatedSolveRequest(BaseModel):
    id: int

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()    

#* Get x amount of  user created mazes
@app.get("/mazes", response_model=List[MazeBase])
async def get_all_mazes(db: Annotated[Session, Depends(get_db)], amount: int = Query(default=10)):
    result_maze_posts = []
    results = db.query(models.MazePost, models.Image).outerjoin(models.Image, models.MazePost.id == models.Image.board_post_id).limit(amount).all()
    
    if not results:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    # Create a dictionary to store images
    image_dict = {}
    for maze_post, image in results:
        if image:
            image_data = f"data:image/png;base64,{base64.b64encode(image.image).decode('utf-8')}"
            image_dict[maze_post.id] = image_data

    for maze_post, _ in results:
        image = image_dict.get(maze_post.id, "")
        maze_data = MazeBase(
            mazeID=maze_post.id,
            name=maze_post.name,
            maze=maze_post.maze,
            mazeSize=maze_post.mazeSize,
            date=maze_post.date,
            numberSolved=maze_post.numberSolved,
            numberLikes=maze_post.numberLikes,
            pathColor=maze_post.pathColor,
            wallColor=maze_post.wallColor,
            walkedColor=maze_post.walkedColor,
            queuedColor=maze_post.queuedColor,
            shortPathColor=maze_post.shortPathColor,
            image=image
        )
        result_maze_posts.append(maze_data)
    return result_maze_posts

#* Post user created maze
@app.post("/create-maze", response_model=MazeBase)
async def post_maze(maze: MazeBase, db: Annotated[Session, Depends(get_db)]):
    try:
        db_posted_maze = models.MazePost(
            name=maze.name,
            maze=maze.maze,
            mazeSize=maze.mazeSize,
            date=maze.date,
            numberSolved=maze.numberSolved,
            numberLikes=maze.numberLikes,
            pathColor=maze.pathColor,
            wallColor=maze.wallColor,
            walkedColor=maze.walkedColor,
            queuedColor=maze.queuedColor,
            shortPathColor=maze.shortPathColor
        )
        db.add(db_posted_maze)
        db.commit()
        db.refresh(db_posted_maze)
        
        db_maze_image = models.Image(image=decode_base64_image(maze.image), board_post_id=db_posted_maze.id)
        db.add(db_maze_image)
        db.commit()
        
        return MazeBase(
            name=db_posted_maze.name,
            mazeID=db_posted_maze.id,
            maze=db_posted_maze.maze,
            mazeSize=db_posted_maze.mazeSize,
            date=db_posted_maze.date,
            image=maze.image,
            numberSolved=db_posted_maze.numberSolved,
            numberLikes=db_posted_maze.numberLikes,
            pathColor=db_posted_maze.pathColor,
            wallColor=db_posted_maze.wallColor,
            walkedColor=db_posted_maze.walkedColor,
            queuedColor=db_posted_maze.queuedColor,
            shortPathColor=db_posted_maze.shortPathColor
        )
    except Exception as error:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {error}")

#* Update number of likes for a specific user created maze
@app.put("/update-likes", response_model=int)
async def update_numberLikes(data: UpdatedLikeRequest, db: Annotated[Session, Depends(get_db)]):
    maze_post = db.query(models.MazePost).filter(models.MazePost.id == data.id).one_or_none()
    
    if maze_post is None:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    if data.isLiked:
        maze_post.numberLikes += 1
    else:
        maze_post.numberLikes -= 1
    
    db.commit()
    db.refresh(maze_post)
    return  maze_post.numberLikes

#* Update number solved for a specific user created maze
@app.put("/update-solved", response_model=int)
async def update_numberSolved(data: UpdatedSolveRequest, db: Annotated[Session, Depends(get_db)]):
    maze_post = db.query(models.MazePost).filter(models.MazePost.id == data.id).one_or_none()
    
    if maze_post is None:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    maze_post.numberSolved += 1
    db.commit()
    db.refresh(maze_post)
    
    return maze_post.numberSolved