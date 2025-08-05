from fastapi import APIRouter, Request, HTTPException, status
from controller import reactFlowController
from models import reactflow
from fastapi import Body, Path
from typing import List

router = APIRouter()


@router.post('/api/add/flow')
async def add_flow(data: reactflow.ReactFlowData):
    """Save a new flow to the database"""
    return reactFlowController.save_flow(
        [dict(node) for node in data.nodes], 
        [dict(edge) for edge in data.edges],
        description=data.description,
        user_id=data.user_id
    )


@router.get('/api/flows', response_model=List[dict])
async def get_all_flows():
    """Get all flows from the database"""
    return reactFlowController.get_all_flows()


@router.get('/api/flow/{flow_id}')
async def get_flow(flow_id: int = Path(..., title="The ID of the flow to retrieve")):
    """Get a flow by its ID"""
    flow = reactFlowController.get_flow_by_id(flow_id)
    if flow is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flow with ID {flow_id} not found"
        )
    return flow


@router.put('/api/flow/{flow_id}')
async def update_flow(data: reactflow.ReactFlowData, flow_id: int = Path(..., title="The ID of the flow to update")):
    """Update an existing flow"""
    result = reactFlowController.update_flow(
        flow_id,
        [dict(node) for node in data.nodes], 
        [dict(edge) for edge in data.edges],
        description=data.description,
        user_id=data.user_id
    )
    
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flow with ID {flow_id} not found"
        )
    return result


@router.delete('/api/flow/{flow_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_flow(flow_id: int = Path(..., title="The ID of the flow to delete")):
    """Delete a flow by its ID"""
    deleted = reactFlowController.delete_flow(flow_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flow with ID {flow_id} not found"
        )
    return None