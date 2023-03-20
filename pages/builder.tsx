import { styled } from '@/stitches.config'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"
import { CustomNode } from '@/components/customNode'
import { CodeNode } from '@/components/CodeNode'
import { atom, useAtom, useAtomValue } from "jotai";
import GridLayout from "react-grid-layout";
import { SidePanel } from '@/components/Sidepanel'




const Main = styled("main", {
    minHeight: "100vh",
    minWidth: "100vw",
    display: 'flex',
    height: '100%'
})

const StyledGridLayout = styled(GridLayout, {
    background: '$mauve5',

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


export const CodeResultAtom = atom<{
    id: string,
    result: string
}[]>([]);


export default function Home() {

    const [selected, setSelected] = useState("")
    const [apiData, setAPIData] = useState<Row[]>([])

    const nodeTypes = useMemo(() => ({ customNode: CustomNode, codeNode: CodeNode }), []);
    const codeResultAtom = useAtomValue(CodeResultAtom)

    const layout = [
        { i: "a", x: 0, y: 0, w: 0.01, h: 4 },
        { i: "b", x: 1, y: 0, w: 3, h: 5 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];

    return (
        <Main>


            <StyledGridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1280}
                verticalCompact={false}

            >
                <GridItem key="a">

                </GridItem>
                <GridItem key="b">
                    <ReadTable data={apiData} selected={false} onClick={() => { setSelected("read_table") }} />
                </GridItem>

                <GridItem key="c">c</GridItem>
            </StyledGridLayout>

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


                </SidePanel>
            }
        </Main >
    )
}
