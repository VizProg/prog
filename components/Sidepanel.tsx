import React from "react";
import { styled } from "@/stitches.config";

const Container = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  minWidth: '420px',
  padding: '$3',
  borderLeft: '1px solid $fgBorder',
  backgroundColor: '$mauve2',
  minHeight: '100vh',
})

export const SidePanel = ({ children }: { children: React.ReactNode }) => {


  return (
    <Container>
      {children}
    </Container>
  )

}
