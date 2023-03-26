import React from "react";
import { styled } from "@/stitches.config";

const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  width: '420px',
  padding: '$3',
  borderLeft: '1px solid $fgBorder',
  backgroundColor: '$mauve2',
  minHeight: 'calc(100vh - 48px)',
  flex: "0 1 0",
  variants: {
    side: {
      "left": {
        borderRight: '1px solid $fgBorder',

      },
      "right": {
        borderLeft: '1px solid $fgBorder',

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
