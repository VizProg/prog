import { styled } from '@/stitches.config'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import { CustomNode } from '@/components/customNode'
import { CodeNode } from '@/components/CodeNode'
import { atom, useAtom, useAtomValue } from "jotai";
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




export default function Home() {

    const [selected, setSelected] = useState("")
    const [apiData, setAPIData] = useState<Row[]>([])
    const [apiUrl, setAPIUrl] = useState("https://api.github.com/users/daviddkkim/events")
    const [output, setOutput] = useState<Row[]>()
    const nodeTypes = useMemo(() => ({ customNode: CustomNode, codeNode: CodeNode }), []);
    const [code, setCode] = useState("return fetch('https://api.github.com/users/daviddkkim/events').then(res => res.json())")
    const layout = [
        { i: "a", x: 0, y: 0, w: 0.01, h: 4, minW: 1, maxW: 12 },
        { i: "b", x: 1, y: 0, w: 3, h: 5, minW: 1, maxW: 12 },
        { i: "c", x: 4, y: 0, w: 1, h: 2, minW: 1, maxW: 12 }
    ];
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


    return (
        <Main>

            <div style={{ width: '100%', height: "100%" }}>
                <StyledGridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={30}
                    width={1280}
                    verticalCompact={false}

                >
                    <GridItem key="a" onClick={() => { setSelected("a") }}>

                    </GridItem>
                    <GridItem key="b" onClick={() => { setSelected("table") }}>
                        <ReadTable data={output ? output.slice(0, 5) : []} selected={selected === "table" ? true : false} onClick={() => { setSelected("read_table") }} />
                    </GridItem>

                    <GridItem key="c" onClick={() => { setSelected("c") }}>c</GridItem>
                </StyledGridLayout>
            </div>
            {selected &&
                <SidePanel>
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

                    {/*  <input type="text" placeholder='https://api.github.com/users/${githubUser}/events' value={apiUrl} onChange={(event) => {
                            setAPIUrl(event.currentTarget.value)
                        }} /> */}


                </SidePanel>
            }
        </Main >
    )
}
