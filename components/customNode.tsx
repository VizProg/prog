import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export function CustomNode({ data }: {
    data: any
}) {


  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        {data}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}