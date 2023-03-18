import React from "react"
import { styled } from "@/stitches.config"

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




export const EditableTable = ({
  data = [{
    name: "Alfreds Futterkiste",
    location: "Germany",
    header3: ""
  }, {
    name: "david kim",
    location: "korea",
    header3: ""
  }],
  setData,
  selected = false,
  onClick }: {
    data: Row[],
    setData: (data: Row[]) => void
    onClick: () => void,
    selected: boolean
  }) => {

  const getHeaders = (tableData: object) => {
    if (typeof tableData === 'object' && tableData !== null) {
      return Object.keys(tableData)
    }
    //to-do what if data is array?
  }

  const headerValues = getHeaders(data[0]);

  return (

    <div style={{ position: 'relative' }}>
      <StyledTable onClick={onClick}
        css={{
          border: selected ? "2px solid $orange10" : ""
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
  )


}
