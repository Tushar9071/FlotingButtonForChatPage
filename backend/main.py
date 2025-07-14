from fastapi import FastAPI, Depends, HTTPException, status,Path
from sqlalchemy.orm import Session
from . import models, database , schemas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/add/user')
async def add_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # print(user)
    # Check if email or phone already exists
    existing_user = (
        db.query(models.User)
        .filter(
            (models.User.email == user.email) |     
            (models.User.phone == user.phone)
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or phone already exists"
        )

    new_user = models.User(email=user.email, phone=user.phone , data = user.data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user