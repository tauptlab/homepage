import { style, styleVariants } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${themeContract.space.sm} ${themeContract.space.md}`,
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: themeContract.font.body,
  fontWeight: 500,
  transition: 'opacity 0.15s ease',
  selectors: {
    '&:hover': { opacity: 0.85 },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
})

export const variants = styleVariants({
  primary: {
    backgroundColor: themeContract.color.accent,
    color: themeContract.color.accentText,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: themeContract.color.text,
    border: `1px solid currentColor`,
  },
})
