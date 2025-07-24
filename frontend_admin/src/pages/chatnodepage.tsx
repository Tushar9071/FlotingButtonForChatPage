import type React from "react"

import { ReactFlowProvider } from "reactflow"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { Background, Controls, useEdgesState, useNodesState, addEdge } from "reactflow"
import toast, { Toaster } from "react-hot-toast"

import type { Connection, Node, OnSelectionChangeParams } from "reactflow"
import "reactflow/dist/style.css"
import FormWidget from "./formwidget"
import OutputWidget from "./outputwidget"

// Custom Node Types
const nodeTypes = {
  custom: FormWidget,
  output: OutputWidget,
}

let id = 0
const getId = () => `${id++}`

const ChatNodePage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedEdges, setSelectedEdges] = useState<string[]>([])
  const [selectedNodes, setSelectedNodes] = useState<string[]>([])
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const edgesRef = useRef(edges)

  // Keep edgesRef.current updated with the latest edges state
  useEffect(() => {
    edgesRef.current = edges
  }, [edges])

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()
    if (!reactFlowInstance) return

    const type = event.dataTransfer.getData("application/reactflow")
    if (!type) return

    if (type === "custom" && nodes.some((n) => n.type === "custom")) {
      toast.dismiss("form-widget-error");
      toast.error("Only one form widget is allowed.", { id: "form-widget-error" });
      return;
    }

    if (type === "output" && nodes.some((n) => n.type === "output")) {
      toast.dismiss("output-widget-error");
      toast.error("Only one output widget is allowed.", { id: "output-widget-error" });
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - (reactFlowWrapper.current as any).getBoundingClientRect().left,
      y: event.clientY - (reactFlowWrapper.current as any).getBoundingClientRect().top,
    })

    const newId = getId()

    const newNode: Node = {
      id: newId,
      type,
      position,
      data: {
        title: `Node ${newId}`,
        formData: {
          optionA: false,
          valueA: "",
          optionB: false,
          valueB: "",
        },
        onChange: (val: string) =>
          setNodes((nds) => nds.map((n) => (n.id === newId ? { ...n, data: { ...n.data, title: val } } : n))),
        onFormChange: (formData: any) =>
          setNodes((nds) => nds.map((n) => (n.id === newId ? { ...n, data: { ...n.data, formData } } : n))),
        onSubmit: (nodeId: string) => {
          setNodes((nds) => {
            const formNode = nds.find((n) => n.id === nodeId)
            if (!formNode) return nds

            // Use edgesRef.current for latest edges
            const connectedEdge = edgesRef.current.find(
              (e) =>
                (e.source === nodeId && nds.find((n) => n.id === e.target)?.type === "output") ||
                (e.target === nodeId && nds.find((n) => n.id === e.source)?.type === "output"),
            )
            if (!connectedEdge) {
              toast.dismiss("connect-error");
              toast.error("Please connect the form to an output widget before submitting.", { id: "connect-error" });
              return nds;
            }

            const outputNodeId = connectedEdge.source === nodeId ? connectedEdge.target : connectedEdge.source

            const outputNode = nds.find((n) => n.id === outputNodeId)
            if (!outputNode || outputNode.type !== "output") {
              toast.error("Connected node is not an output widget.");
              return nds;
            }

            // Update output node with form data
            const newFormData = formNode.data?.formData
            return nds.map((n) => (n.id === outputNodeId ? { ...n, data: { ...n.data, formData: newFormData } } : n))
          })
        },
      },
    }

    setNodes((nds) => nds.concat(newNode))
  }

  const handleDeleteKey = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        (activeElement as HTMLElement)?.isContentEditable

      if (isInputFocused) return

      if (event.key === "Delete" || event.key === "Backspace") {
        setEdges((eds) => eds.filter((e) => !selectedEdges.includes(e.id)))
        setNodes((nds) => nds.filter((n) => !selectedNodes.includes(n.id)))
        setSelectedEdges([])
        setSelectedNodes([])
      }
    },
    [selectedEdges, selectedNodes],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleDeleteKey)
    return () => window.removeEventListener("keydown", handleDeleteKey)
  }, [handleDeleteKey])

  const handleSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const edgeIds = params.edges?.map((e) => e.id) || []
    const nodeIds = params.nodes?.map((n) => n.id) || []
    setSelectedEdges(edgeIds)
    setSelectedNodes(nodeIds)
  }, [])

  return (
    <ReactFlowProvider>
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-gray-100 border-r p-4 space-y-6 overflow-y-auto md:shrink-0">
          <h2 className="text-lg font-semibold text-center">Nodes</h2>

          {/* Draggable Form Widget */}
          {/* <div
            className="cursor-move"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("application/reactflow", "custom")
              event.dataTransfer.effectAllowed = "move"
            }}
          >
            <div className="pointer-events-none opacity-80 scale-95">
              <div className="w-full rounded-xl border border-gray-300 bg-white shadow-lg p-4 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl relative">
                <input
                  type="text"
                  className="w-full text-center text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Enable Option A</label>
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter value A"
                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Enable Option B</label>
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter value B"
                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button className="mt-2 bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition">
                  Submit
                </button>
              </div>
            </div>
          </div> */}

          {/* Draggable Output Widget */}
          <div
            className="cursor-move"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("application/reactflow", "custom")
              event.dataTransfer.effectAllowed = "move"
            }}
          >
            <div className="pointer-events-none opacity-80 scale-95">
              <div className="w-full rounded-xl border border-gray-300 bg-white shadow p-4 text-sm">
                <strong>Trigger Widget</strong>
                <p className="text-gray-500">Triggers a flow</p>
              </div>
            </div>
          </div>
          <div
            className="cursor-move"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("application/reactflow", "output")
              event.dataTransfer.effectAllowed = "move"
            }}
          >
            <div className="pointer-events-none opacity-80 scale-95">
              <div className="w-full rounded-xl border border-gray-300 bg-white shadow p-4 text-sm">
                <strong>Output Widget</strong>
                <p className="text-gray-500">Shows submitted values</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Area */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={handleSelectionChange}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default ChatNodePage
