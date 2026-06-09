import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lightTheme, darkTheme } from './styles/theme.css'
import { HomePage } from '@pages/home'
import { BlogPage } from '@pages/blog'
import { PostPage } from '@pages/post'
import { ProductsPage } from '@pages/products'
import { TechnologyPage } from '@pages/technology'
import { useAppStore } from '@shared/store'
import { LocaleLayout } from './LocaleLayout'

export function App() {
  const isDarkMode = useAppStore((s) => s.isDarkMode)
  return (
    <div className={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/kor" replace />} />
          <Route path="/:locale" element={<LocaleLayout />}>
            <Route index element={<HomePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<PostPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="technology" element={<TechnologyPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/kor" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
