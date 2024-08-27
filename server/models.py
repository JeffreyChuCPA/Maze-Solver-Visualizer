from sqlalchemy import Column, ForeignKey, Integer, String, ARRAY, LargeBinary
from database import Base 

class MazePost(Base):
    __tablename__ = "maze_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    # mazeID = Column(Integer, nullable=False, unique=True)
    maze = Column(ARRAY(Integer), nullable=False)
    mazeSize = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    numberSolved = Column(Integer, default=0)
    numberLikes = Column(Integer, default=0)
    pathColor = Column(String, nullable=False)
    wallColor = Column(String, nullable=False)
    walkedColor = Column(String, nullable=False)
    queuedColor = Column(String, nullable=False)
    shortPathColor = Column(String, nullable=False)
    
class Image(Base):
    __tablename__ = "images"
    
    id = Column(Integer, primary_key=True, index=True)
    board_post_id = Column(Integer, ForeignKey("maze_posts.id"), nullable=False)
    image = Column(String, nullable=False)