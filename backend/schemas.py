from pydantic import BaseModel
from typing import Optional, Dict


class UserCreate(BaseModel):
    email: str
    phone: Optional[str] = None
    data: Optional[Dict] = None


class UserResponse(BaseModel):
    id: int
    email: str
    phone: Optional[str] = None
    data: Optional[Dict] = None
    token: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    token: str
