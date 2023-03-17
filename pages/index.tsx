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
    header3: ""
  }, {
    name: "david kim",
    location: "korea",
    header3: ""
  }])


  const getHeaders = (tableData: object) => {
    if (typeof tableData === 'object' && tableData !== null) {
      return Object.keys(tableData)
    }
    //to-do what if data is array?
  }


  const headerValues = getHeaders(data[0]);
  console.log(headerValues)

  return (
    <Main>
      <div>
        <table>
          <tbody>
            <tr>
              {headers.map((header) => {
                return <StyledHeader contentEditable suppressContentEditableWarning={true}
                > {header} </StyledHeader>
              })}
              <StyledHeader> <button onClick={() => {
                setHeaders([...headers, "new Header"])
              }}> + </button></StyledHeader>
            </tr>
            <tr>
              <StyledCell contentEditable suppressContentEditableWarning={true}
              >Alfreds Futterkiste</StyledCell>
              <StyledCell>Maria Anders</StyledCell>
              <StyledCell>Germany</StyledCell>
            </tr>
            <tr>
              <StyledCell>Centro comercial Moctezuma</StyledCell>
              <StyledCell>Francisco Chang</StyledCell>
              <StyledCell>Mexico</StyledCell>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              {headerValues && headerValues.map((header) => {
                return <StyledHeader contentEditable suppressContentEditableWarning={true}
                > {header} </StyledHeader>
              })}
              <StyledHeader> <button onClick={() => {
                setHeaders([...headers, "new Header"])
              }}> + </button></StyledHeader>
            </tr>
            {data.map((row) => {
              const cells = Object.keys(row).map((key) => {
                const value = row[key] as string;
                console.log(value)
                return <StyledCell> {value}</StyledCell>
              })

              return (
                <tr> {cells} </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </Main>
  )
}
