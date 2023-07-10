from sqlalchemy import Column, Integer, String, Boolean
from .config import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    registered_date = Column(String, unique=False, nullable=False)
    usertype = Column(Integer, unique=False, nullable=False, default=1) # 0: admin, 1: user
    # is_active = Boolean(default=False)