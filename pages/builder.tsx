import { styled } from '@/stitches.config'
import { useCallback, useMemo, useState } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import { CustomNode } from '@/components/customNode'
import { CodeNode } from '@/components/CodeNode'
import GridLayout, { Layout } from "react-grid-layout";
import { SidePanel } from '@/components/Sidepanel'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import { PinRightIcon, PinLeftIcon, FilePlusIcon } from '@radix-ui/react-icons'
import { GridItem } from '@/components/GridItem'
import { atom, useAtom, useAtomValue } from "jotai";

const Main = styled("main", {
  minHeight: "100vh",
  minWidth: "100vw",
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const StyledGridLayout = styled(GridLayout, {

})

const Button = styled('button', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  border: 'none',
  background: 'transparent',
  color: '$textPrimary',
  padding: '$2',
  borderRadius: '6px',
  width: "fit-content",
  "&:disabled": {
    opacity: .5,
  },

  variants: {
    stretch: {
      true: {
        width: '100%'
      },
      false: {
        width: "fit-content"
      }
    },
    variant: {
      "ghost": {
        "&:hover:not([disabled])": {
          background: '$fg',
        },
      },
      "outline": {
        border: '1px solid $separator',
        background: "linear-gradient($mauve1,$mauve2)",
        "&:hover:not([disabled])": {
          background: '$fg',
        },
      },
      "primary": {
        background: "linear-gradient($mauve4, $mauve5)",
        border: '1px solid $separator',
        "&:hover:not([disabled])": {
          background: '$mauve5',
        },
      }
    }
  }

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
})


const ComponentCard = styled('div', {
  display: 'flex',
  border: '1px solid $fgBorder',
  height: '96px',
  width: '96px',
  borderRadius: '8px',
  alignItems: 'center',
  justifyContent: 'center'
})

const Header = styled('div', {
  height: "48px",
  width: '100%',
  borderBottom: '1px solid $fgBorder',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px'
})


export const DataAtom = atom<{
  id: string,
  name: string,
  code: string,
  result: Row[]
}[]>([]);

export default function Home() {

  const [selected, setSelected] = useState("")
  const [apiData, setAPIData] = useState<Row[]>([])
  const [apiUrl, setAPIUrl] = useState("https://api.github.com/users/daviddkkim/events")
  const [rightExpanded, setRightExpanded] = useState(true);
  const [leftExpanded, setLeftExpanded] = useState(true);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode, codeNode: CodeNode }), []);
  const [draggedItem, setDraggedItem] = useState<"table" | "text" | "button" | "input" | null>(null)
  const [code, setCode] = useState("return fetch('https://api.github.com/users/daviddkkim/events').then(res => res.json())")
  const [result, setResult] = useState<Row[]>()

  const [gridItems, setGridItems] = useState([
    <GridItem key="b" onClick={() => { setSelected("table") }} type={"table"}>
      <ReadTable data={result ? result.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
    </GridItem>,
    <GridItem key="c" onClick={() => { setSelected("text") }} type={"text"}>c</GridItem>,
  ])

  const [layout, setLayout] = useState<Layout[]>([
    { i: "b", x: 1, y: 0, w: 4, h: 5, minW: 1, maxW: 12 },
    { i: "c", x: 4, y: 0, w: 1, h: 2, minW: 1, maxW: 12 }
  ])

  const [dataAtom, setDataAtom] = useAtom(DataAtom)


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
      "i": draggedItem + layoutItem.x,
      "x": layoutItem.x,
      "y": layoutItem.y,
      "w": draggedItem === "table" ? 3 : 2,
      "h": draggedItem === "table" ? 5 : 2
    }];
    setLayout(newLayout)
    if (draggedItem === "table") {
      const newGridItems = [...gridItems,
      <GridItem key={draggedItem + layoutItem.x} onClick={() => { setSelected("table") }} type={"table"}>
        <ReadTable data={result ? result.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
      </GridItem>,]
      setGridItems(newGridItems)
    }
    if (draggedItem === "text") {
      const newGridItems = [...gridItems,
      <GridItem key={draggedItem + layoutItem.x} onClick={() => { setSelected("text") }} type={"text"}>
        Text
      </GridItem>]
      setGridItems(newGridItems)
    }
  };

  return (
    <Main>
      <Header>
        <Button onClick={() => { setLeftExpanded(!leftExpanded) }}>
          <PinLeftIcon />
        </Button>
        <Button onClick={() => { setRightExpanded(!rightExpanded) }}>
          <PinRightIcon />
        </Button>
      </Header>
      <Box>
        <SidePanel expanded={leftExpanded} side={"left"} nested={
          <Box css={{
            flexDirection: 'column',
            gap: ' $4'
          }}>
            <>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                Data name
                <input type="text" placeholder='Name this data' />
              </label>
            </>
            <CodeContainer >
              <CodeMirror
                value={code}
                height="200px"
                width="365px"
                theme={'dark'}
                extensions={[javascript({ jsx: false, typescript: true }), EditorView.lineWrapping]}
                onChange={onChange}
              />
              <button onClick={async () => {
                try {
                  const result = typeof f === "function" ? await f({ code }) : null;
                  setResult(result);
                  const outputEl = document.getElementById("output");
                  if (outputEl) { outputEl.innerHTML = JSON.stringify(result, null, 2) }
                } catch (e) {
                  const outputEl = document.getElementById("output");
                  console.error(e)
                  if (outputEl) { outputEl.innerHTML = "Unable to run the code. Make sure your code is correct." }
                }
              }}> Run</button>
              <OutputContainer id={"output"}></OutputContainer>
            </CodeContainer>
            <Button variant={"primary"} disabled={result ? false : true}
              onClick={() => {
                setDataAtom([
                  ...dataAtom,
                  {
                    id: "name",
                    name: 'data1',
                    code: code,
                    result: result ?? []
                  }
                ])
              }}>
              Save
            </Button>
          </Box>
        }>
          Data
          <Button variant={"outline"} stretch>
            <FilePlusIcon /> Add data
          </Button>
          {dataAtom &&
            <Box css={{
              gap: '$2',
              flexDirection: 'column'
            }}>
              {dataAtom.map((data) => {
                return (
                  <Button variant={"ghost"} stretch> {data.name}</Button>
                )
              })}
            </Box>}
        </SidePanel>
        <div style={{ width: '100%', height: "100%", padding: '16px' }} >
          <StyledGridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1000}
            verticalCompact={false}
            isDroppable={true}
            onDrop={onDrop}
          >
            {gridItems.map((item) => {
              return item;
            })}

          </StyledGridLayout>
        </div>

        <SidePanel expanded={rightExpanded} side={"right"}>
          {!selected &&
            <>
              <div>Components</div>

              <Box css={{
                width: '100%',
                flexWrap: 'wrap',
                gap: '$4'
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
              <div onClick={() => { setSelected("") }}>Components / {selected} </div>

              <div>
                <label htmlFor={"data"}>Data</label>
                <CodeBlock id={"data"} draggable={true} onDrag={(e) => {
                  console.log(e)
                  console.log("here")
                }}>
                  {JSON.stringify(apiData, null, 2)}
                </CodeBlock>
              </div>



            </>
          }

        </SidePanel>
      </Box>
    </Main >
  )
}
