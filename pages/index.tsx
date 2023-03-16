import Head from 'next/head'
import { styled } from '@/stitches.config'
import { useState } from 'react'

const Main = styled("main", {
  minHeight: "100vh",
  minWidth: "100vw",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export default function Home() {

  const [headers, setHeaders] = useState(["header1", "header2", "header3"])

  return (
    <Main>
      <table>
        <tbody>
          <tr>
            {headers.map((header) => {
              return <th contentEditable> {header} </th>
            })}
            <th> <button onClick={() => {
              setHeaders([...headers, "new Header"])
            }}> + </button></th>
          </tr>
          <tr>
            <td contentEditable>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table>
    </Main>
  )
}
