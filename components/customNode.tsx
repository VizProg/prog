import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export function CustomNode({ data }: {
    data: any
}) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

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