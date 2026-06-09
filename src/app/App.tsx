import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lightTheme, darkTheme } from './styles/theme.css'
import { BlogPage } from '@pages/blog'
import { PostPage } from '@pages/post'
import { useAppStore } from '@shared/store'
import { LocaleLayout } from './LocaleLayout'

export function App() {
  const isDarkMode = useAppStore((s) => s.isDarkMode)
  return (
    <div className={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/kor/blog" replace />} />
          <Route path="/:locale" element={<LocaleLayout />}>
            <Route index element={<Navigate to="blog" replace />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<PostPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/kor/blog" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
