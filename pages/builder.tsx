import { styled } from '@/stitches.config'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import GridLayout, { Layout } from "react-grid-layout";
import { SidePanel } from '@/components/Sidepanel'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import { PinRightIcon, PinLeftIcon, FilePlusIcon, Cross1Icon } from '@radix-ui/react-icons'
import { GridItem } from '@/components/GridItem'
import { atom, useAtom, useAtomValue } from "jotai";
import { Button } from '@/components/Button'

const Main = styled("main", {
  minHeight: "100vh",
  minWidth: "100vw",
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const StyledGridLayout = styled(GridLayout, {

})


const CodeBlock = styled("pre", {
  backgroundColor: '$mauve2',
  color: '$TextPrimary',
  padding: '$2',
  borderRadius: '$2',
  border: '1px solid $fgBorder',
  maxHeight: '320px',
  overflow: 'auto',
  width: '100%',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
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
  const [rightExpanded, setRightExpanded] = useState(true);
  const [leftExpanded, setLeftExpanded] = useState(true);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<"table" | "text" | "button" | "input" | null>(null)
  const [code, setCode] = useState("return fetch('https://api.github.com/users/daviddkkim/events').then(res => res.json())")
  const [dataResult, setDataResult] = useState<Row[] | null>(null)
  const [dataAtom, setDataAtom] = useAtom(DataAtom)

  const [gridItems, setGridItems] = useState([
    <GridItem key="b" onClick={() => { setSelected("table") }} type={"table"}>
      <ReadTable data={dataResult? dataResult.slice(0, 5) : [{hi:'try saving new data'}]} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
    </GridItem>,
    <GridItem key="c" onClick={() => { setSelected("text") }} type={"text"}>c</GridItem>,
  ])

  const [layout, setLayout] = useState<Layout[]>([
    { i: "b", x: 1, y: 0, w: 4, h: 5, minW: 1, maxW: 12 },
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
        <ReadTable data={dataResult ? dataResult.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
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


  const newData = useMemo(() => (
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
            const returnedVal = typeof f === "function" ? await f({ code }) : null;
            setDataResult(returnedVal);

          /*   const outputEl = document.getElementById("output");
            if (outputEl) { outputEl.innerHTML = JSON.stringify(returnedVal, null, 2) } */
          } catch (e) {
            const outputEl = document.getElementById("output");
            console.error(e)
            if (outputEl) { outputEl.innerHTML = "Unable to run the code. Make sure your code is correct." }
          }
        }}> Run</button>
        <OutputContainer id={"output"}>
        {JSON.stringify(dataResult,null, 2)}
        </OutputContainer>
      </CodeContainer>
      <Button
        variant={"primary"}
        disabled={dataResult ? false : true}
        onClick={() => {
          setDataAtom([
            ...dataAtom,
            {
              id: "name",
              name: 'data1',
              code: code,
              result: dataResult ? dataResult : []
            }
          ])
        }}>
        Save
      </Button>
      <Button
        variant={"ghost"}
        css={{
          position: 'absolute',
          right: 8,
          top: 8
        }} onClick={() => { setNestedOpen(false) }}> <Cross1Icon /> </Button>
    </Box>
  ), [code, onChange, dataResult, f, setDataAtom, dataAtom]);

//set nested and table are inside of a state thats why it's not updating"

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
        <SidePanel expanded={leftExpanded} side={"left"} nestedOpen={nestedOpen} nested={newData}>
          Data
          <Button variant={"outline"} stretch onClick={() => {
            setNestedOpen(true);
//            setNestedView(newData)
          }}>
            <FilePlusIcon /> Add data
          </Button>
          {dataAtom &&
            <Box css={{
              gap: '$2',
              flexDirection: 'column'
            }}>
              {dataAtom.map((data) => {
                return (
                  <Button key={data.id} variant={"ghost"} stretch onClick={() => {
                   /*  setNestedView(
                      <Box css={{
                        flexDirection:'column',
                        gap: '$4'
                      }}>
                        <CodeBlock>
                          {data.code}
                        </CodeBlock>
                        <OutputContainer>
                          {JSON.stringify(data.result, null, 2)}
                        </OutputContainer>
                      </Box>
                    ) */
                  }}> {data.name}</Button>
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
                  {JSON.stringify(dataResult, null, 2)}
                </CodeBlock>
              </div>



            </>
          }

        </SidePanel>
      </Box >
    </Main >
  )
}
