from fastapi import FastAPI, HTTPException, Depends
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
    
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()    

#* Get x amount of  user created mazes
@app.get("/mazes/{amount}", response_model=List[MazeBase])
async def get_all_mazes(amount: int, db: Annotated[Session, Depends(get_db)]):
    result_maze_posts = []
    resultMazes = db.query(models.MazePost).limit(amount).all()
    resultImages = db.query(models.Image).all()
    
    if not resultMazes or not resultImages:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    image_dict = {img.board_post_id: f"data:image/png;base64,{base64.b64encode(img.image).decode('utf-8')}" for img in resultImages}

    for result in resultMazes:
        image = image_dict.get(result.id, "")
        maze_data = MazeBase(
            mazeID=result.id,
            name=result.name,
            maze=result.maze,
            mazeSize=result.mazeSize,
            date=result.date,
            numberSolved=result.numberSolved,
            numberLikes=result.numberLikes,
            pathColor=result.pathColor,
            wallColor=result.wallColor,
            walkedColor=result.walkedColor,
            queuedColor=result.queuedColor,
            shortPathColor=result.shortPathColor,
            image=image
        )
        result_maze_posts.append(maze_data)
    return result_maze_posts

#* Post user created maze
@app.post("/mazes", response_model=MazeBase)
async def post_maze(maze: MazeBase, db: Annotated[Session, Depends(get_db)]):
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

#* Update number of likes for a specific user created maze
@app.put("/mazes/number-likes/{mazeID}/{isLiked}", response_model=int)
async def update_numberLikes(mazeID: int, isLiked: bool, db: Annotated[Session, Depends(get_db)]):
    maze_post = db.query(models.MazePost).filter(models.MazePost.id == mazeID).first()
    
    if not maze_post:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    if isLiked:
        maze_post.numberLikes += 1
    else:
        maze_post.numberLikes -= 1
    
    db.commit()
    db.refresh(maze_post)
    return  maze_post.numberLikes

#* Update number solved for a specific user created maze
@app.put("/mazes/number-solved/{mazeID}", response_model=int)
async def update_numberSolved(mazeID: int, db: Annotated[Session, Depends(get_db)]):
    maze_post = db.query(models.MazePost).filter(models.MazePost.id == mazeID).first()
    
    if not maze_post:
        raise HTTPException(status_code=404, detail="Maze post not found")
    
    maze_post.numberSolved += 1
    db.commit()
    db.refresh(maze_post)
    
    return maze_post.numberSolved