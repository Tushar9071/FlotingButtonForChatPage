import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  // MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import type { Node, Edge, Connection, NodeTypes } from "reactflow";
import "reactflow/dist/style.css";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import {
  TriggerNode,
  PreviewNode,
  SuccessNode,
  CancelNode,
  PriveNode,
} from "../components/ReactFlowNodes";
import AnswerNode from "../components/ReactFlowNodes/AnswerNode";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  preview: PreviewNode,
  success: SuccessNode,
  cancel: CancelNode,
  prive: PriveNode,
  answer: AnswerNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeSidebar = [
  { type: "trigger", label: "Trigger Node" },
  { type: "preview", label: "Preview Node" },
  { type: "success", label: "Success Node" },
  { type: "cancel", label: "Cancel Node" },
  { type: "prive", label: "Prive Node" },
  { type: "answer", label: "Answer Node" },
];

const getId = (() => {
  let id = 0;
  return () => `${++id}`;
})();

const ChatNodePage = () => {
  const { id: flowId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [messageMap, setMessageMap] = useState<Record<string, string>>({});
  const [highlightNode, setHighlightNode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [flowDescription, setFlowDescription] = useState<string>("");
  const [answerMessageMap, setAnswerMessageMap] = useState<
    Record<string, string>
  >({});

  // Load flow data if we have a flowId
  useEffect(() => {
    if (flowId) {
      setLoading(true);
      fetch(`http://localhost:8000/api/flow/${flowId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load flow data");
          }
          return response.json();
        })
        .then((data) => {
          // Update nodes and edges with the loaded data
          if (data.nodes && data.edges) {
            setNodes(data.nodes);
            setEdges(data.edges);

            // Reconstruct the message map from nodes
            const newMessageMap: Record<string, string> = {};
            const newAnswerMessageMap: Record<string, string> = {};
            data.nodes.forEach((node: Node) => {
              if (node.type === "trigger" && node.data && node.data.message) {
                newMessageMap[node.id] = node.data.message;
              }
              if (node.type === "answer" && node.data && node.data.message) {
                newAnswerMessageMap[node.id] = node.data.message;
              }
            });
            setMessageMap(newMessageMap);
            setAnswerMessageMap(newAnswerMessageMap);

            // Set flow description if available
            if (data.description) {
              setFlowDescription(data.description);
            }

            toast.success("Flow loaded successfully");
          }
        })
        .catch((error) => {
          console.error("Error loading flow:", error);
          toast.error("Failed to load flow data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [flowId, setNodes, setEdges]);

  const onSaveFlow = () => {
    const flowData = {
      nodes,
      edges,
      description: flowDescription,
    };

    const url = flowId
      ? `http://localhost:8000/api/flow/${flowId}`
      : "http://localhost:8000/api/add/flow";

    const method = flowId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flowData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Flow saved successfully:", data);
        toast.success(
          `Flow saved with ${data.nodeCount} nodes and ${data.edgeCount} edges!`
        );

        // If this was a new flow, redirect to edit mode with the new ID
        if (!flowId && data.id) {
          navigate(`/chat-node/${data.id}`);
        }
      })
      .catch((error) => {
        console.error("Error saving flow:", error);
        toast.error("Failed to save flow.");
      });
  };

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "trigger") {
          return {
            ...node,
            data: {
              ...node.data,
              message: messageMap[node.id] || "",
              onChange: (msg: string) =>
                setMessageMap((m) => ({ ...m, [node.id]: msg })),
            },
          };
        }
        

        if (node.type === "preview") {
          const triggerEdge = edges.find(
            (e) =>
              e.target === node.id &&
              nds.find((n) => n.id === e.source && n.type === "trigger")
          );
          const triggerId = triggerEdge ? triggerEdge.source : undefined;
          return {
            ...node,
            data: {
              ...node.data,
              message: triggerId ? messageMap[triggerId] || "" : "",
              onSend: () => {},
              onCancel: () => {},
            },
          };
        }

        if (node.type === "success" || node.type === "cancel") {
          return {
            ...node,
            data: {
              ...node.data,
              highlight: highlightNode === node.id,
            },
          };
        }

        if (node.type === "prive") {
          const previewEdge = edges.find(
            (e) =>
              e.target === node.id &&
              nds.find((n) => n.id === e.source && n.type === "preview")
          );
          const previewId = previewEdge ? previewEdge.source : undefined;

          let message = "";
          if (previewId) {
            const triggerEdge = edges.find(
              (e) =>
                e.target === previewId &&
                nds.find((n) => n.id === e.source && n.type === "trigger")
            );
            const triggerId = triggerEdge ? triggerEdge.source : undefined;
            if (triggerId) message = messageMap[triggerId] || "";
          }

          const successEdge = edges.find(
            (e) =>
              e.source === node.id &&
              nds.find((n) => n.id === e.target && n.type === "success")
          );
          const cancelEdge = edges.find(
            (e) =>
              e.source === node.id &&
              nds.find((n) => n.id === e.target && n.type === "cancel")
          );
          const successId = successEdge ? successEdge.target : undefined;
          const cancelId = cancelEdge ? cancelEdge.target : undefined;

          return {
            ...node,
            data: {
              ...node.data,
              onSend: () => {
                if (successId) {
                  setHighlightNode(successId);
                  setTimeout(() => setHighlightNode(null), 1000);
                }
                toast.success(`Send Success! Message: ${message}`);
              },
              onCancel: () => {
                if (cancelId) {
                  setHighlightNode(cancelId);
                  setTimeout(() => setHighlightNode(null), 1000);
                }
                toast.error("Task Cancelled!");
              },
            },
          };
        }

        if (node.type === "answer") {
          return {
            ...node,
            data: {
              ...node.data,
              message: answerMessageMap[node.id] || "",
              onAnswerChange: (msg: string) =>
                setAnswerMessageMap((m) => ({ ...m, [node.id]: msg })),
            },
          };
        }

        return node;
      })
    );
  }, [messageMap, setNodes, edges, highlightNode, answerMessageMap]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowBounds) return;

      if (type === "trigger" && nodes.some((node) => node.type === "trigger")) {
        toast.error("Only one Trigger node is allowed.");
        return;
      }

      let x = event.clientX - reactFlowBounds.left;
      let y = event.clientY - reactFlowBounds.top;

      x = Math.max(40, Math.min(x, 600));
      y = Math.max(40, Math.min(y, 400));
      const position = { x, y };

      let data: any = {};
      if (type === "trigger") data = { message: "", onChange: () => {} };
      if (type === "preview")
        data = { message: "", onSend: () => {}, onCancel: () => {} };
      if (type === "prive") data = { onSend: () => {}, onCancel: () => {} };
      if (type === "answer") data = { message: "", onAnswerChange: () => {} };

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, nodes]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <>
      <Toaster position="top-center" />
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div
          style={{
            width: 220,
            background: "#f3f4f6",
            padding: 16,
            borderRight: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            height: "100vh", // make sidebar full height
          }}
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">Flow Editor</div>
              <button
                onClick={() => navigate("/flows")}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Back to List
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={flowDescription}
                onChange={(e) => setFlowDescription(e.target.value)}
                placeholder="Enter flow description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="font-bold mb-2 mt-4">Nodes</div>
            {nodeSidebar.map((node) => (
              <div
                key={node.type}
                onDragStart={(event) => onDragStart(event, node.type)}
                draggable
                style={{
                  padding: "8px 12px",
                  marginBottom: 8,
                  background: "#fff",
                  border: "1px solid #bbb",
                  borderRadius: 6,
                  cursor: "grab",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {node.label}
              </div>
            ))}
          </div>

          <div
            style={{ marginTop: "auto" }}
            className="text-sm text-gray-500 mb-2 w-full"
          >
            {loading ? (
              <div className="w-full py-2 bg-gray-300 text-center text-white font-bold">
                Loading...
              </div>
            ) : (
              <button
                className="w-full items-center text-xl bg-green-500 py-2 text-white font-bold hover:bg-green-600 transition-colors hover:cursor-pointer"
                onClick={onSaveFlow}
              >
                {flowId ? "Update" : "Save"}
              </button>
            )}
          </div>
        </div>

        <div ref={reactFlowWrapper} style={{ flex: 1, height: "100vh" }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              {/* <MiniMap /> */}
              <Controls />
              <Background />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default ChatNodePage;
