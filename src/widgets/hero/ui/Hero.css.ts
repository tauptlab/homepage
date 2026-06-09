import { style, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

const cursorBlink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
})

/* ─── 외부 섹션 ─── */
export const section = style({
  position: 'relative',
})

/* ─── 핀되는 100vh 컨테이너 ─── */
export const sticky = style({
  height: '100vh',
  backgroundColor: themeContract.color.bg,
  transition: 'background-color 0.3s',
  position: 'relative',
  overflow: 'hidden',
})

/* ─── 이미지 카드 ─── */
export const imgWrap = style({
  position: 'absolute',
  right: '4rem',
  top: '64px',
  width: 'calc((100% - 8rem) / 2)',
  height: 'calc(100vh - 64px - 2rem)',
  borderRadius: '40px',
  overflow: 'hidden',
  zIndex: 1,
  willChange: 'width, border-radius',
  '@media': {
    '(max-width: 768px)': {
      right: '1rem',
      left: '1rem',
      width: 'auto',
      top: '64px',
      height: '55vh',
      borderRadius: '12px',
    },
  },
})

export const bgImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 20%',
  display: 'block',
  filter: 'brightness(0.5)',
})

/* ─── 텍스트 콘텐츠 ─── */
export const content = style({
  position: 'absolute',
  bottom: '3rem',
  left: '4rem',
  zIndex: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '40vw',
  '@media': {
    '(max-width: 768px)': {
      left: '1.25rem',
      right: '1.25rem',
      bottom: '2rem',
      maxWidth: '100%',
    },
  },
})

export const label = style({
  fontSize: '12px',
  fontWeight: '500',
  color: themeContract.color.textMuted,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  opacity: 0,
})

export const headline = style({
  fontSize: 'clamp(44px, 7.5vw, 110px)',
  fontWeight: '800',
  lineHeight: '1.0',
  letterSpacing: '-3px',
  color: themeContract.color.text,
  opacity: 0,
  '@media': {
    '(max-width: 768px)': {
      fontSize: 'clamp(36px, 10vw, 56px)',
      letterSpacing: '-1.5px',
    },
  },
})

export const typingCursor = style({
  display: 'inline-block',
  width: '3px',
  height: '0.82em',
  backgroundColor: themeContract.color.text,
  marginLeft: '4px',
  verticalAlign: 'middle',
  animation: `${cursorBlink} 0.9s step-end infinite`,
})

export const meta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  borderTop: `1px solid ${themeContract.color.border}`,
  paddingTop: '20px',
  opacity: 0,
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    },
  },
})

export const metaDesc = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  lineHeight: '1.7',
})

export const scrollIndicator = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '12px',
  color: themeContract.color.textMuted,
  whiteSpace: 'nowrap',
})

export const scrollLine = style({
  width: '36px',
  height: '1px',
  backgroundColor: themeContract.color.border,
})
