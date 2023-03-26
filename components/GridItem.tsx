import React from "react";
import { styled } from "@/stitches.config";


const StyledGridItem = styled("div", {
  display: 'flex',
  alignItems: 'center',
  padding: '$2',
  borderRadius: '6px',
  background: '$mauve3',
  border: '1px solid $fgBorder',
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

      }
    }
  }
})

interface GridItemProps extends React.HTMLProps<HTMLDivElement> {
  type: "text" | "button" | "table" | "input"
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({ children, type, ...rest }, ref) => {

  return (
    <StyledGridItem {...rest} ref={ref} >
      {children}
    </StyledGridItem>
  )
})
