from fastapi import HTTPException, status
from database import SessionLocal
from models import models
from pydantic import BaseModel

class ChatRequest(BaseModel):
    msg: str
def chat_api(data: ChatRequest):
    """Chat API endpoint to handle chat messages."""
    db = SessionLocal()
    ans = []

    try:
        flows = db.query(models.ReactFlow).all()
        for flow in flows:
            if flow.nodes:
                trigger_messages = []
                answer_messages = []

                for node in flow.nodes:
                    if isinstance(node, dict):
                        node_type = node.get("type")
                        message = node.get("data", {}).get("message", "")

                        if node_type == "trigger":
                            trigger_messages.append(message)
                        elif node_type == "answer":
                            answer_messages.append(message)

                max_len = max(len(trigger_messages), len(answer_messages))
                for i in range(max_len):
                    pair = {
                        "input": trigger_messages[i] if i < len(trigger_messages) else "",
                        "output": answer_messages[i] if i < len(answer_messages) else ""
                    }
                    ans.append(pair)
    except Exception as e:  
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        db.close()
    
    for item in ans:
        if item["input"].lower() == data.msg.lower():
            return {
                "message": item["output"],
                "status": "success"
            }
    
    return {
        "message": "I'm sorry, I don't understand that. Could you please rephrase your question?",
        "status": "success"
    }
        
