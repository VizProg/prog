import { styled } from '@/stitches.config'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from 'reactflow'
import 'reactflow/dist/style.css';
import { CustomNode } from '@/components/customNode'
import { CodeNode } from '@/components/CodeNode'
import { atom, useAtom, useAtomValue } from "jotai";



const Main = styled("main", {
  minHeight: "100vh",
  minWidth: "100vw",
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%'
})

const Button = styled("button", {

})

const CodeBlock = styled("pre", {
  backgroundColor: '$mauve2',
  color: '$TextPrimary',
  padding: '$2',
  borderRadius: '$2',
  border: '1px solid $fgBorder',
  maxHeight: '320px',
  overflow: 'auto',
})

const proOptions = { hideAttribution: true };


export const CodeResultAtom = atom<{
  id: string,
  result: string
}[]>([]);


export default function Home() {

  const [selected, setSelected] = useState("")
  const [apiData, setAPIData] = useState<Row[]>([])

  const nodeTypes = useMemo(() => ({ customNode: CustomNode, codeNode: CodeNode }), []);
  const codeResultAtom = useAtomValue(CodeResultAtom)
  console.log(codeResultAtom)
  const initialNodes: Node[] = useMemo(() => {
    return [
      { id: '1', data: { code: `return fetch("https://api.github.com/users/daviddkkim/events").then((res)=>res.json())`, id: '1' }, position: { x: 0, y: 0 }, type: 'codeNode' },

      { id: '2', data: <ReadTable data={codeResultAtom[0] ? JSON.parse(codeResultAtom[0].result).slice(0, 5) as Row[] : []} selected={selected === "read_table" ? true : false} onClick={() => { setSelected("read_table") }} />, position: { x: 500, y: 0 }, type: 'customNode' },

    ];
  }, [selected, codeResultAtom])

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge<any> | Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <Main>

      <div style={{ display: 'flex', width: '100%', maxHeight: '100vh', overflow: 'auto', flexDirection: 'column', gap: '100px' }}>
        { /* <EditableTable data={data} setData={(data: Row[]) => setData(data)} selected={selected === "editable_table" ? true : false} onClick={() => { setSelected("editable_table") }} /> */}
        {/* <ReadTable data={apiData} selected={selected === "read_table" ? true : false} onClick={() => { setSelected("read_table") }} /> */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={proOptions}
        />
      </div>
      {/*       <SidePanel>

        <h2>{selected} </h2>

        <div>
          <label htmlFor={"data"}>Data</label>
          <CodeBlock id={"data"} draggable={true} onDrag={(e) => {
            console.log(e)
            console.log("here")
          }}>
            {JSON.stringify(apiData, null, 2)}
          </CodeBlock>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          fetch((apiUrl)).then(async (response) => {
            const json = await response.json();
            setAPIData(json)
          })
        }}>
          <input type="text" placeholder='https://api.github.com/users/${githubUser}/events' value={apiUrl} onChange={(event) => {
            setUrl(event.currentTarget.value)
          }} />
          <Button type={"submit"}> Run </Button>
        </form>
      </SidePanel> */}


    </Main >
  )
}
