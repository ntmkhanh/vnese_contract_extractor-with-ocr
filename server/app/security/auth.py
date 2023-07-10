import datetime as dt
from typing import Union
from jose import JWTError, jwt

def create_access_token(data: dict, expires_delta: Union[dt.timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = dt.utcnow() + expires_delta
    else:
        expire = dt.utcnow() + dt.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
