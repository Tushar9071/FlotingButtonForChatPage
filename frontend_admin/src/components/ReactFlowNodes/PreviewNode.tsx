import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface PreviewNodeProps {
  data: {
    message: string;
    onSend: () => void;
    onCancel: () => void;
  };
}

const PreviewNode = memo(({ data }: PreviewNodeProps) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-green-400 w-64">
      <div className="font-bold mb-2">Preview Node</div>
      <div className="mb-2 border rounded p-2 min-h-[60px]">{data.message || 'No message'}</div>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={data.onSend}>Send Message</button>
        <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={data.onCancel}>Cancel</button>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default PreviewNode;
