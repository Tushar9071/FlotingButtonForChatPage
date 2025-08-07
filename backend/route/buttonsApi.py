from fastapi import APIRouter
from controller import flowChat

router = APIRouter()

@router.get('/api/chat/welcome')
async def get_welcome_message():
    """Get initial welcome message from flows."""
    return flowChat.get_welcome_message()

@router.get('/api/chat/buttons')
async def get_chat_buttons():
    """Get available message buttons from flows."""
    return flowChat.get_available_buttons()

@router.post('/api/chat/response-buttons')
async def get_response_buttons(data: dict):
    """Get response buttons based on last message."""
    return flowChat.get_response_buttons(data.get("lastMessage", ""))
