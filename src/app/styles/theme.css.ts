import {
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css';

export const themeContract = createThemeContract({
  color: {
    bg: null,
    bgSecondary: null,
    text: null,
    textMuted: null,
    border: null,
    accent: null,
    accentText: null,
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
  },
  font: {
    body: null,
    mono: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
})

export const lightTheme = createTheme(themeContract, {
  color: {
    bg: '#ffffff',
    bgSecondary: '#f5f5f3',
    text: '#0d0d0d',
    textMuted: '#6b6b6b',
    border: '#e5e5e5',
    accent: '#0d0d0d',
    accentText: '#ffffff',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    xxl: '96px',
  },
  font: {
    body: "'Pretendard', system-ui, sans-serif",
    mono: "'Pretendard', 'Courier New', monospace",
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
})

export const darkTheme = createTheme(themeContract, {
  color: {
    bg: '#0d0d0d',
    bgSecondary: '#1a1a1a',
    text: '#f5f5f3',
    textMuted: '#888888',
    border: '#2a2a2a',
    accent: '#f5f5f3',
    accentText: '#0d0d0d',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    xxl: '96px',
  },
  font: {
    body: "'Pretendard', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
})
