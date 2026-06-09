import { style } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const section = style({
  position: 'relative',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  overflow: 'hidden',
})

export const stickyWrap = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
  overflow: 'hidden',
})

export const sectionTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: `${themeContract.space.xl} ${themeContract.space.xl} ${themeContract.space.lg}`,
  flexShrink: 0,
  '@media': {
    '(max-width: 768px)': {
      padding: `${themeContract.space.lg} ${themeContract.space.md}`,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: themeContract.space.sm,
    },
  },
})

export const sectionLabel = style({
  fontSize: '13px',
  fontWeight: '500',
  color: themeContract.color.textMuted,
  letterSpacing: '2px',
  textTransform: 'uppercase',
})

export const sectionTitle = style({
  fontSize: 'clamp(28px, 4vw, 52px)',
  fontWeight: '800',
  letterSpacing: '-1px',
  color: themeContract.color.text,
})

export const trackWrapper = style({
  flex: 1,
  overflow: 'visible',
  display: 'flex',
  alignItems: 'center',
})

export const track = style({
  display: 'flex',
  gap: themeContract.space.md,
  paddingLeft: themeContract.space.xl,
  paddingRight: themeContract.space.xl,
  width: 'max-content',
  willChange: 'transform',
  '@media': {
    '(max-width: 768px)': {
      flexWrap: 'wrap',
      width: '100%',
      paddingLeft: themeContract.space.md,
      paddingRight: themeContract.space.md,
      paddingBottom: themeContract.space.xl,
    },
  },
})

export const card = style({
  width: 'clamp(280px, 32vw, 480px)',
  flexShrink: 0,
  borderRadius: themeContract.radius.lg,
  border: `1px solid ${themeContract.color.border}`,
  overflow: 'hidden',
  backgroundColor: themeContract.color.bg,
  transition: 'border-color 0.2s',
  cursor: 'pointer',
  ':hover': {
    borderColor: themeContract.color.text,
  },
  '@media': {
    '(max-width: 768px)': {
      width: '100%',
    },
  },
})

export const cardImage = style({
  width: '100%',
  aspectRatio: '16 / 10',
  backgroundColor: themeContract.color.bgSecondary,
  overflow: 'hidden',
})

export const cardImageInner = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.5s ease',
  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
})

export const cardBody = style({
  padding: themeContract.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.sm,
})

export const cardTag = style({
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
})

export const cardTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: themeContract.color.text,
  letterSpacing: '-0.3px',
})

export const cardDesc = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  lineHeight: '1.6',
})

// Mobile fallback - normal grid layout
export const mobileGrid = style({
  display: 'none',
  gridTemplateColumns: '1fr',
  gap: themeContract.space.md,
  padding: `${themeContract.space.xl} ${themeContract.space.md}`,
  '@media': {
    '(max-width: 768px)': {
      display: 'grid',
    },
  },
})
