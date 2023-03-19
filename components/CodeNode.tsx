import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { styled } from '@/stitches.config';
import { EditorView } from "@codemirror/view";
import { atom, useAtom, useSetAtom } from 'jotai';
import { CodeResultAtom } from '@/pages';

const CodeContainer = styled('div', {
  display: 'flex',
  border: '1px solid $fgBorder',
  flexDirection: 'column',
  minWidth: "320px",
  maxWidth: "320px",
});

const OutputContainer = styled("pre", {
  backgroundColor: '$mauve3',
  minHeight: '48px',
  maxHeight: '120px',
  overflow: 'auto',
  padding: ' $2',
  fontSize: '$2',
  width: '100%',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
})


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [javascript({
  typescript: true,
  jsx: false,
})];

export function CodeNode({ data }: {
  data: {
    id: string,
    code: string
  }
}) {

  const [code, setCode] = useState(data.code);

  const [codeResultAtom, setCodeResultAtom] = useAtom(CodeResultAtom)

  const f = useMemo(() => {
    try {
      return new Function('code', `${code};`);;
    } catch (e) {
      return [e];
    }
  }, [code]);


  const onChange = useCallback((value: string, viewUpdate: any) => {
    setCode(value)
  }, []);



  return (
    <>
      <Handle type="target" position={Position.Left} />
      <CodeContainer >
        <CodeMirror
          value={code}
          height="200px"
          width="320px"
          theme={'dark'}
          extensions={[javascript({ jsx: false, typescript: true }), EditorView.lineWrapping]}
          onChange={onChange}
        />
        <button onClick={async () => {
          try {
            const result = typeof f === "function" ? await f({ code }) : null;

            const outputEl = document.getElementById("output");
            if (outputEl) { outputEl.innerHTML = JSON.stringify(result, null, 2) }
            setCodeResultAtom(
              [...codeResultAtom, { id: data.id, result: JSON.stringify(result, null, 2) }]
            )
          } catch (e) {
            const outputEl = document.getElementById("output");
            console.error(e)
            if (outputEl) { outputEl.innerHTML = "Unable to run the code. Make sure your code is correct." }
          }
        }}> Run</button>
        <OutputContainer id={"output"}></OutputContainer>
      </CodeContainer>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}