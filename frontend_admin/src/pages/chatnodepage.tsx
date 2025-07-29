import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import type { Node, Edge, Connection, NodeTypes } from "reactflow";
import "reactflow/dist/style.css";
import { toast, Toaster } from "react-hot-toast";
import {
  TriggerNode,
  PreviewNode,
  SuccessNode,
  CancelNode,
  PriveNode,
} from "../components/ReactFlowNodes";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  preview: PreviewNode,
  success: SuccessNode,
  cancel: CancelNode,
  prive: PriveNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeSidebar = [
  { type: "trigger", label: "Trigger Node" },
  { type: "preview", label: "Preview Node" },
  { type: "success", label: "Success Node" },
  { type: "cancel", label: "Cancel Node" },
  { type: "prive", label: "Prive Node" },
];

const getId = (() => {
  let id = 0;
  return () => `${++id}`;
})();

const ChatNodePage = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [messageMap, setMessageMap] = useState<Record<string, string>>({});
  const [highlightNode, setHighlightNode] = useState<string | null>(null);

  const isConnected = useCallback(
    (sourceId: string, targetId: string) => {
      return edges.some((e) => e.source === sourceId && e.target === targetId);
    },
    [edges]
  );

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

        return node;
      })
    );
  }, [messageMap, setNodes, edges, highlightNode]);

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
            width: 180,
            background: "#f3f4f6",
            padding: 16,
            borderRight: "1px solid #ddd",
          }}
        >
          <div className="font-bold mb-4">Nodes</div>
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
              <MiniMap />
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
