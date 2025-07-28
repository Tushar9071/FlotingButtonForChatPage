import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface TriggerNodeProps {
  data: {
    message: string;
    onChange: (msg: string) => void;
  };
}

const TriggerNode = memo(({ data }: TriggerNodeProps) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-blue-400 w-64">
      <div className="font-bold mb-2">Trigger Node</div>
      <textarea
        className="w-full border rounded p-2 mb-2"
        value={data.message}
        onChange={e => data.onChange(e.target.value)}
        placeholder="Enter WhatsApp message..."
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default TriggerNode;
