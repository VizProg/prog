import { ChangeEvent, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useEffect, useMemo, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import * as ts from "typescript";
import { styled } from '@/stitches.config';

const CodeContainer = styled('div', {
  display: 'flex',
  border: '1px solid $fgBorder',
  flexDirection: 'column',
});

const OutputContainer = styled("pre", {
  backgroundColor: '$mauve3',
  minHeight: '48px',
  padding:' $2',
  fontSize:'$2'
})


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [javascript({
  typescript: true,
  jsx: false
})];

export function CodeNode({ data }: {
  data: {
    code: string
  }
}) {


  const editor = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState(data.code);


  const onChange = useCallback((value: string, viewUpdate: any) => {
    setCode(value)
  }, []);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    theme: 'dark',
    minWidth: "320px",
    maxWidth: "320px",
    onChange: onChange
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor, setContainer]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <CodeContainer>
        <div ref={editor}>
        </div>
        <button onClick={() => {
          const transpiledCode = ts.transpile(code);
          const result = eval(transpiledCode);
          const outputEl = document.getElementById("output");
          if (outputEl) { outputEl.innerHTML = JSON.stringify(result, null, 2) }
          console.log(result)
        }}> Run</button>
        <OutputContainer id={"output"}></OutputContainer>
      </CodeContainer>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}