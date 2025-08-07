import { memo } from "react";
import { Handle, Position } from "reactflow";
interface AnswerNodeProps {
  data: {
    message: string;
    onAnswerChange: (msg: string) => void;
  };
}

const AnswerNode = memo(({ data }: AnswerNodeProps) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-blue-400 w-64">
      <div className="font-bold mb-2">Answer Node</div>
      <textarea
        className="w-full border rounded p-2 mb-2"
        value={data.message}
        onChange={(e) => data.onAnswerChange?.(e.target.value)}
        placeholder="Enter WhatsApp message..."
      />
      <Handle
        type="target"
        className="w-5 h-5 bg-green-400 border-2 border-green-600 rounded-full shadow"
        position={Position.Left}
      />
      <Handle
        type="source"
        className="w-5 h-5 bg-green-400 border-2 border-green-600 rounded-full shadow"
        position={Position.Right}
      />
    </div>
  );
});

export default AnswerNode;
