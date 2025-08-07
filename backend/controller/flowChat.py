from fastapi import HTTPException, status
from database import SessionLocal
from models import models
from pydantic import BaseModel

class ChatRequest(BaseModel):
    msg: str

class ConversationState(BaseModel):
    current_node_id: str = ""
    conversation_path: list = []

# Global conversation state (in production, use database or session)
conversation_states = {}

def get_node_connections(nodes, edges):
    """Create a mapping of node connections based on edges."""
    connections = {}
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source not in connections:
            connections[source] = []
        connections[source].append(target)
    return connections

def find_connected_nodes(node_id, connections, nodes, node_type):
    """Find nodes connected to a specific node by type."""
    if node_id not in connections:
        return []
    
    connected_nodes = []
    for connected_id in connections[node_id]:
        for node in nodes:
            if node.get("id") == connected_id and node.get("type") == node_type:
                connected_nodes.append(node)
    return connected_nodes

def chat_api(data: ChatRequest):
    """Chat API endpoint that follows node connections and sequence."""
    db = SessionLocal()
    
    try:
        flows = db.query(models.ReactFlow).all()
        for flow in flows:
            if flow.nodes and flow.edges:
                # Create connection mapping
                connections = get_node_connections(flow.nodes, flow.edges)
                
                # Find trigger node that matches user input
                for node in flow.nodes:
                    if isinstance(node, dict) and node.get("type") == "trigger":
                        trigger_message = node.get("data", {}).get("message", "")
                        if trigger_message.lower() == data.msg.lower():
                            # Found matching trigger, get connected answer node
                            connected_answers = find_connected_nodes(node.get("id"), connections, flow.nodes, "answer")
                            if connected_answers:
                                answer_node = connected_answers[0]
                                answer_message = answer_node.get("data", {}).get("message", "")
                                
                                # Check if answer node has connected response nodes
                                connected_responses = find_connected_nodes(answer_node.get("id"), connections, flow.nodes, "response")
                                next_buttons = []
                                for response_node in connected_responses:
                                    user_msg = response_node.get("data", {}).get("userMessage", "")
                                    if user_msg:
                                        next_buttons.append({
                                            "id": f"response_{response_node.get('id')}",
                                            "text": user_msg,
                                            "type": "response"
                                        })
                                
                                return {
                                    "message": answer_message,
                                    "status": "success",
                                    "nextButtons": next_buttons if next_buttons else None,
                                    "currentNodeId": answer_node.get("id")
                                }
                
                # Check for response node matches
                for node in flow.nodes:
                    if isinstance(node, dict) and node.get("type") == "response":
                        user_message = node.get("data", {}).get("userMessage", "")
                        if user_message.lower() == data.msg.lower():
                            bot_response = node.get("data", {}).get("botResponse", "")
                            
                            # Check for further connected response nodes
                            connected_responses = find_connected_nodes(node.get("id"), connections, flow.nodes, "response")
                            next_buttons = []
                            for response_node in connected_responses:
                                user_msg = response_node.get("data", {}).get("userMessage", "")
                                if user_msg:
                                    next_buttons.append({
                                        "id": f"response_{response_node.get('id')}",
                                        "text": user_msg,
                                        "type": "response"
                                    })
                            
                            return {
                                "message": bot_response,
                                "status": "success",
                                "nextButtons": next_buttons if next_buttons else None,
                                "currentNodeId": node.get("id")
                            }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        db.close()
    
    # If no match found, return a default response
    return {
        "message": "I'm sorry, I don't understand that. Could you please rephrase your question?",
        "status": "success"
    }

def get_welcome_message():
    """Get welcome message from the first answer node in flows."""
    db = SessionLocal()
    
    try:
        flows = db.query(models.ReactFlow).all()
        for flow in flows:
            if flow.nodes:
                # Look for answer nodes that are connected to trigger nodes
                for node in flow.nodes:
                    if isinstance(node, dict):
                        node_type = node.get("type")
                        if node_type == "answer":
                            message = node.get("data", {}).get("message", "")
                            if message:
                                return {
                                    "message": message,
                                    "status": "success"
                                }
        
        # Fallback if no answer node found
        return {
            "message": "Hi there 👋\nHow can I help you today?",
            "status": "success"
        }
    except Exception as e:
        print(f"Error getting welcome message: {e}")
        return {
            "message": "Hi there 👋\nHow can I help you today?",
            "status": "success"
        }
    finally:
        db.close()

def get_available_buttons():
    """Get available trigger message buttons from flows."""
    db = SessionLocal()
    buttons = []

    try:
        flows = db.query(models.ReactFlow).all()
        for flow in flows:
            if flow.nodes:
                for node in flow.nodes:
                    if isinstance(node, dict):
                        node_type = node.get("type")
                        node_data = node.get("data", {})

                        # Only show trigger buttons initially
                        if node_type == "trigger":
                            message = node_data.get("message", "")
                            if message:
                                buttons.append({
                                    "id": f"trigger_{node.get('id', '')}",
                                    "text": message,
                                    "type": "trigger"
                                })
    except Exception as e:
        print(f"Error getting buttons: {e}")
    finally:
        db.close()
    
    return {"buttons": buttons}

def get_response_buttons(last_message: str):
    """Get response buttons based on the last message."""
    db = SessionLocal()
    buttons = []

    try:
        flows = db.query(models.ReactFlow).all()
        for flow in flows:
            if flow.nodes:
                for node in flow.nodes:
                    if isinstance(node, dict):
                        node_type = node.get("type")
                        node_data = node.get("data", {})

                        if node_type == "response":
                            user_msg = node_data.get("userMessage", "")
                            if user_msg:
                                buttons.append({
                                    "id": f"response_{node.get('id', '')}",
                                    "text": user_msg,
                                    "type": "response"
                                })
    except Exception as e:
        print(f"Error getting response buttons: {e}")
    finally:
        db.close()
    
    return {"buttons": buttons}
        
