from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .models import models
from .models.config import engine

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)
from .controllers import api