import Head from 'next/head'
import { styled } from '@/stitches.config'
import { useState } from 'react'
import { SidePanel } from '@/components/Sidepanel'
import { EditableTable } from '@/components/editableTable'
import { ReadTable } from '@/components/readTable'

const Main = styled("main", {
  minHeight: "100vh",
  display: 'flex',
  minWidth: "100vw",
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyledHeader = styled("th", {
  width: '100%',
  textAlign: 'start',
  padding: '$2 $3',
})

const StyledCell = styled("td", {
  width: '100%',
  textAlign: 'start',
  padding: '$2 $3',
  minWidth: '100px',

})

const StyledTable = styled("table", {
  border: '1px solid $fgBorder',
  borderRadius: '$2',
  borderCollapse: 'collapse'
})

const StyledRow = styled("tr", {
  "& td": {
    borderBottom: '1px solid $fgBorder',
    borderRight: '1px solid $fgBorder'
  },
  " th": {
    borderBottom: '1px solid $fgBorder',
    borderRight: '1px solid $fgBorder'
  },

})

const Button = styled("button", {

})

type Row = {
  [key: string]: unknown;
};


export default function Home() {

  const [data, setData] = useState<Row[]>([{
    name: "Alfreds Futterkiste",
    location: "Germany",
    header3: ""
  }, {
    name: "david kim",
    location: "korea",
    header3: ""
  }])

  const readData = [{
    name: "Alfreds Futterkiste",
    location: "Germany",
    header3: ""
  }, {
    name: "david kim",
    location: "korea",
    header3: ""
  }]


  const [selected, setSelected] = useState("")
  const [apiUrl, setUrl] = useState("https://api.github.com/users/daviddkkim/events")
  const [apiData, setAPIData] = useState<Row[]>([])
  return (
    <Main>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '100px' }}>
        <EditableTable data={data} setData={(data: Row[]) => setData(data)} selected={selected === "editable_table" ? true : false} onClick={() => { setSelected("editable_table") }} />
        <ReadTable data={apiData} selected={selected === "read_table" ? true : false} onClick={() => { setSelected("read_table") }} />
      </div>
      <SidePanel>

        <h2>{selected} </h2>

        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>

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
