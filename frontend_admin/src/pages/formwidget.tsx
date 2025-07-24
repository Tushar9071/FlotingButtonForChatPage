"use client";

import { Handle, Position, type NodeProps } from "reactflow";

const FormWidget = ({ data, id }: NodeProps) => {
  const formData = data?.formData || {
    optionA: false,
    valueA: "",
    optionB: false,
    valueB: "",
  };

  const handleChange = (key: string, value: any) => {
    const newForm = { ...formData, [key]: value };
    data?.onFormChange?.(newForm);
  };

  return (
    <div className="w-72 rounded-xl border border-gray-300 bg-white shadow-lg p-4 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 rounded-full"
      />

      {/* <input
        type="text"
        value={data?.title || "Label"}
        onChange={(e) => data?.onChange?.(e.target.value)}
        className="w-full text-center text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none"
      /> */}
      <p className="w-full text-center text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none">
        Form Widget
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Enable Option A</label>
          <input
            type="checkbox"
            className="accent-blue-600 w-4 h-4"
            checked={formData.optionA}
            onChange={(e) => handleChange("optionA", e.target.checked)}
          />
        </div>
        <input
          type="text"
          placeholder="Enter value A"
          value={formData.valueA}
          onChange={(e) => handleChange("valueA", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Enable Option B</label>
          <input
            type="checkbox"
            className="accent-blue-600 w-4 h-4"
            checked={formData.optionB}
            onChange={(e) => handleChange("optionB", e.target.checked)}
          />
        </div>
        <input
          type="text"
          placeholder="Enter value B"
          value={formData.valueB}
          onChange={(e) => handleChange("valueB", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={() => data?.onSubmit?.(id)}
        className="mt-2 bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default FormWidget;
