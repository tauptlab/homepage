import { style, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

const BOX_WIDTH = '26.875rem'
const GAP = '1.5rem'

// ─── Keyframes ───────────────────────────────────────────────────────────────

export const marqueeAnim = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-50%)' },
})

export const floatAnim = keyframes({
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-8px)' },
  '100%': { transform: 'translateY(0px)' },
})

// ─── Root Section ────────────────────────────────────────────────────────────

export const section = style({
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  padding: '6rem 3rem',
  '@media': {
    '(max-width: 1024px)': {
      padding: '4rem 1.5rem',
    },
  },
})

// ─── Main layout: left col + right col ───────────────────────────────────────

export const layout = style({
  display: 'flex',
  gap: GAP,
  alignItems: 'flex-start',
  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
})

// ─── LEFT COLUMN ─────────────────────────────────────────────────────────────

export const leftCol = style({
  width: BOX_WIDTH,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: GAP,
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
    },
  },
})

// left1: keyword tags
export const left1 = style({
  height: '24.75rem',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  padding: '1.875rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignContent: 'flex-start',
})

export const keyword = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.5rem 1.25rem',
  borderRadius: '9999px',
  border: `1px solid ${themeContract.color.border}`,
  fontSize: '0.875rem',
  fontWeight: '500',
  color: themeContract.color.text,
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s, color 0.3s',
  cursor: 'default',
  animationName: floatAnim,
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
})

// left2: dark mode card — parent defined FIRST
export const left2 = style({
  height: '13.25rem',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  padding: '1.875rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  cursor: 'pointer',
})

export const left2BgImg = style({
  position: 'absolute',
  inset: 0,
  backgroundImage: 'url(/images/samples/3d-render-glassy-greenwebp.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0,
  transition: 'opacity 0.4s',
  selectors: {
    [`${left2}:hover &`]: {
      opacity: 1,
    },
  },
})

export const left2Text = style({
  position: 'relative',
  zIndex: 1,
  fontSize: '1rem',
  fontWeight: '600',
  color: themeContract.color.text,
  transition: 'color 0.3s',
  selectors: {
    [`${left2}:hover &`]: {
      color: '#ffffff',
    },
  },
})

export const left2Label = style({
  position: 'relative',
  zIndex: 1,
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  transition: 'color 0.3s',
  selectors: {
    [`${left2}:hover &`]: {
      color: 'rgba(255,255,255,0.7)',
    },
  },
})

export const toggleSwitch = style({
  position: 'relative',
  zIndex: 1,
  width: '3.5rem',
  height: '1.75rem',
  borderRadius: '9999px',
  backgroundColor: themeContract.color.border,
  transition: 'background-color 0.3s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem',
})

export const toggleThumb = style({
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s',
  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
})

export const toggleThumbActive = style({
  transform: 'translateX(1.75rem)',
})

// left3: member card — parent defined FIRST
export const left3 = style({
  height: '38.125rem',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
})

export const left3Before = style({
  position: 'absolute',
  inset: 0,
  backgroundImage: 'url(/images/samples/about_1.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 1,
  transition: 'opacity 0.5s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '1.875rem',
  selectors: {
    [`${left3}:hover &`]: {
      opacity: 0,
    },
  },
})

export const left3BeforeOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
})

export const left3BeforeContent = style({
  position: 'relative',
  zIndex: 1,
})

export const left3After = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: themeContract.color.bgSecondary,
  opacity: 0,
  transition: 'opacity 0.5s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1.875rem',
  selectors: {
    [`${left3}:hover &`]: {
      opacity: 1,
    },
  },
})

export const left3ThumbGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.75rem',
  flex: 1,
})

export const left3Thumb = style({
  borderRadius: '1rem',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

export const left3MemberCount = style({
  fontSize: '2rem',
  fontWeight: '700',
  color: themeContract.color.text,
  marginTop: '1rem',
})

// ─── RIGHT COLUMN ─────────────────────────────────────────────────────────────

export const rightCol = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: GAP,
})

export const ms2Top = style({
  display: 'flex',
  gap: GAP,
  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
})

export const topLeft = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: GAP,
})

export const topRight = style({
  width: BOX_WIDTH,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: GAP,
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
    },
  },
})

// topRow: Work card + Who We Are card
export const topRow = style({
  height: '24.75rem',
  display: 'flex',
  gap: GAP,
})

// linkItem: parent defined FIRST — used for hover selector in bgImg
export const linkItem = style({
  position: 'relative',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  padding: '1.875rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  cursor: 'pointer',
  textDecoration: 'none',
})

export const bgImg = style({
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0,
  transition: 'opacity 0.4s',
  selectors: {
    [`${linkItem}:hover &`]: {
      opacity: 1,
    },
  },
})

export const bgImgOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0,0,0,0.3)',
  opacity: 0,
  transition: 'opacity 0.4s',
  selectors: {
    [`${linkItem}:hover &`]: {
      opacity: 1,
    },
  },
})

export const cardContent = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
})

export const cardNumber = style({
  fontSize: '3.5rem',
  fontWeight: '800',
  letterSpacing: '-2px',
  color: themeContract.color.text,
  lineHeight: 1,
  transition: 'color 0.3s',
  selectors: {
    [`${linkItem}:hover &`]: {
      color: '#ffffff',
    },
  },
})

export const cardLabel = style({
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: themeContract.color.textMuted,
  transition: 'color 0.3s',
  selectors: {
    [`${linkItem}:hover &`]: {
      color: 'rgba(255,255,255,0.8)',
    },
  },
})

export const cardTitle = style({
  fontSize: '1.25rem',
  fontWeight: '700',
  color: themeContract.color.text,
  transition: 'color 0.3s',
  selectors: {
    [`${linkItem}:hover &`]: {
      color: '#ffffff',
    },
  },
})

// Work card
export const workCard = style([linkItem, {
  flex: 1,
  height: '100%',
}])

// Who We Are card
export const whoCard = style({
  width: '16.125rem',
  height: '100%',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
})

export const whoCardImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
})

export const whoCardLabel = style({
  position: 'absolute',
  bottom: '1.875rem',
  left: '1.875rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#ffffff',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  background: 'rgba(0,0,0,0.4)',
  borderRadius: '0.5rem',
  padding: '0.25rem 0.75rem',
})

// Video card
export const videoCard = style({
  height: '35.25rem',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  position: 'relative',
})

export const videoCardImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
})

export const videoCardOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: '#9fd3c7',
  mixBlendMode: 'multiply',
  opacity: 0.7,
})

// Culture card
export const cultureCard = style([linkItem, {
  height: '16.125rem',
}])

// Stacked cards
export const stackedCards = style({
  height: '44rem',
  position: 'relative',
})

export const stackCard = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: '1.5rem',
  overflow: 'hidden',
  transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '1.875rem',
})

export const stackCardBgImg = style({
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0,
  transition: 'opacity 0.4s',
})

export const stackCardBgImgActive = style({
  opacity: 1,
})

export const stackCardContent = style({
  position: 'relative',
  zIndex: 1,
})

export const stackCardTitle = style({
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: 1.2,
})

export const stackCardDesc = style({
  fontSize: '0.875rem',
  marginTop: '0.375rem',
  opacity: 0.7,
})

// ─── BOTTOM ROW ───────────────────────────────────────────────────────────────

export const ms2Bottom = style({
  height: '16.125rem',
  display: 'flex',
  gap: GAP,
  '@media': {
    '(max-width: 1024px)': {
      height: 'auto',
      flexDirection: 'column',
    },
  },
})

// Clock widget
export const bottomTime = style({
  width: '16.125rem',
  flexShrink: 0,
  borderRadius: '1.5rem',
  overflow: 'hidden',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  padding: '1.875rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
      height: '16.125rem',
    },
  },
})

export const clockTime = style({
  fontSize: '3rem',
  fontWeight: '800',
  letterSpacing: '-2px',
  color: themeContract.color.text,
  fontFamily: themeContract.font.mono,
  lineHeight: 1,
})

export const clockDay = style({
  fontSize: '0.875rem',
  color: themeContract.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
})

// Marquee
export const bottomMarquee = style({
  flex: 1,
  borderRadius: '1.5rem',
  overflow: 'hidden',
  backgroundColor: themeContract.color.bgSecondary,
  transition: 'background-color 0.3s',
  display: 'flex',
  alignItems: 'center',
})

export const marqueeTrack = style({
  display: 'flex',
  alignItems: 'center',
  width: 'max-content',
  animationName: marqueeAnim,
  animationDuration: '20s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

export const marqueeItemStyle = style({
  padding: '0 2rem',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

export const marqueeImg = style({
  height: '2rem',
  width: 'auto',
  objectFit: 'contain',
  filter: 'grayscale(1)',
  opacity: 0.5,
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 0.9,
  },
})

// Dark mode bottom card
export const bottomDark = style({
  width: '16.125rem',
  flexShrink: 0,
  borderRadius: '1.5rem',
  overflow: 'hidden',
  backgroundColor: themeContract.color.accent,
  padding: '1.875rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'transform 0.2s, background-color 0.3s',
  ':hover': {
    transform: 'scale(1.02)',
  },
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
      height: '16.125rem',
    },
  },
})

export const bottomDarkLabel = style({
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: themeContract.color.accentText,
  opacity: 0.6,
})

export const bottomDarkTitle = style({
  fontSize: '1.25rem',
  fontWeight: '700',
  color: themeContract.color.accentText,
})

export const bottomDarkIcon = style({
  fontSize: '2rem',
})

// ─── Shared text styles ───────────────────────────────────────────────────────

export const cardTitleWhite = style({
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#ffffff',
})

export const cardLabelWhite = style({
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)',
})
