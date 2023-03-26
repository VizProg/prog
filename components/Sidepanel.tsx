import React from "react";
import { styled } from "@/stitches.config";

const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  padding: '$3',
  backgroundColor: '$mauve2',
  marginTop: "$3",
  minHeight: 'calc(100vh - 64px)',
  borderTop: '1px solid $separator',
  flexShrink: 0,
  variants: {
    side: {
      "left": {
        borderRight: '1px solid $separator',
        width: '180px',
        borderRadius: '0 8px 0 0'

      },
      "right": {
        borderLeft: '1px solid $separator',
        width: '300px',
        borderRadius: '8px 0 0 0'
      }
    },
    nested: {
      "true": {
        position: 'absolute',
        left: '100%',
        zIndex: 1000,
        width: 400,
      }
    }
  }
})

const Box = styled('div', {
  display: 'flex',
})

export const SidePanel = ({ children, style, expanded = false, side = "right", nested }: { children: React.ReactNode, style?: React.CSSProperties, expanded?: boolean, nested?: React.ReactNode, side?: "left" | "right" }) => {

  if (!expanded) return null;
  if (!nested) return (
    <Container style={{ ...style }} side={side}>
      {children}
    </Container>
  )

  return (
    <Box css={{
      position: 'relative'
    }}>
      <Container style={{ ...style, borderRadius: 0 }} side={side} >
        {children}
      </Container>
      <Container style={{ ...style }} side={side} nested={true}>
        {nested}
      </Container>
    </Box>
  )

}
