import './App.css';
import Flow from './Flow';
import { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNodeValue, setSelectedNodeValue] = useState(null);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  //on selecting a node
  const onNodeClick = (event, node) => {
    setShowSidebar(true);
    setSelectedNodeId(node.id);
    setSelectedNodeValue(node.data.value);
  };

  //on back button click, go to node panel
  const handleBackClick = () => {
    setShowSidebar(false);
    setSelectedNodeId(null);
    setSelectedNodeValue(null);
  };

  //on editing the data, update the node flow and the states
  const onUpdateNodeValue = (e) => {
    const newValue = e.target.value;

    setSelectedNodeValue(newValue);

    setNodes((nds) =>
      nds.map((node) => (node.id === selectedNodeId ? { ...node, data: { ...node.data, value: newValue } } : node))
    );
  };

  //check if all except one node has an empty target handle
  const saveChanges = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });
    if (nodesWithEmptyTargets.length > 1) {
      alert('Cannot save Flow');
    } else {
      alert('Flow saved successfully!');
    }
  }
    
  return (
    <ReactFlowProvider>
    <div>
      <nav>
        <button onClick={saveChanges}>Save Changes</button>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 flow-builder">
            <Flow 
            onNodeClick={onNodeClick} 
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            selectedNodeId={selectedNodeId}
            />
          </div>
          <div className="col-md-3">
              { showSidebar ? (
                <div className="settings-panel">
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-2'>
                      <button className="back" onClick={handleBackClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 12H6M12 5l-7 7 7 7" />
                        </svg> 
                      </button>
                    </div>
                    <div className='col-md-10'>
                      <p className="title">Message</p>
                    </div>
                  </div>
                </div>
                  <p className='subTitle'>Text</p>
                  <input 
                    type="text" 
                    value={selectedNodeValue} 
                    onChange={onUpdateNodeValue}
                  />
                </div>
                ) : (
                <div className='node-panel'>
                  <div
                    className="dndnode input"
                    onDragStart={(event) => onDragStart(event, 'textUpdater')}
                    draggable
                  >
                    Message
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
