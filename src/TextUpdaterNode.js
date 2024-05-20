import { Handle, Position } from 'reactflow';
 
function TextUpdaterNode({ data }) {
  //creating node type
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} />
      <div>
        <p className='title'>Send message</p>
        <p className="value">{data.value}</p>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
}

export default TextUpdaterNode;