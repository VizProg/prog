import { styled } from '@/stitches.config'
import { useState } from 'react'
import { SidePanel } from '@/components/Sidepanel'
//import { EditableTable } from '@/components/editableTable'
import { ReadTable } from '@/components/readTable'
import type { Row } from "@/types"

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

export default function Home() {

  /* const [data, setData] = useState<Row[]>([{
      name: "Alfreds Futterkiste",
      location: "Germany",
      header3: ""
    }, {
      name: "david kim",
      location: "korea",
      header3: ""
      }]) */
      //detect drag effect  


  const [selected, setSelected] = useState("")
  const [apiUrl, setUrl] = useState("https://api.github.com/users/daviddkkim/events")
  const [apiData, setAPIData] = useState<Row[]>([])
  return (
    <Main>
      <div style={{ display: 'flex', width: '100%', maxHeight: '100vh', overflow: 'auto', flexDirection: 'column', gap: '100px', padding: '40px' }}>
        { /* <EditableTable data={data} setData={(data: Row[]) => setData(data)} selected={selected === "editable_table" ? true : false} onClick={() => { setSelected("editable_table") }} /> */}
        <ReadTable data={apiData} selected={selected === "read_table" ? true : false} onClick={() => { setSelected("read_table") }} />
      </div>
      <SidePanel>

        <h2>{selected} </h2>

        <div>
          <label htmlFor={"data"}>Data</label>
          <CodeBlock id={"data"} draggable={true} onDrag={(e)=>{
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


    </Main >
  )
}
