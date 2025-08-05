from fastapi import APIRouter , Body
from typing import Any
from controller import flowChat
from controller.flowChat import ChatRequest

router = APIRouter()

@router.post('/api/chat')
async def chat_api(data: ChatRequest):
    """Chat API endpoint to handle chat messages."""
    
    
    return flowChat.chat_api(data)