import { useEffect } from 'react'
import { Outlet, useParams, Navigate } from 'react-router-dom'
import { useAppStore } from '@shared/store'
import type { Lang } from '@shared/lib/i18n'

const LOCALE_MAP: Record<string, Lang> = {
  kor: 'ko',
  eng: 'en',
}

export function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const setLang = useAppStore((s) => s.setLang)

  const lang = locale ? LOCALE_MAP[locale] : undefined

  useEffect(() => {
    if (lang) setLang(lang)
  }, [lang, setLang])

  if (!lang) return <Navigate to="/kor" replace />

  return <Outlet />
}
