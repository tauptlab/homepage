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

/* ─── Page ─── */
export const page = style({
  minHeight: '100vh',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  overflowX: 'hidden',
})

/* ─── Hero (full-width with background image) ─── */
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
  opacity: 0.18,
  filter: 'blur(1px)',
  transition: 'opacity 0.3s',
})

export const heroBgOverlay = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(180deg, ${themeContract.color.bg} 0%, transparent 30%, transparent 70%, ${themeContract.color.bg} 100%)`,
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
  maxWidth: '560px',
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

/* ─── Problem section ─── */
export const problemGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
  alignItems: 'start',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
  },
})

export const problemLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
})

export const problemDesc = style({
  fontSize: '16px',
  color: themeContract.color.textMuted,
  lineHeight: 1.8,
})

export const problemImage = style({
  width: '100%',
  borderRadius: themeContract.radius.lg,
  overflow: 'hidden',
  aspectRatio: '16 / 10',
  position: 'relative',
})

export const problemImgInner = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  filter: 'brightness(0.7)',
  transition: 'transform 0.6s ease',
  ':hover': {
    transform: 'scale(1.03)',
  },
})

export const problemCards = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.space.md,
})

export const problemCard = style({
  padding: '28px',
  borderRadius: themeContract.radius.lg,
  backgroundColor: themeContract.color.bgSecondary,
  border: `1px solid ${themeContract.color.border}`,
  transition: 'background-color 0.3s, border-color 0.2s, transform 0.3s',
  ':hover': {
    transform: 'translateY(-3px)',
    borderColor: themeContract.color.text,
  },
})

export const problemCardYear = style({
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: themeContract.font.mono,
  letterSpacing: '1px',
  color: themeContract.color.accentText,
  backgroundColor: themeContract.color.accent,
  padding: '3px 10px',
  borderRadius: '100px',
  marginBottom: '12px',
  transition: 'background-color 0.3s, color 0.3s',
})

export const problemCardTitle = style({
  fontSize: '18px',
  fontWeight: 700,
  color: themeContract.color.text,
  marginBottom: '8px',
  letterSpacing: '-0.3px',
})

export const problemCardDesc = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  lineHeight: 1.7,
})

/* ─── Features grid ─── */
export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const featureCard = style({
  padding: '36px',
  borderRadius: '1.5rem',
  backgroundColor: themeContract.color.bgSecondary,
  border: `1px solid transparent`,
  transition: 'background-color 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s',
  ':hover': {
    transform: 'translateY(-6px)',
    borderColor: themeContract.color.border,
  },
})

export const featureIcon = style({
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  backgroundColor: themeContract.color.accent,
  color: themeContract.color.accentText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 800,
  fontFamily: themeContract.font.mono,
  marginBottom: '24px',
  transition: 'background-color 0.3s, color 0.3s',
})

export const featureTitle = style({
  fontSize: '19px',
  fontWeight: 700,
  color: themeContract.color.text,
  marginBottom: '12px',
  letterSpacing: '-0.3px',
})

export const featureDesc = style({
  fontSize: '14px',
  color: themeContract.color.textMuted,
  lineHeight: 1.75,
})

/* ─── Use Cases (horizontal scroll) ─── */
export const useCasesSection = style({
  position: 'relative',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  overflow: 'hidden',
})

export const useCasesStickyWrap = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      height: 'auto',
      paddingTop: '0',
    },
  },
})

export const useCasesTop = style({
  padding: `${themeContract.space.xl} 4rem ${themeContract.space.lg}`,
  flexShrink: 0,
  '@media': {
    '(max-width: 768px)': {
      padding: `${themeContract.space.xl} 1.25rem ${themeContract.space.lg}`,
    },
  },
})

export const useCasesTrackWrapper = style({
  flex: 1,
  overflow: 'visible',
  display: 'flex',
  alignItems: 'center',
  '@media': {
    '(max-width: 768px)': {
      display: 'block',
      overflow: 'visible',
    },
  },
})

export const useCasesTrack = style({
  display: 'flex',
  gap: '20px',
  paddingLeft: '4rem',
  paddingRight: '4rem',
  width: 'max-content',
  willChange: 'transform',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      width: '100%',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingBottom: themeContract.space.xl,
    },
  },
})

export const useCaseCard = style({
  width: 'clamp(320px, 32vw, 440px)',
  flexShrink: 0,
  borderRadius: '1.5rem',
  backgroundColor: themeContract.color.bgSecondary,
  border: `1px solid ${themeContract.color.border}`,
  overflow: 'hidden',
  transition: 'border-color 0.2s, transform 0.3s',
  ':hover': {
    borderColor: themeContract.color.text,
    transform: 'translateY(-4px)',
  },
  '@media': {
    '(max-width: 768px)': {
      width: '100%',
    },
  },
})

export const useCaseCardTop = style({
  padding: '36px 36px 0',
})

export const useCaseCardBottom = style({
  padding: '24px 36px 36px',
})

export const useCaseIndustry = style({
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: themeContract.color.accentText,
  backgroundColor: themeContract.color.accent,
  padding: '5px 14px',
  borderRadius: '100px',
  marginBottom: '20px',
  transition: 'background-color 0.3s, color 0.3s',
})

export const useCaseTitle = style({
  fontSize: '24px',
  fontWeight: 800,
  color: themeContract.color.text,
  letterSpacing: '-0.5px',
  marginBottom: '8px',
  lineHeight: 1.2,
})

export const useCaseDivider = style({
  width: '100%',
  height: '1px',
  backgroundColor: themeContract.color.border,
  transition: 'background-color 0.3s',
})

export const useCasePoints = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const useCasePoint = style({
  fontSize: '14px',
  color: themeContract.color.textMuted,
  lineHeight: 1.6,
  paddingLeft: '18px',
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '8px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: themeContract.color.accent,
    transition: 'background-color 0.3s',
  },
})

/* ─── Metrics (inverted section with bg image) ─── */
export const metricsSection = style({
  position: 'relative',
  padding: '10rem 4rem',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      padding: '5rem 1.25rem',
    },
  },
})

export const metricsBg = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
})

export const metricsBgImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
})

export const metricsBgOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const metricsContent = style({
  position: 'relative',
  zIndex: 1,
})

export const metricsLabel = style({
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '56px',
  textAlign: 'center',
})

export const metricsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: themeContract.space.xl,
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '48px',
    },
  },
})

export const metricItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  textAlign: 'center',
})

export const metricValue = style({
  fontFamily: themeContract.font.mono,
  fontSize: 'clamp(56px, 9vw, 96px)',
  fontWeight: 800,
  letterSpacing: '-4px',
  lineHeight: 1,
  color: '#ffffff',
})

export const metricLabel = style({
  fontSize: '17px',
  fontWeight: 700,
  letterSpacing: '-0.3px',
  color: '#ffffff',
})

export const metricDesc = style({
  fontSize: '13px',
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.6,
  maxWidth: '260px',
})

/* ─── CTA ─── */
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
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,200,120,0.08) 0%, transparent 70%)',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
  animation: `${pulse} 4s ease-in-out infinite`,
  '@media': {
    '(max-width: 768px)': {
      width: '250px',
      height: '250px',
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

/* ─── Shimmer bar (decorative) ─── */
export const shimmerBar = style({
  height: '2px',
  background: `linear-gradient(90deg, transparent, ${themeContract.color.border}, transparent)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 3s ease-in-out infinite`,
})
