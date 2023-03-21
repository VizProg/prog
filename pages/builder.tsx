import { styled } from '@/stitches.config'
import { useCallback, useMemo, useState } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import { CustomNode } from '@/components/customNode'
import { CodeNode } from '@/components/CodeNode'
import GridLayout from "react-grid-layout";
import { SidePanel } from '@/components/Sidepanel'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";



const Main = styled("main", {
  minHeight: "100vh",
  minWidth: "100vw",
  display: 'flex',
  height: '100%'
})

const StyledGridLayout = styled(GridLayout, {

})

const GridItem = styled("div", {
  background: '$mauve3',
  padding: '$2',
  border: '1px solid $fgBorder',
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

const Box = styled('div', {
  display: 'flex',
  gap: '$4'
})


const ComponentCard = styled('div', {
  display: 'flex',
  border: '1px solid $fgBorder',
  height: '96px',
  width: '96px'
})




export default function Home() {

  const [selected, setSelected] = useState("")
  const [apiData, setAPIData] = useState<Row[]>([])
  const [apiUrl, setAPIUrl] = useState("https://api.github.com/users/daviddkkim/events")
  const [output, setOutput] = useState<Row[]>()
  const nodeTypes = useMemo(() => ({ customNode: CustomNode, codeNode: CodeNode }), []);
  const [draggedItem, setDraggedItem] = useState<"table" | "text" | "button" | "input" | null>(null)
  const [code, setCode] = useState("return fetch('https://api.github.com/users/daviddkkim/events').then(res => res.json())")
  const [gridItems, setGridItems] = useState([
    <GridItem key="a" onClick={() => { setSelected("a") }}>

    </GridItem>,
    <GridItem key="b" onClick={() => { setSelected("table") }}>
      <ReadTable data={output ? output.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
    </GridItem>,

    <GridItem key="c" onClick={() => { setSelected("c") }}>c</GridItem>,

  ])

  const [layout, setLayout] = useState<{
    i: string,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    minW?: Number,
    maxW?: Number
  }[]>([
    { i: "a", x: 0, y: 0, w: 0.01, h: 4, minW: 1, maxW: 12 },
    { i: "b", x: 1, y: 0, w: 3, h: 5, minW: 1, maxW: 12 },
    { i: "c", x: 4, y: 0, w: 1, h: 2, minW: 1, maxW: 12 }
  ])

  const onChange = useCallback((value: string, viewUpdate: any) => {
    setCode(value)
  }, []);

  const f = useMemo(() => {
    try {
      return new Function('code', `${code};`);;
    } catch (e) {
      return [e];
    }
  }, [code]);

  const onDrop = (layout: GridLayout.Layout[], layoutItem: any, _event: Event) => {
    const newLayout = [...layout,
    {
      "i": draggedItem,
      "x": layoutItem.x,
      "y": layoutItem.y,
      "w": layoutItem.w,
      "h": layoutItem.h
    }];
    setLayout(newLayout)
    if (draggedItem === "table") {
      const newGridItems = [...gridItems,
      <GridItem key={draggedItem} onClick={() => { setSelected("table") }}>
        <ReadTable data={output ? output.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
      </GridItem>,]
      setGridItems(newGridItems)
    }
  };

  return (
    <Main>

      <div style={{ width: '100%', height: "100%" }} >
        <StyledGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1280}
          verticalCompact={false}
          isDroppable={true}
          onDrop={onDrop}
        >
          {gridItems.map((item) => {
            return item;
          })}

        </StyledGridLayout>
      </div>

      <SidePanel>
        {!selected &&
          <>
            <h2>Components</h2>

            <Box css={{
              width: '100%',
              flexWrap: 'wrap',
            }}>
              <ComponentCard draggable className='droppable-element' unselectable="on" onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "")
                setDraggedItem("table")
              }}
              >
                Table
              </ComponentCard>
              <ComponentCard draggable className='droppable-element' unselectable="on" onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "")
                setDraggedItem("text")
              }}
              >
                Text
              </ComponentCard>
              <ComponentCard draggable className='droppable-element' unselectable="on" onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "")
                setDraggedItem("input")
              }}
              >
                Input
              </ComponentCard>
              <ComponentCard draggable className='droppable-element' unselectable="on" onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "")
                setDraggedItem("button")
              }}
              >
                Button
              </ComponentCard>
            </Box>
          </>}
        {selected &&
          <>
            <h2 onClick={() => { setSelected("") }}>Components / {selected} </h2>

            <div>
              <label htmlFor={"data"}>Data</label>
              <CodeBlock id={"data"} draggable={true} onDrag={(e) => {
                console.log(e)
                console.log("here")
              }}>
                {JSON.stringify(apiData, null, 2)}
              </CodeBlock>
            </div>


            <CodeContainer >
              <CodeMirror
                value={code}
                height="200px"
                width="386px"
                theme={'dark'}
                extensions={[javascript({ jsx: false, typescript: true }), EditorView.lineWrapping]}
                onChange={onChange}
              />
              <button onClick={async () => {
                try {
                  const result = typeof f === "function" ? await f({ code }) : null;

                  const outputEl = document.getElementById("output");
                  if (outputEl) { outputEl.innerHTML = JSON.stringify(result, null, 2) }
                  setOutput(result)
                } catch (e) {
                  const outputEl = document.getElementById("output");
                  console.error(e)
                  if (outputEl) { outputEl.innerHTML = "Unable to run the code. Make sure your code is correct." }
                }
              }}> Run</button>
              <OutputContainer id={"output"}></OutputContainer>
            </CodeContainer>
          </>
        }
        {/*  <input type="text" placeholder='https://api.github.com/users/${githubUser}/events' value={apiUrl} onChange={(event) => {
                            setAPIUrl(event.currentTarget.value)
                        }} /> */}


      </SidePanel>

    </Main >
  )
}
