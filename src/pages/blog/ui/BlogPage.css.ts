import { style, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(24px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

/* ─── Page wrapper ─── */
export const page = style({
  minHeight: '100vh',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
})

/* ─── Hero header ─── */
export const hero = style({
  paddingTop: '140px',
  paddingBottom: '64px',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  borderBottom: `1px solid ${themeContract.color.border}`,
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '100px',
    },
  },
})

export const heroLabel = style({
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '16px',
  animation: `${fadeUp} 0.6s ease both`,
})

export const heroTitle = style({
  fontSize: 'clamp(40px, 7vw, 80px)',
  fontWeight: 800,
  letterSpacing: '-2px',
  lineHeight: 1,
  color: themeContract.color.text,
  marginBottom: '16px',
  animation: `${fadeUp} 0.7s 0.05s ease both`,
})

export const heroDesc = style({
  fontSize: '16px',
  color: themeContract.color.textMuted,
  lineHeight: 1.7,
  maxWidth: '480px',
  animation: `${fadeUp} 0.7s 0.1s ease both`,
})

/* ─── Main body ─── */
export const body = style({
  paddingLeft: '4rem',
  paddingRight: '4rem',
  paddingTop: '48px',
  paddingBottom: '96px',
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
})

/* ─── Category filter ─── */
export const filterBar = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginBottom: '48px',
})

export const filterBtn = style({
  padding: '8px 18px',
  borderRadius: '100px',
  fontSize: '13px',
  fontWeight: 500,
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: `1px solid ${themeContract.color.border}`,
  backgroundColor: 'transparent',
  color: themeContract.color.textMuted,
  transition: 'all 0.2s',
  ':hover': {
    borderColor: themeContract.color.text,
    color: themeContract.color.text,
  },
})

export const filterBtnActive = style({
  backgroundColor: themeContract.color.text,
  color: themeContract.color.bg,
  borderColor: themeContract.color.text,
})

/* ─── Featured post (first card, large) ─── */
export const featured = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  marginBottom: '48px',
  borderRadius: '20px',
  overflow: 'hidden',
  border: `1px solid ${themeContract.color.border}`,
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  ':hover': {
    borderColor: themeContract.color.text,
  },
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const featuredImg = style({
  width: '100%',
  aspectRatio: '16 / 10',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.5s ease',
  selectors: {
    [`${featured}:hover &`]: {
      transform: 'scale(1.03)',
    },
  },
})

export const featuredImgWrap = style({
  overflow: 'hidden',
  '@media': {
    '(max-width: 900px)': {
      aspectRatio: '16 / 9',
    },
  },
})

export const featuredBody = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '40px 40px 40px 32px',
  '@media': {
    '(max-width: 900px)': {
      padding: '24px',
    },
  },
})

export const featuredCategory = style({
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '12px',
})

export const featuredTitle = style({
  fontSize: 'clamp(22px, 3vw, 32px)',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  lineHeight: 1.25,
  color: themeContract.color.text,
  marginBottom: '16px',
})

export const featuredDesc = style({
  fontSize: '14px',
  color: themeContract.color.textMuted,
  lineHeight: 1.7,
  marginBottom: '24px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const featuredMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '13px',
  color: themeContract.color.textMuted,
})

export const metaDot = style({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: themeContract.color.border,
  display: 'inline-block',
})

/* ─── Post grid ─── */
export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  '@media': {
    '(max-width: 1100px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  borderRadius: '16px',
  overflow: 'hidden',
  border: `1px solid ${themeContract.color.border}`,
  backgroundColor: themeContract.color.bg,
  cursor: 'pointer',
  transition: 'border-color 0.2s, transform 0.2s',
  ':hover': {
    borderColor: themeContract.color.text,
    transform: 'translateY(-4px)',
  },
})

export const cardImgWrap = style({
  overflow: 'hidden',
  aspectRatio: '16 / 9',
})

export const cardImg = style({
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
  padding: '20px',
})

export const cardCategory = style({
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '8px',
})

export const cardTitle = style({
  fontSize: '17px',
  fontWeight: 700,
  letterSpacing: '-0.3px',
  lineHeight: 1.4,
  color: themeContract.color.text,
  marginBottom: '8px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const cardDesc = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  lineHeight: 1.6,
  marginBottom: '16px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const cardMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '12px',
  color: themeContract.color.textMuted,
  borderTop: `1px solid ${themeContract.color.border}`,
  paddingTop: '14px',
  marginTop: '4px',
})

/* ─── Empty state ─── */
export const empty = style({
  textAlign: 'center',
  padding: '80px 0',
  color: themeContract.color.textMuted,
  fontSize: '15px',
})
