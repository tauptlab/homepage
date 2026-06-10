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
  fontSize: 'clamp(28px, 5vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-1.2px',
  lineHeight: 1.2,
  color: themeContract.color.text,
  marginBottom: '20px',
  maxWidth: '820px',
  animation: `${fadeUp} 0.7s 0.05s ease both`,
})

export const heroDesc = style({
  fontSize: '17px',
  color: themeContract.color.textMuted,
  lineHeight: 1.65,
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

export const heroAuthorName = style({
  fontWeight: 600,
  color: themeContract.color.text,
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
  gridTemplateColumns: 'minmax(0, 1fr) 260px',
  gap: '80px',
  maxWidth: '1320px',
  margin: '0 auto',
  padding: '72px 4rem 96px',
  alignItems: 'start',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: '48px',
    },
    '(max-width: 768px)': {
      padding: '48px 1.25rem 80px',
    },
  },
})

/* ─── Markdown prose ─── */
export const prose = style({
  fontFamily: themeContract.font.body,
  fontSize: '17px',
  lineHeight: 1.85,
  color: themeContract.color.text,
  maxWidth: '900px',
  width: '100%',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
})

/* Headings */
globalStyle(`${prose} h1`, {
  fontSize: '32px',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  lineHeight: 1.25,
  marginTop: '56px',
  marginBottom: '20px',
  color: themeContract.color.text,
})

globalStyle(`${prose} h2`, {
  fontSize: '26px',
  fontWeight: 800,
  letterSpacing: '-0.6px',
  lineHeight: 1.3,
  marginTop: '72px',
  marginBottom: '18px',
  color: themeContract.color.text,
  scrollMarginTop: '100px',
})

globalStyle(`${prose} h2:first-child`, {
  marginTop: '0',
})

globalStyle(`${prose} h3`, {
  fontSize: '20px',
  fontWeight: 700,
  letterSpacing: '-0.3px',
  lineHeight: 1.35,
  marginTop: '44px',
  marginBottom: '14px',
  color: themeContract.color.text,
  scrollMarginTop: '100px',
})

globalStyle(`${prose} h4`, {
  fontSize: '17px',
  fontWeight: 700,
  marginTop: '32px',
  marginBottom: '10px',
  color: themeContract.color.text,
})

/* Paragraphs / lists */
globalStyle(`${prose} p`, {
  marginBottom: '22px',
})

globalStyle(`${prose} ul, ${prose} ol`, {
  paddingLeft: '1.5em',
  marginBottom: '22px',
})

globalStyle(`${prose} ul`, {
  listStyle: 'disc',
})

globalStyle(`${prose} ol`, {
  listStyle: 'decimal',
})

globalStyle(`${prose} li`, {
  marginBottom: '8px',
  lineHeight: 1.75,
})

globalStyle(`${prose} li > ul, ${prose} li > ol`, {
  marginTop: '8px',
  marginBottom: '8px',
})

/* Inline code */
globalStyle(`${prose} code`, {
  fontFamily: themeContract.font.mono,
  fontSize: '0.88em',
  backgroundColor: themeContract.color.bgSecondary,
  color: themeContract.color.text,
  padding: '0.15em 0.4em',
  borderRadius: '4px',
  border: 'none',
  fontWeight: 500,
})

/* Code blocks */
globalStyle(`${prose} pre`, {
  backgroundColor: '#1a1a1a',
  borderRadius: '10px',
  padding: '20px 24px',
  overflowX: 'auto',
  marginBottom: '28px',
  marginTop: '8px',
  fontSize: '14px',
  lineHeight: 1.7,
  border: '1px solid #1f1f1f',
})

globalStyle(`${prose} pre code`, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  fontSize: 'inherit',
  color: '#e5e5e5',
  fontFamily: "'JetBrains Mono', 'Pretendard', 'Courier New', monospace",
  fontWeight: 400,
})

/* Callout / blockquote */
globalStyle(`${prose} blockquote`, {
  borderLeft: `3px solid ${themeContract.color.text}`,
  background: themeContract.color.bgSecondary,
  padding: '18px 22px',
  margin: '28px 0',
  borderRadius: '0 8px 8px 0',
  color: themeContract.color.text,
  fontStyle: 'normal',
})

globalStyle(`${prose} blockquote p`, {
  marginBottom: '10px',
})

globalStyle(`${prose} blockquote p:last-child`, {
  marginBottom: 0,
})

globalStyle(`${prose} blockquote ul, ${prose} blockquote ol`, {
  marginBottom: 0,
  paddingLeft: '1.2em',
})

globalStyle(`${prose} blockquote li`, {
  marginBottom: '4px',
})

globalStyle(`${prose} blockquote strong:first-child`, {
  display: 'inline-block',
  marginBottom: '4px',
})

/* Tables */
globalStyle(`${prose} table`, {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '28px',
  marginTop: '8px',
  fontSize: '14.5px',
  overflow: 'hidden',
  borderRadius: '8px',
  border: `1px solid ${themeContract.color.border}`,
})

globalStyle(`${prose} thead`, {
  backgroundColor: themeContract.color.bgSecondary,
})

globalStyle(`${prose} th`, {
  textAlign: 'left',
  padding: '12px 16px',
  borderBottom: `1px solid ${themeContract.color.border}`,
  fontWeight: 700,
  color: themeContract.color.text,
  fontSize: '13.5px',
  letterSpacing: '-0.1px',
})

globalStyle(`${prose} td`, {
  padding: '12px 16px',
  borderBottom: `1px solid ${themeContract.color.border}`,
  color: themeContract.color.text,
  verticalAlign: 'top',
})

globalStyle(`${prose} tbody tr:last-child td`, {
  borderBottom: 'none',
})

globalStyle(`${prose} tbody tr:nth-child(even)`, {
  backgroundColor: themeContract.color.bgSecondary,
})

/* Links */
globalStyle(`${prose} a`, {
  color: themeContract.color.text,
  textDecoration: 'underline',
  textDecorationColor: themeContract.color.border,
  textDecorationThickness: '1.5px',
  textUnderlineOffset: '4px',
  transition: 'text-decoration-color 0.15s',
})

globalStyle(`${prose} a:hover`, {
  textDecorationColor: themeContract.color.text,
})

/* HR */
globalStyle(`${prose} hr`, {
  border: 'none',
  borderTop: `1px solid ${themeContract.color.border}`,
  margin: '48px 0',
})

/* Strong — 형광펜 효과 */
globalStyle(`${prose} strong`, {
  fontWeight: 700,
  color: themeContract.color.text,
  backgroundImage: 'linear-gradient(180deg, transparent 62%, rgba(250, 204, 21, 0.45) 62%, rgba(250, 204, 21, 0.45) 92%, transparent 92%)',
  backgroundRepeat: 'no-repeat',
  padding: '0 2px',
})

/* Strong inside heading / callout heading-strong should NOT get marker */
globalStyle(`${prose} h1 strong, ${prose} h2 strong, ${prose} h3 strong, ${prose} h4 strong, ${prose} blockquote strong`, {
  backgroundImage: 'none',
  padding: 0,
})

/* Strong inside links keep readable */
globalStyle(`${prose} a strong`, {
  backgroundImage: 'none',
  padding: 0,
})

globalStyle(`${prose} em`, {
  fontStyle: 'italic',
  color: themeContract.color.text,
})

/* KaTeX math */
globalStyle(`${prose} .katex-display`, {
  margin: '28px 0',
  overflowX: 'auto',
  overflowY: 'hidden',
  padding: '4px 0',
})

globalStyle(`${prose} .katex`, {
  fontSize: '1.05em',
})

/* Footnotes section (when marked emits .footnotes) */
globalStyle(`${prose} .footnotes`, {
  marginTop: '64px',
  paddingTop: '32px',
  borderTop: `1px solid ${themeContract.color.border}`,
  fontSize: '14px',
  color: themeContract.color.textMuted,
})

globalStyle(`${prose} .footnotes ol`, {
  paddingLeft: '1.2em',
})

globalStyle(`${prose} .footnotes li`, {
  marginBottom: '8px',
  lineHeight: 1.65,
})

globalStyle(`${prose} .footnote-ref, ${prose} sup a`, {
  textDecoration: 'none',
  fontSize: '0.78em',
  fontWeight: 600,
  color: themeContract.color.text,
  padding: '0 2px',
})

globalStyle(`${prose} .footnote-backref`, {
  textDecoration: 'none',
  marginLeft: '6px',
  color: themeContract.color.textMuted,
})

/* Images inside prose */
globalStyle(`${prose} img`, {
  borderRadius: '8px',
  margin: '24px auto',
})

/* ─── Sidebar ─── */
export const sidebar = style({
  position: 'sticky',
  top: '80px',
  '@media': {
    '(max-width: 1024px)': {
      position: 'static',
    },
  },
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
  marginBottom: '14px',
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
  gap: '10px',
})

export const sidebarInfoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  gap: '12px',
})

export const sidebarInfoLabel = style({
  color: themeContract.color.textMuted,
  whiteSpace: 'nowrap',
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
  backgroundColor: themeContract.color.bg,
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
