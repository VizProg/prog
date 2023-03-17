import Head from 'next/head'
import { styled } from '@/stitches.config'
import { useState } from 'react'
import { SidePanel } from '@/components/Sidepanel'

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


  const [selected, setSelected] = useState('')


  const getHeaders = (tableData: object) => {
    if (typeof tableData === 'object' && tableData !== null) {
      return Object.keys(tableData)
    }
    //to-do what if data is array?
  }

  const headerValues = getHeaders(data[0]);


  return (
    <Main>
      <div style={{ position: 'relative', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <StyledTable onClick={() => { setSelected("table") }}
            css={{
              border: selected === 'table' ? "2px solid $orange10" : ""
            }}>
            <tbody>
              <StyledRow>
                {headerValues && headerValues.map((header, i) => {
                  return <StyledHeader contentEditable suppressContentEditableWarning={true} key={i}
                  > {header} </StyledHeader>
                })}
              </StyledRow>
              {data.map((row, i) => {
                const cells = Object.keys(row).map((key, i) => {
                  const value = row[key] as string;
                  console.log(value)
                  return <StyledCell key={i} contentEditable suppressContentEditableWarning={true}>{value}</StyledCell>
                })
                return (
                  <StyledRow key={i}>{cells}</StyledRow>
                )
              })}
            </tbody>
          </StyledTable>
          <Button css={{
            position: 'absolute',
            right: -32,
            top: 6
          }}
            onClick={() => {
              const newData = [...data];

              //This feels like a hack but ok
              const firstrow = newData[0];
              let i = 1;
              let newKey = "newField"
              while (firstrow.hasOwnProperty(newKey)) {
                newKey = "newField_" + (i + 1);
                i++
              }
              newData.map((row) => {
                row[newKey] = ''
              })
              console.log(newData)
              setData(newData)
            }}>
            +
          </Button>
          <Button css={{
            position: 'absolute',
            left: 9,
            bottom: -32
          }} onClick={() => {
            if (headerValues) {
              let newObject: Row = {};
              for (const key in headerValues) {
                newObject[headerValues[key]] = ""
              }
              setData([...data, newObject])
            }
          }}> + </Button>
        </div>

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
