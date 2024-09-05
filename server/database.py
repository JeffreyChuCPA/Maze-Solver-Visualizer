import os
from dotenv import load_dotenv
from sqlalchemy import create_engine #* used to create a new database connection
from sqlalchemy.orm import sessionmaker #* function is a factory for creating new Session objects, which are used to interact with the database. A Session manages the persistence operations for ORM-mapped objects.
from sqlalchemy.ext.declarative import declarative_base #* function used to create a base class for the ORM models. When you create your models by subclassing this base class, SQLAlchemy uses them to map Python objects to database tables.

#* connection string that SQLAlchemy will use to connect to the PostgreSQL database.
load_dotenv()
URL_DATABASE = os.getenv("DATABASE_URL")

#* Creates the SQLAlchemy Engine object. The Engine is the starting point for any SQLAlchemy application that interacts with a database. It provides a source of database connections and manages the connection pool.
#* The engine manages the database connection and is used by the SessionLocal to create new sessions
engine = create_engine(URL_DATABASE)

#* A custom session factory that will create Session objects. A Session is used to manage transactions and all interactions with the database.
#* bind=engine binds the Session to the engine, meaning that all sessions created with this sessionmaker will use the same database connection settings defined by the engine
#* This is used to create session objects, which are the main interface to the database. You’ll use these sessions to add, update, and query your database records.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#* base class for all ORM models that you will define. By inheriting from Base, your models will be mapped to database tables
#* All your ORM models will inherit from Base, and these models will be automatically mapped to tables in your PostgreSQL database when you create or update the database schema.
Base = declarative_base()