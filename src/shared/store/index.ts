import { create } from 'zustand'
import type { Lang } from '@shared/lib/i18n'

interface AppState {
  isMenuOpen: boolean
  isDarkMode: boolean
  lang: Lang
  toggleMenu: () => void
  toggleDarkMode: () => void
  setLang: (lang: Lang) => void
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isDarkMode: false,
  lang: 'ko',
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLang: (lang) => set({ lang }),
}))
