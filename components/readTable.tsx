import React from "react"
import { styled } from "@/stitches.config"
import { Row } from "@/types"

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
  maxWidth: '400px',
  overflow: 'auto',
})

const StyledTable = styled("table", {
  border: '1px solid $fgBorder',
  borderRadius: '$2',
  borderCollapse: 'collapse',
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

const DivTable = styled("div", {
  minWidth: "240px",
  borderRadius: '0px',
  border: ' 1px solid $fgBorder',
  height: '160px',
})

const DivTableHeader = styled("div", {
  height: '36px',
  borderBottom: '1px solid $fgBorder'
})

const Box = styled("div", {
  display: 'flex',
  justifyContent: ' center',
  alignItems: "center",
  height: 'calc(100% - 36px)'
})

export const ReadTable = React.forwardRef<HTMLDivElement, {
  data: Row[], selected: boolean, onClick: () => void,
  key?: string,
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>,
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>,
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>,
  className?: string,
  children?: React.ReactNode
}>(({
  data,
  selected,
  onClick,
  key,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  className,
  children
}, ref) => {

  if (data.length < 1 || !data) {

    return (
      <DivTable onClick={() => { onClick() }}
        css={{
          border: selected ? "2px solid $orange10" : ""
        }}
        key={key}
        className={className} ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onTouchEnd}>
        <DivTableHeader>

        </DivTableHeader>
        <Box>
          No rows were found
        </Box>
        {children}
      </DivTable>

    )
  }



  const getHeaders = (tableData: object) => {
    if (typeof tableData === 'object' && tableData !== null) {
      return Object.keys(tableData)
    }
    //to-do what if data is array?
  }

  const headerValues = getHeaders(data[0]);
  return (

    <div style={{ position: 'relative' }} ref={ref}>
      <StyledTable onClick={() => { onClick() }}
        css={{
          border: selected ? "2px solid $orange10" : ""
        }}>
        <tbody>
          <StyledRow>
            {headerValues && headerValues.map((header, i) => {
              return <StyledHeader key={i}
              > {header} </StyledHeader>
            })}
          </StyledRow>
          {data.map((row, i) => {
            const cells = Object.keys(row).map((key, i) => {
              if (typeof row[key] === "object") {
                return <StyledCell key={i}>{JSON.stringify(row[key])}</StyledCell>
              }
              if (typeof row[key] === "boolean") {
                return <StyledCell key={i}>{row[key] ? "true" : false}</StyledCell>
              }
              const value = row[key] as string;
              return <StyledCell key={i}>{value}</StyledCell>
            })
            return (
              <StyledRow key={i}>{cells}</StyledRow>
            )
          })}
        </tbody>
      </StyledTable>
      {children}

    </div>
  )
})

ReadTable.displayName = "ReadTable";