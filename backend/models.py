from sqlalchemy import String, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=True)
    data: Mapped[dict] = mapped_column(JSON, nullable=True)
    token: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
