from typing import List, Optional
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    name: str

class UserCreate(UserBase):
    usertype: int = 1
    password: str

class UserDelete(UserBase):
    id: int

class UserLogin(BaseModel):
    username: str
    password: str

class UserCheck(BaseModel):
    username: str

class User(UserBase):
    id: int
    registered_date: str
    usertype: int
    
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class ExtractRequest(BaseModel):
    img: str

class MultipleExtractRequest(BaseModel):
    imgs: List[str]
    
# class TokenData(BaseModel):
#     username: Union[str, None] = None