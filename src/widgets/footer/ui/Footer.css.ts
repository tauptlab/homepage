import { style } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const footer = style({
  borderTop: `1px solid ${themeContract.color.border}`,
  padding: `${themeContract.space.xl} ${themeContract.space.xl}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
  gap: themeContract.space.lg,
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: themeContract.space.lg,
    },
  },
})

export const footerLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.sm,
})

export const footerLogo = style({
  display: 'block',
})

export const footerLogoImg = style({
  height: '45px',
  width: 'auto',
  display: 'block',
  // dark mode invert is applied inline via isDarkMode state
  transition: 'filter 0.3s',
})

export const footerDesc = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  maxWidth: '300px',
  lineHeight: '1.6',
})

export const footerRight = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: themeContract.space.sm,
  '@media': {
    '(max-width: 768px)': {
      alignItems: 'flex-start',
    },
  },
})

export const footerLinks = style({
  display: 'flex',
  gap: themeContract.space.lg,
})

export const footerLink = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  transition: 'color 0.2s',
  ':hover': {
    color: themeContract.color.text,
  },
})

export const copyright = style({
  fontSize: '12px',
  color: themeContract.color.textMuted,
})
