import React from "react";
import { styled } from "@/stitches.config";

const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  padding: '$3',
  backgroundColor: '$bgSecondary',
  marginTop: "$3",
  minHeight: 'calc(100vh - 64px)',
  borderTop: '1px solid $fgBorder',

  variants: {
    side: {
      "left": {
        borderRight: '1px solid $fgBorder',
        width: '200px',
        borderRadius: '0 8px 0 0'

      },
      "right": {
        borderLeft: '1px solid $fgBorder',
        width: '420px',
        borderRadius: '8px 0 0 0'
      }
    }
  }
})

export const SidePanel = ({ children, style, expanded = false, side = right }: { children: React.ReactNode, style?: React.CSSProperties, expanded?: boolean, side?: "left" | "right" }) => {

  if (!expanded) return null;

  return (
    <Container style={{ ...style }} side={side}>
      {children}
    </Container>
  )

}
