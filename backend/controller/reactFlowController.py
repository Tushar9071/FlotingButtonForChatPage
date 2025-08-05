from typing import Dict, List, Optional
from datetime import datetime
from database import SessionLocal
from models.models import ReactFlow
from sqlalchemy.orm import Session

def save_flow(nodes: List[Dict], edges: List[Dict], description: Optional[str] = None, user_id: Optional[int] = None):
    db = SessionLocal()
    
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        flow_name = f"flow_{timestamp}"
        
        new_flow = ReactFlow(
            name=flow_name,
            description=description,
            user_id=user_id,
            nodes=nodes,
            edges=edges
        )
        
        db.add(new_flow)
        db.commit()
        db.refresh(new_flow)
        
        return {
            "message": "Flow saved successfully to database",
            "id": new_flow.id,
            "name": new_flow.name,
            "description": new_flow.description,
            "user_id": new_flow.user_id,
            "nodeCount": len(nodes),
            "edgeCount": len(edges),
            "created_at": new_flow.created_at.isoformat()
        }
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def get_flow_by_id(flow_id: int) -> Optional[Dict]:
    """Retrieve a flow by its ID"""
    db = SessionLocal()
    try:
        flow = db.query(ReactFlow).filter(ReactFlow.id == flow_id).first()
        if flow:
            return {
                "id": flow.id,
                "name": flow.name,
                "description": flow.description,
                "user_id": flow.user_id,
                "nodes": flow.nodes,
                "edges": flow.edges,
                "created_at": flow.created_at.isoformat(),
                "updated_at": flow.updated_at.isoformat()
            }
        return None
    finally:
        db.close()


def get_all_flows() -> List[Dict]:
    """Retrieve all flows"""
    db = SessionLocal()
    try:
        flows = db.query(ReactFlow).order_by(ReactFlow.created_at.desc()).all()
        return [
            {
                "id": flow.id,
                "name": flow.name,
                "description": flow.description,
                "user_id": flow.user_id,
                "nodeCount": len(flow.nodes),
                "edgeCount": len(flow.edges),
                "created_at": flow.created_at.isoformat(),
                "updated_at": flow.updated_at.isoformat()
            }
            for flow in flows
        ]
    finally:
        db.close()


def update_flow(flow_id: int, nodes: List[Dict], edges: List[Dict], 
                description: Optional[str] = None, user_id: Optional[int] = None) -> Optional[Dict]:
    """Update an existing flow"""
    db = SessionLocal()
    try:
        flow = db.query(ReactFlow).filter(ReactFlow.id == flow_id).first()
        if not flow:
            return None
        
        flow.nodes = nodes
        flow.edges = edges
        
        if description is not None:
            flow.description = description
        if user_id is not None:
            flow.user_id = user_id
            
        flow.updated_at = datetime.now()
        
        db.commit()
        db.refresh(flow)
        
        return {
            "message": "Flow updated successfully",
            "id": flow.id,
            "name": flow.name,
            "description": flow.description,
            "user_id": flow.user_id,
            "nodeCount": len(nodes),
            "edgeCount": len(edges),
            "updated_at": flow.updated_at.isoformat()
        }
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def delete_flow(flow_id: int) -> bool:
    """Delete a flow by its ID"""
    db = SessionLocal()
    try:
        flow = db.query(ReactFlow).filter(ReactFlow.id == flow_id).first()
        if not flow:
            return False
        
        db.delete(flow)
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()