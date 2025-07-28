import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CancelNode = memo(() => {
  return (
    <div className="bg-red-100 p-4 rounded shadow-md border border-red-600 w-48 text-center">
      <div className="font-bold mb-2">Cancel</div>
      <div>Message sending cancelled.</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default CancelNode;
