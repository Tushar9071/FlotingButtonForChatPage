import { memo } from "react"
import { Handle, Position } from "reactflow"

const OutputWidget = ({ data }: any) => {
  const { valueA, valueB, optionA, optionB } = data?.formData || {}

  return (
    <div className="w-64 rounded-xl border border-gray-300 bg-gray-50 shadow p-4 relative">
      {/* Add a target handle for input connections */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500 rounded-full" />
      <h3 className="text-lg font-bold text-gray-800">Output</h3>
      <div className="mt-2 text-sm text-gray-700 space-y-2">
        <div>
          <strong>Option A:</strong> {optionA ? "Enabled" : "Disabled"}
        </div>
        <div>
          <strong>Value A:</strong> {valueA || "N/A"}
        </div>
        <div>
          <strong>Option B:</strong> {optionB ? "Enabled" : "Disabled"}
        </div>
        <div>
          <strong>Value B:</strong> {valueB || "N/A"}
        </div>
      </div>
    </div>
  )
}

export default memo(OutputWidget)
