import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const page = style({
  minHeight: '100vh',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
})

/* ─── Hero ─── */
export const hero = style({
  position: 'relative',
  paddingTop: '140px',
  paddingBottom: '0',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '100px',
    },
  },
})

export const backBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  fontWeight: 500,
  color: themeContract.color.textMuted,
  fontFamily: 'inherit',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  marginBottom: '32px',
  transition: 'color 0.2s',
  ':hover': {
    color: themeContract.color.text,
  },
})

export const heroMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
  animation: `${fadeUp} 0.6s ease both`,
})

export const categoryBadge = style({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '100px',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  backgroundColor: themeContract.color.bgSecondary,
  color: themeContract.color.textMuted,
  border: `1px solid ${themeContract.color.border}`,
})

export const heroDate = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
})

export const heroTitle = style({
  fontSize: 'clamp(28px, 5vw, 56px)',
  fontWeight: 800,
  letterSpacing: '-1.5px',
  lineHeight: 1.15,
  color: themeContract.color.text,
  marginBottom: '20px',
  maxWidth: '820px',
  animation: `${fadeUp} 0.7s 0.05s ease both`,
})

export const heroDesc = style({
  fontSize: '17px',
  color: themeContract.color.textMuted,
  lineHeight: 1.7,
  maxWidth: '640px',
  marginBottom: '32px',
  animation: `${fadeUp} 0.7s 0.1s ease both`,
})

export const heroAuthor = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: themeContract.color.textMuted,
  paddingBottom: '40px',
  borderBottom: `1px solid ${themeContract.color.border}`,
  animation: `${fadeUp} 0.7s 0.15s ease both`,
})

export const authorDot = style({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: themeContract.color.border,
})

/* ─── Thumbnail ─── */
export const thumbnail = style({
  width: 'calc(100% - 8rem)',
  marginLeft: '4rem',
  marginRight: '4rem',
  aspectRatio: '21 / 9',
  objectFit: 'cover',
  borderRadius: '16px',
  display: 'block',
  marginTop: '40px',
  marginBottom: '0',
  '@media': {
    '(max-width: 768px)': {
      width: 'calc(100% - 2.5rem)',
      marginLeft: '1.25rem',
      marginRight: '1.25rem',
      aspectRatio: '16 / 9',
    },
  },
})

/* ─── Content area ─── */
export const layout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 240px',
  gap: '64px',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '64px 4rem 96px',
  alignItems: 'start',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: '48px',
    },
    '(max-width: 768px)': {
      padding: '40px 1.25rem 80px',
    },
  },
})

/* ─── Markdown prose ─── */
export const prose = style({
  fontSize: '16px',
  lineHeight: 1.8,
  color: themeContract.color.text,
  maxWidth: '720px',
})

// Global styles for rendered markdown
globalStyle(`${prose} h1`, {
  fontSize: '32px',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  lineHeight: 1.2,
  marginTop: '56px',
  marginBottom: '20px',
  color: 'var(--color-text, #0d0d0d)',
})

globalStyle(`${prose} h2`, {
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.3px',
  lineHeight: 1.3,
  marginTop: '48px',
  marginBottom: '16px',
  color: 'var(--color-text, #0d0d0d)',
  paddingBottom: '12px',
  borderBottom: '1px solid var(--color-border, #e5e5e5)',
})

globalStyle(`${prose} h3`, {
  fontSize: '19px',
  fontWeight: 700,
  marginTop: '36px',
  marginBottom: '12px',
  color: 'var(--color-text, #0d0d0d)',
})

globalStyle(`${prose} p`, {
  marginBottom: '20px',
})

globalStyle(`${prose} ul, ${prose} ol`, {
  paddingLeft: '24px',
  marginBottom: '20px',
})

globalStyle(`${prose} li`, {
  marginBottom: '6px',
  lineHeight: 1.7,
})

globalStyle(`${prose} code`, {
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  fontSize: '13px',
  backgroundColor: 'var(--color-bgSecondary, #f5f5f3)',
  padding: '2px 6px',
  borderRadius: '4px',
  border: '1px solid var(--color-border, #e5e5e5)',
})

globalStyle(`${prose} pre`, {
  backgroundColor: '#1a1a1a',
  borderRadius: '12px',
  padding: '24px',
  overflowX: 'auto',
  marginBottom: '24px',
  marginTop: '8px',
})

globalStyle(`${prose} pre code`, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  fontSize: '13px',
  color: '#e5e5e5',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
})

globalStyle(`${prose} blockquote`, {
  borderLeft: '3px solid var(--color-border, #e5e5e5)',
  paddingLeft: '20px',
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '20px',
  color: 'var(--color-textMuted, #6b6b6b)',
  fontStyle: 'italic',
})

globalStyle(`${prose} table`, {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '24px',
  fontSize: '14px',
})

globalStyle(`${prose} th`, {
  textAlign: 'left',
  padding: '10px 14px',
  backgroundColor: 'var(--color-bgSecondary, #f5f5f3)',
  borderBottom: '2px solid var(--color-border, #e5e5e5)',
  fontWeight: 600,
  color: 'var(--color-text, #0d0d0d)',
})

globalStyle(`${prose} td`, {
  padding: '10px 14px',
  borderBottom: '1px solid var(--color-border, #e5e5e5)',
  color: 'var(--color-text, #0d0d0d)',
})

globalStyle(`${prose} a`, {
  color: 'var(--color-text, #0d0d0d)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
})

globalStyle(`${prose} hr`, {
  border: 'none',
  borderTop: '1px solid var(--color-border, #e5e5e5)',
  margin: '40px 0',
})

globalStyle(`${prose} strong`, {
  fontWeight: 700,
  color: 'var(--color-text, #0d0d0d)',
})

/* ─── Sidebar ─── */
export const sidebar = style({
  position: 'sticky',
  top: '80px',
})

export const sidebarSection = style({
  marginBottom: '32px',
})

export const sidebarTitle = style({
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '12px',
})

export const tagList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
})

export const tag = style({
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 500,
  backgroundColor: themeContract.color.bgSecondary,
  color: themeContract.color.textMuted,
  border: `1px solid ${themeContract.color.border}`,
})

export const sidebarInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const sidebarInfoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
})

export const sidebarInfoLabel = style({
  color: themeContract.color.textMuted,
})

export const sidebarInfoValue = style({
  color: themeContract.color.text,
  fontWeight: 500,
  textAlign: 'right',
})

/* ─── Related posts ─── */
export const relatedSection = style({
  borderTop: `1px solid ${themeContract.color.border}`,
  padding: '64px 4rem',
  '@media': {
    '(max-width: 768px)': {
      padding: '48px 1.25rem',
    },
  },
})

export const relatedTitle = style({
  fontSize: '24px',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  color: themeContract.color.text,
  marginBottom: '32px',
})

export const relatedGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  '@media': {
    '(max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 580px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const relatedCard = style({
  borderRadius: '12px',
  overflow: 'hidden',
  border: `1px solid ${themeContract.color.border}`,
  cursor: 'pointer',
  transition: 'border-color 0.2s, transform 0.2s',
  ':hover': {
    borderColor: themeContract.color.text,
    transform: 'translateY(-3px)',
  },
})

export const relatedCardImg = style({
  width: '100%',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.4s',
  selectors: {
    [`${relatedCard}:hover &`]: {
      transform: 'scale(1.04)',
    },
  },
})

export const relatedCardImgWrap = style({
  overflow: 'hidden',
})

export const relatedCardBody = style({
  padding: '14px 16px 16px',
})

export const relatedCardCategory = style({
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '6px',
})

export const relatedCardTitle = style({
  fontSize: '15px',
  fontWeight: 700,
  letterSpacing: '-0.2px',
  lineHeight: 1.35,
  color: themeContract.color.text,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})
