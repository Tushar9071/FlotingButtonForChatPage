import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const SuccessNode = memo(() => {
  return (
    <div className="bg-green-100 p-4 rounded shadow-md border border-green-600 w-48 text-center">
      <div className="font-bold mb-2">Success</div>
      <div>Message sent successfully!</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default SuccessNode;
