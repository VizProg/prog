import Head from 'next/head'
import { styled } from '@/stitches.config'
import { useState } from 'react'
import { SidePanel } from '@/components/Sidepanel'
import { EditableTable } from '@/components/editableTable'

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


  const [selected, setSelected] = useState(false)

  return (
    <Main>
      <div style={{ position: 'relative', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <EditableTable data={data} setData={(data: Row[]) => setData(data)} selected={selected} onClick={() => { setSelected(true) }} />
      </div>
      <SidePanel>

        <h2>{selected} </h2>

        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>

      </SidePanel>
    </Main >
  )
}
