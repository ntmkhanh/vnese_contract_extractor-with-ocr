from unicodedata import name
from sqlalchemy.orm import Session
from . import schemas
from ..utils.hash import *
from .. import models
import datetime

def create_user(db: Session, user: schemas.UserCreate):
    date_now = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    hashed_password = hash_password(user.password)
    print(user.usertype)
    db_user = models.User(name=user.name, username=user.username, password=hashed_password, registered_date=date_now, usertype=user.usertype)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()    

def get_users(db: Session):
    return db.query(models.User).all()

def remove_user(db: Session, user_id: int):
    existed_user = db.query(models.User).filter(models.User.id == user_id)
    if not existed_user.first():
        return False
    existed_user.delete(synchronize_session=False)
    db.commit()
    return True