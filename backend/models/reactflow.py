from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional


class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    positionAbsolute: Optional[Dict[str, float]] = None
    width: Optional[float] = None
    height: Optional[float] = None
    selected: Optional[bool] = None
    dragging: Optional[bool] = None
    
class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    type: Optional[str] = None
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None
    animated: Optional[bool] = None
    style: Optional[Dict[str, Any]] = None
    data: Optional[Dict[str, Any]] = None
    
    
class ReactFlowData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    description: Optional[str] = None
    user_id: Optional[int] = None