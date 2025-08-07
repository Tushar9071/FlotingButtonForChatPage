import { memo } from "react";
import { Handle, Position } from "reactflow";

interface ResponseNodeProps {
  data: {
    userMessage: string;
    botResponse: string;
    onUserMessageChange: (msg: string) => void;
    onBotResponseChange: (msg: string) => void;
  };
}

const ResponseNode = memo(({ data }: ResponseNodeProps) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-purple-400 w-80">
      <div className="font-bold mb-2 text-purple-600">Response Node</div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Response:
        </label>
        <textarea
          className="w-full border rounded p-2 mb-2 h-16 resize-none"
          value={data.userMessage}
          onChange={(e) => data.onUserMessageChange?.(e.target.value)}
          placeholder="What user might respond..."
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bot Reply:
        </label>
        <textarea
          className="w-full border rounded p-2 h-16 resize-none"
          value={data.botResponse}
          onChange={(e) => data.onBotResponseChange?.(e.target.value)}
          placeholder="Bot's response to user..."
        />
      </div>

      <Handle
        type="target"
        className="w-5 h-5 bg-purple-400 border-2 border-purple-600 rounded-full shadow"
        position={Position.Left}
      />
      <Handle
        type="source"
        className="w-5 h-5 bg-purple-400 border-2 border-purple-600 rounded-full shadow"
        position={Position.Right}
      />
    </div>
  );
});

ResponseNode.displayName = "ResponseNode";

export default ResponseNode;
