from sqlalchemy import Column, ForeignKey, Integer, String, ARRAY, LargeBinary
from sqlalchemy.orm import relationship
from database import Base 

class MazePost(Base):
    __tablename__ = "maze_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
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
    
    #Relationship to Image
    image = relationship("Image", back_populates="maze_post")
    
class Image(Base):
    __tablename__ = "images"
    
    id = Column(Integer, primary_key=True, index=True)
    board_post_id = Column(Integer, ForeignKey("maze_posts.id"), nullable=False)
    image = Column(LargeBinary, nullable=False)
    
    #Relationship to MazePost
    maze_post = relationship("MazePost", back_populates="image")