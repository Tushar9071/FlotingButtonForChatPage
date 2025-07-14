from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    # name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[int] = None
    data: Optional[dict] = None

class UserCreate(UserBase):
    # name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[int] = None
    data: Optional[dict] = None

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
