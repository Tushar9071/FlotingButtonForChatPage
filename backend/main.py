from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel

class Item(BaseModel):
    id:int
    name:str
    email:Optional[str]

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}