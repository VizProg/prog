import Head from 'next/head'
import { styled } from '@/stitches.config'
import { useState } from 'react'

const Main = styled("main", {
  minHeight: "100vh",
  display: 'flex',
  flexDirection: 'column',
  minWidth: "100vw",
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$6'
})

const StyledHeader = styled("th", {
  width: '100%',
  textAlign: 'start',
  padding: '$2 $3'
})

const StyledCell = styled("td", {
  width: '100%',
  textAlign: 'start',
  padding: '$2 $3'
})

type Row = {
  [key: string]: unknown;
};


export default function Home() {

  const [headers, setHeaders] = useState(["header1", "header2", "header3"])
  const [data, setData] = useState<Row[]>([{
    name: "Alfreds Futterkiste",
    location: "Germany",
    header3: "2"
  }, {
    name: "david kim",
    location: "korea",
    header3: "1"
  }])


  const getHeaders = (tableData: object) => {
    if (typeof tableData === 'object' && tableData !== null) {
      return Object.keys(tableData)
    }
    //to-do what if data is array?
  }


  const headerValues = getHeaders(data[0]);

  return (
    <Main>
      <div>
        <table>
          <tbody>
            <tr>
              {headerValues && headerValues.map((header, i) => {
                return <StyledHeader contentEditable suppressContentEditableWarning={true} key={i}
                > {header} </StyledHeader>
              })}
              <StyledHeader> <button onClick={() => {
                setHeaders([...headers, "new Header"])
              }}> + </button></StyledHeader>
            </tr>
            {data.map((row, i) => {
              const cells = Object.keys(row).map((key, i) => {
                const value = row[key] as string;
                console.log(value)
                return <StyledCell key={i}>{value}</StyledCell>
              })
              return (
                <tr key={i}>{cells}</tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </Main>
  )
}
