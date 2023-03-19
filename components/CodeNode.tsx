import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useEffect, useMemo, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const code = "console.log('hello world!');\n\n\n";
// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [javascript()];

export function CodeNode({ data }: {
    data: any
}) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  const editor = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: data.code,
    theme: 'dark',
    minWidth: "400px",
    minHeight: "400px"
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor, setContainer]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div ref={editor}>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}