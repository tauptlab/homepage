import { style } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const section = style({
  padding: `${themeContract.space.xxl} ${themeContract.space.xl}`,
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  '@media': {
    '(max-width: 768px)': {
      padding: `${themeContract.space.xl} ${themeContract.space.md}`,
    },
  },
})

export const inner = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: themeContract.space.xxl,
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: themeContract.space.xl,
    },
  },
})

export const leftCol = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const sectionLabel = style({
  fontSize: '13px',
  fontWeight: '500',
  color: themeContract.color.textMuted,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: themeContract.space.lg,
})

export const sectionTitle = style({
  fontSize: 'clamp(32px, 4vw, 56px)',
  fontWeight: '700',
  letterSpacing: '-1px',
  color: themeContract.color.text,
  lineHeight: '1.1',
  marginBottom: themeContract.space.lg,
})

export const contactInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.md,
})

export const contactItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.xs,
})

export const contactItemLabel = style({
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
})

export const contactItemValue = style({
  fontSize: '15px',
  color: themeContract.color.text,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.md,
})

export const formRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: themeContract.space.md,
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.xs,
})

export const label = style({
  fontSize: '12px',
  fontWeight: '500',
  color: themeContract.color.textMuted,
  letterSpacing: '0.5px',
})

export const input = style({
  padding: `${themeContract.space.md} ${themeContract.space.md}`,
  borderRadius: themeContract.radius.md,
  border: `1px solid ${themeContract.color.border}`,
  backgroundColor: themeContract.color.bgSecondary,
  color: themeContract.color.text,
  fontSize: '14px',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
  outline: 'none',
  ':focus': {
    borderColor: themeContract.color.text,
  },
})

export const textarea = style([input, {
  resize: 'vertical',
  minHeight: '120px',
}])

export const submitBtn = style({
  padding: `${themeContract.space.md} ${themeContract.space.xl}`,
  borderRadius: themeContract.radius.md,
  backgroundColor: themeContract.color.accent,
  color: themeContract.color.accentText,
  fontSize: '14px',
  fontWeight: '600',
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.2s',
  alignSelf: 'flex-start',
  ':hover': {
    opacity: 0.85,
  },
})
