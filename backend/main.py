import datetime
import uuid
import smtplib

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from . import models, database, schemas

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
    # Check if email already exists
    existing_email_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_email_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Check if phone already exists
    if user.phone:
        existing_phone_user = db.query(models.User).filter(models.User.phone == user.phone).first()
        if existing_phone_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this phone number already exists"
            )

    # Extract widget data
    data = user.data or {}
    # generate token
    user_token = str(uuid.uuid4())

    brand_img = data.get("brandImg", "")
    brand_name = data.get("brandName", "Our Brand")
    primary_color = data.get("backgroundprimaryColor", "#000000")
    script_snippet = f"""&lt;script&gt;
document.addEventListener("DOMContentLoaded", function () {{
    window.chatButtonOptions = {{
        id: "{data.get('id', '')}",
        token: "{user_token}",
        backgroundprimaryColor: "{data.get('backgroundprimaryColor', '')}",
        buttonText: "Chat with us",
        position: "{data.get('position', '')}"
    }};
    window.brandOptions = {{
        brandName: "{data.get('brandName', '')}",
        brandImg: "{data.get('brandImg', '')}",
        welcomeText: `{data.get('welcomeText', '')}`,
        backgroundprimaryColor: "{data.get('backgroundprimaryColor', '')}",
        backgroundsecondaryColor: "{data.get('backgroundsecondaryColor', '')}",
        textprimaryColor: "#ffffff",
        textsecondaryColor: "#000000",
        buttonText: "Chat with us"
    }};
    var s = document.createElement("script");
    s.src = "./dist/index.js";
    s.async = true;
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
}});
&lt;/script&gt;"""


    # Compose HTML
    mail_html = f"""<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="{brand_img}" alt="{brand_name}" style="max-height: 50px;"/>
        <h2 style="color: #333;">Hello from {brand_name} 👋</h2>
    </div>
    <p style="font-size: 16px; color: #555;">
        Thank you for choosing our chat widget! Below is your unique script snippet.
        Please copy and paste it into your website's <code>&lt;head&gt;</code> section.
    </p>
    <div style="background: #f9f9f9; border: 1px solid #ccc; padding: 15px; margin: 20px 0;">
        <textarea readonly style="width:100%; height:250px; border:none; resize:none; font-family: monospace; font-size:13px; color:#333; background:transparent;">{script_snippet}</textarea>
    </div>
    <p style="font-size: 14px; color: #777; text-align: center;">
        Need help? <a href="mailto:support@example.com" style="color: {primary_color}; text-decoration: none;">Contact our support</a>
    </p>
    <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
        © {datetime.datetime.now().year} {brand_name}. All rights reserved.
    </div>
</div>"""


    # Save new user
    new_user = models.User(
        email=user.email,
        phone=user.phone,
        data=user.data,
        token=user_token
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send HTML email properly
    sender = "Private Person <from@example.com>"
    receiver = "A Test User <to@example.com>"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your Widget Script"
    msg["From"] = sender
    msg["To"] = receiver

    html_part = MIMEText(mail_html, "html", "utf-8")
    msg.attach(html_part)

    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
        server.starttls()
        server.login("adde7a89276810", "38bb9cb3c1c2ba")
        server.sendmail(sender, receiver, msg.as_string())

    return new_user, {"mail_html": mail_html}


@app.post('/api/check/token', response_model=schemas.UserResponse)
async def check_token(token: schemas.Token, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.token == token.token).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token"
        )
    return user
