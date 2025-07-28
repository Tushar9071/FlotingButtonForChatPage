import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface PriveNodeProps {
  data: {
    onSend: () => void;
    onCancel: () => void;
  };
}

const PriveNode = memo(({ data }: PriveNodeProps) => {
  return (
    <div className="bg-yellow-100 p-4 rounded shadow-md border border-yellow-600 w-56 text-center">
      <div className="font-bold mb-2">Prive Node</div>
      <div className="flex gap-2 justify-center">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={data.onSend}>Send Success</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={data.onCancel}>Cancel</button>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default PriveNode;
