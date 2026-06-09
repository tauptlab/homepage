import { style, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(24px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
})

const pulse = keyframes({
  '0%, 100%': { opacity: 0.6 },
  '50%': { opacity: 1 },
})

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-10px)' },
})

/* ─── Page ─── */
export const page = style({
  minHeight: '100vh',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  overflowX: 'hidden',
})

/* ─── Hero (with background image) ─── */
export const hero = style({
  position: 'relative',
  paddingTop: '200px',
  paddingBottom: '120px',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '140px',
      paddingBottom: '80px',
    },
  },
})

export const heroBg = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
})

export const heroBgImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  opacity: 0.15,
  filter: 'blur(2px)',
  transition: 'opacity 0.3s',
})

export const heroBgOverlay = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(180deg, ${themeContract.color.bg} 0%, transparent 35%, transparent 65%, ${themeContract.color.bg} 100%)`,
  transition: 'background 0.3s',
})

export const heroContent = style({
  position: 'relative',
  zIndex: 1,
  maxWidth: '720px',
})

export const heroLabel = style({
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '24px',
  animation: `${fadeUp} 0.6s ease both`,
})

export const heroTitle = style({
  fontSize: 'clamp(40px, 7vw, 80px)',
  fontWeight: 800,
  letterSpacing: '-3px',
  lineHeight: 1.0,
  color: themeContract.color.text,
  marginBottom: '28px',
  whiteSpace: 'pre-line',
  animation: `${fadeUp} 0.7s 0.05s ease both`,
  '@media': {
    '(max-width: 768px)': {
      letterSpacing: '-1.5px',
    },
  },
})

export const heroDesc = style({
  fontSize: '17px',
  color: themeContract.color.textMuted,
  lineHeight: 1.8,
  maxWidth: '600px',
  whiteSpace: 'pre-line',
  animation: `${fadeUp} 0.7s 0.1s ease both`,
})

export const heroScrollLine = style({
  width: '1px',
  height: '64px',
  backgroundColor: themeContract.color.border,
  margin: '48px auto 0',
  animation: `${pulse} 2s ease-in-out infinite`,
})

/* ─── Section shared ─── */
export const section = style({
  padding: '8rem 4rem',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  '@media': {
    '(max-width: 768px)': {
      padding: '4rem 1.25rem',
    },
  },
})

export const sectionAlt = style({
  padding: '8rem 4rem',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  '@media': {
    '(max-width: 768px)': {
      padding: '4rem 1.25rem',
    },
  },
})

export const sectionLabel = style({
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  marginBottom: '16px',
})

export const sectionTitle = style({
  fontSize: 'clamp(28px, 4.5vw, 56px)',
  fontWeight: 800,
  letterSpacing: '-1.5px',
  lineHeight: 1.08,
  color: themeContract.color.text,
  marginBottom: '56px',
  whiteSpace: 'pre-line',
})

/* ─── Shimmer bar ─── */
export const shimmerBar = style({
  height: '2px',
  background: `linear-gradient(90deg, transparent, ${themeContract.color.border}, transparent)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 3s ease-in-out infinite`,
})

/* ─── Patent items ─── */
export const patentItem = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  alignItems: 'center',
  padding: '6rem 0',
  borderBottom: `1px solid ${themeContract.color.border}`,
  selectors: {
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
      padding: '3rem 0',
    },
  },
})

export const patentContent = style({})

export const patentContentReverse = style({
  '@media': {
    '(min-width: 769px)': {
      order: 2,
    },
  },
})

export const patentVisual = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const patentVisualReverse = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    '(min-width: 769px)': {
      order: 1,
    },
  },
})

export const patentBadge = style({
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: themeContract.font.mono,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  padding: '6px 18px',
  borderRadius: '100px',
  backgroundColor: themeContract.color.accent,
  color: themeContract.color.accentText,
  marginBottom: '24px',
  transition: 'background-color 0.3s, color 0.3s',
})

export const patentTitle = style({
  fontSize: 'clamp(28px, 3.5vw, 44px)',
  fontWeight: 800,
  letterSpacing: '-1.5px',
  lineHeight: 1.12,
  color: themeContract.color.text,
  marginBottom: '8px',
})

export const patentSubtitle = style({
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: themeContract.font.mono,
  color: themeContract.color.textMuted,
  marginBottom: '24px',
  letterSpacing: '0.5px',
})

export const patentDesc = style({
  fontSize: '15px',
  color: themeContract.color.textMuted,
  lineHeight: 1.8,
  marginBottom: '28px',
})

export const patentPoints = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '32px',
})

export const patentPoint = style({
  fontSize: '14px',
  color: themeContract.color.text,
  lineHeight: 1.6,
  paddingLeft: '24px',
  position: 'relative',
  '::before': {
    content: '"\\2713"',
    position: 'absolute',
    left: 0,
    fontWeight: 700,
    fontSize: '14px',
    color: themeContract.color.accent,
    transition: 'color 0.3s',
  },
})

export const patentMetricBox = style({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: '10px',
  padding: '16px 24px',
  borderRadius: themeContract.radius.lg,
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
})

export const patentMetricValue = style({
  fontFamily: themeContract.font.mono,
  fontSize: 'clamp(36px, 5vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-2px',
  color: themeContract.color.text,
  lineHeight: 1,
})

export const patentMetricLabel = style({
  fontSize: '14px',
  fontWeight: 600,
  color: themeContract.color.textMuted,
})

/* Patent visual with actual image */
export const patentDiagram = style({
  width: '100%',
  aspectRatio: '4 / 3',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
})

export const patentDiagramImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s ease',
  ':hover': {
    transform: 'scale(1.04)',
  },
})

export const patentDiagramOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 60%)',
  pointerEvents: 'none',
})

export const patentDiagramLabel = style({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  padding: '8px 16px',
  borderRadius: themeContract.radius.md,
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(8px)',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: themeContract.font.mono,
  letterSpacing: '0.5px',
  zIndex: 1,
})

export const patentDiagramFloat = style({
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontFamily: themeContract.font.mono,
  fontWeight: 800,
  fontSize: '18px',
  zIndex: 1,
  animation: `${float} 3s ease-in-out infinite`,
})

/* ─── Comparison table ─── */
export const tableWrap = style({
  overflowX: 'auto',
  borderRadius: '1.5rem',
  border: `1px solid ${themeContract.color.border}`,
  transition: 'border-color 0.3s',
})

export const table = style({
  width: '100%',
  minWidth: '640px',
  borderCollapse: 'collapse',
  fontSize: '14px',
})

export const tableHead = style({
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
})

export const th = style({
  padding: '18px 24px',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.3px',
  color: themeContract.color.text,
  borderBottom: `1px solid ${themeContract.color.border}`,
  whiteSpace: 'nowrap',
})

export const thHighlight = style({
  padding: '18px 24px',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.3px',
  color: themeContract.color.accentText,
  backgroundColor: themeContract.color.accent,
  borderBottom: `1px solid ${themeContract.color.border}`,
  whiteSpace: 'nowrap',
  transition: 'background-color 0.3s, color 0.3s',
})

export const tr = style({
  transition: 'background-color 0.15s',
  ':hover': {
    backgroundColor: themeContract.color.bgSecondary,
  },
})

export const tdFeature = style({
  padding: '16px 24px',
  fontWeight: 600,
  color: themeContract.color.text,
  borderBottom: `1px solid ${themeContract.color.border}`,
  whiteSpace: 'nowrap',
})

export const tdHighlight = style({
  padding: '16px 24px',
  fontWeight: 600,
  color: themeContract.color.text,
  borderBottom: `1px solid ${themeContract.color.border}`,
  backgroundColor: `color-mix(in srgb, ${themeContract.color.accent} 5%, transparent)`,
  transition: 'background-color 0.3s',
})

export const tdMuted = style({
  padding: '16px 24px',
  color: themeContract.color.textMuted,
  borderBottom: `1px solid ${themeContract.color.border}`,
})

/* ─── CTA (with glow) ─── */
export const cta = style({
  position: 'relative',
  padding: '10rem 4rem',
  textAlign: 'center',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      padding: '5rem 1.25rem',
    },
  },
})

export const ctaGlow = style({
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,150,255,0.06) 0%, transparent 70%)',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  animation: `${pulse} 4s ease-in-out infinite`,
  '@media': {
    '(max-width: 768px)': {
      width: '300px',
      height: '300px',
    },
  },
})

export const ctaContent = style({
  position: 'relative',
  zIndex: 1,
})

export const ctaTitle = style({
  fontSize: 'clamp(28px, 4.5vw, 52px)',
  fontWeight: 800,
  letterSpacing: '-1.5px',
  lineHeight: 1.12,
  color: themeContract.color.text,
  marginBottom: '32px',
  whiteSpace: 'pre-line',
})

export const ctaButton = style({
  display: 'inline-block',
  padding: '16px 48px',
  borderRadius: themeContract.radius.md,
  backgroundColor: themeContract.color.accent,
  color: themeContract.color.accentText,
  fontSize: '16px',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.2s, background-color 0.3s, color 0.3s, transform 0.2s',
  ':hover': {
    opacity: 0.85,
    transform: 'translateY(-2px)',
  },
})
