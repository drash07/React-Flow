import { useCallback } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNode';
import './TextUpdaterNode.css';
import './Flow.css';

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow({onNodeClick, nodes, setNodes, edges, setEdges, selectedNodeId}) {
    const { project } = useReactFlow();

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection}, eds)),
        [setEdges]
    );
    //drag and drop from node panel to create a new node
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = project({ x: 0, y: 0 });
        const type = event.dataTransfer.getData('application/reactflow');
        const position = project({
            x: event.clientX - reactFlowBounds.x,
            y: event.clientY - reactFlowBounds.y,
        });

        const newNode = {
            id: `node-${nodes.length + 1}`,
            type,
            position,
            data: { value: `Text message ${nodes.length + 1}` },
        };

        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div style={{ height: '100vh' }} onDragOver={onDragOver} onDrop={onDrop}>
            <ReactFlow
                nodes={nodes.map((node) => ({
                    ...node,
                    className: node.id === selectedNodeId ? 'selected' : '',
                  }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                fitView
            />
        </div>
    );
}

export default Flow;
