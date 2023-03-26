import React from "react";
import { styled } from "@/stitches.config";


const StyledGridItem = styled("div", {
  display: 'flex',
  alignItems: 'center',
  padding: '$2',
  borderRadius: '6px',
  background: '$mauve3',
  border: '1px solid $fgBorder',
  "& > .react-resizable-handle:after": {
  borderColor: '$fgBorder !important'
  },
  variants: {
    type: {
      "input": {
        background: 'transparent',
        border: '1px solid transparent'
      },
      "text": {
        background: 'transparent',
        border: '1px solid transparent'
      },
      "button": {
        background: 'transparent',
        border: '1px solid transparent'
      },
      "table": {
        background: 'transparent',
        border: '1px solid transparent'

      }
    }
  }
})

interface GridItemProps extends React.HTMLProps<HTMLDivElement> {
  type: "text" | "button" | "table" | "input"
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({ children, type, ...rest }, ref) => {

  return (
    <StyledGridItem {...rest} ref={ref} type={type}>
      {children}
    </StyledGridItem>
  )
})

GridItem.displayName = "GridItem"