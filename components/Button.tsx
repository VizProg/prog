import { styled } from "@/stitches.config";

export const Button = styled('button', {
    display: 'flex',
    gap: '$2',
    alignItems: 'center',
    border: 'none',
    background: 'transparent',
    color: '$textPrimary',
    padding: '$2',
    borderRadius: '6px',
    width: "fit-content",
    "&:disabled": {
      opacity: .5,
    },
  
    variants: {
      stretch: {
        true: {
          width: '100%'
        },
        false: {
          width: "fit-content"
        }
      },
      variant: {
        "ghost": {
          "&:hover:not([disabled])": {
            background: '$fg',
          },
        },
        "outline": {
          border: '1px solid $separator',
          background: "linear-gradient($mauve1,$mauve2)",
          "&:hover:not([disabled])": {
            background: '$fg',
          },
        },
        "primary": {
          background: "linear-gradient($mauve4, $mauve5)",
          border: '1px solid $separator',
          "&:hover:not([disabled])": {
            background: '$mauve5',
          },
        }
      }
    }
  
  })