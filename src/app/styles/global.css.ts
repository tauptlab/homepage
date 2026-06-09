import { globalStyle } from '@vanilla-extract/css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
})

globalStyle(':root', {
  fontFamily: "'Pretendard', system-ui, sans-serif",
  lineHeight: '1.5',
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  scrollBehavior: 'smooth',
})

globalStyle('body', {
  minHeight: '100vh',
})

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
})

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  font: 'inherit',
})

globalStyle('ul, ol', {
  listStyle: 'none',
})

globalStyle('img', {
  maxWidth: '100%',
  display: 'block',
})
