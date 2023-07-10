from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from typing import List
from ..services.extract import extract, ocr_inference
from ..services.process_img import save
from .. import app
from ..models import schemas
from ..models.config import get_db
from ..models.crud import *
from ..utils.hash import *

@app.post("/register", response_model= schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username is already registered")
    return create_user(db, user)

@app.post('/login')
def read_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not does not exist")
    verify_success = verify_password(user.password, db_user.password)
    if not verify_success:
        raise HTTPException(status_code=401, detail="Password is incorrect")
    return 'admin' if db_user.usertype == 0 else 'user'

@app.get("/users", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = get_users(db)
    return users

@app.delete("/users/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    is_success = remove_user(db, user_id)
    if not is_success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Not found user with id: {user_id}")
    return {"message":"Successfully deleted"}

@app.post('/extract')
def extract_data(request: schemas.ExtractRequest):
    path = save(request.img)
    results = extract(path)
    return results

@app.post('/crop_extract')
def extract_data(request: schemas.MultipleExtractRequest):
    results = []
    for img in request.imgs:
        path = save(img)
        result = ocr_inference(path)
        results.append(result)
    return results