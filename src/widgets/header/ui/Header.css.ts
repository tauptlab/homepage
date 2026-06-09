import { style, keyframes } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${themeContract.space.xl}`,
  height: '64px',
  transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), background-color 0.4s, border-color 0.4s, backdrop-filter 0.4s',
  willChange: 'transform',
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${themeContract.space.md}`,
    },
  },
})

/* 최상단 — 투명 */
export const headerTop = style({
  backgroundColor: 'transparent',
  borderBottom: '1px solid transparent',
})

/* 스크롤됨 — 반투명 + blur */
export const headerScrolled = style({
  backgroundColor: themeContract.color.bg,
  borderBottom: `1px solid ${themeContract.color.border}`,
  backdropFilter: 'blur(12px)',
})

/* 스크롤 다운 시 숨김 */
export const headerHidden = style({
  transform: 'translateY(-100%)',
})

/* -------- Logo -------- */
export const logo = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  flexShrink: 0,
})

export const logoImg = style({
  height: '45px',
  width: 'auto',
  display: 'block',
  transition: 'filter 0.3s',
  // dark mode: invert black logo to white via CSS variable trick
  // handled via logoWhite / logoInvert class
})

export const logoWhite = style({})

export const logoImgWhite = style({
  filter: 'invert(1)',
})

/* -------- Nav -------- */
export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: themeContract.space.xl,
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
})

export const navLink = style({
  fontSize: '14px',
  fontWeight: '400',
  transition: 'color 0.2s',
  color: themeContract.color.textMuted,
  ':hover': {
    color: themeContract.color.text,
  },
})

export const navLinkWhite = style({
  color: 'rgba(255,255,255,0.7)',
  ':hover': {
    color: '#ffffff',
  },
})

/* -------- Actions -------- */
export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: themeContract.space.md,
})

export const darkModeBtn = style({
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  border: `1px solid ${themeContract.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  color: themeContract.color.text,
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: themeContract.color.bgSecondary,
  },
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
})

export const darkModeBtnWhite = style({
  borderColor: 'rgba(255,255,255,0.35)',
  color: '#ffffff',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
})

/* -------- Hamburger -------- */
export const hamburger = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '40px',
  height: '40px',
  alignItems: 'flex-end',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '4px',
})

export const hamburgerInner = style({
  position: 'relative',
  width: '24px',
  height: '14px',
})

export const hamburgerLine = style({
  position: 'absolute',
  left: 0,
  height: '1.5px',
  backgroundColor: themeContract.color.text,
  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s, width 0.3s, background-color 0.3s',
  transformOrigin: 'center',
  borderRadius: '2px',
})

export const hamburgerLineWhite = style({
  backgroundColor: '#ffffff',
})

export const hamburgerLine1 = style({
  top: 0,
  width: '24px',
})

export const hamburgerLine2 = style({
  top: '6px',
  width: '18px',
})

export const hamburgerLine3 = style({
  top: '12px',
  width: '24px',
})

/* Open 상태 — X 모양 */
export const hamburgerLine1Open = style({
  transform: 'translateY(6px) rotate(45deg)',
  width: '24px',
})

export const hamburgerLine2Open = style({
  opacity: 0,
  transform: 'scaleX(0)',
})

export const hamburgerLine3Open = style({
  transform: 'translateY(-6px) rotate(-45deg)',
  width: '24px',
})

/* -------- Full-screen menu overlay -------- */
const slideIn = keyframes({
  '0%': { transform: 'translateX(100%)', opacity: 0 },
  '100%': { transform: 'translateX(0)', opacity: 1 },
})

const slideOut = keyframes({
  '0%': { transform: 'translateX(0)', opacity: 1 },
  '100%': { transform: 'translateX(100%)', opacity: 0 },
})

export const mobileMenu = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: themeContract.color.bg,
  zIndex: 98,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: themeContract.space.xl,
  animation: `${slideIn} 0.4s cubic-bezier(0.4,0,0.2,1) forwards`,
})

export const mobileMenuClosing = style({
  animation: `${slideOut} 0.35s cubic-bezier(0.4,0,0.2,1) forwards`,
})

export const mobileNavList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  marginTop: '10%',
})

export const mobileNavLink = style({
  fontSize: 'clamp(36px, 8vw, 64px)',
  fontWeight: '800',
  color: themeContract.color.text,
  letterSpacing: '-2px',
  lineHeight: '1.15',
  display: 'inline-block',
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 0.4,
  },
})

export const mobileMenuBottom = style({
  marginTop: 'auto',
  paddingTop: themeContract.space.xl,
  borderTop: `1px solid ${themeContract.color.border}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const mobileMenuBottomText = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
})

export const mobileDarkBtn = style({
  fontSize: '13px',
  color: themeContract.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  transition: 'color 0.2s',
  ':hover': {
    color: themeContract.color.text,
  },
})
