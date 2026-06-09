import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { getT } from '@shared/lib/i18n';
import { useAppStore } from '@shared/store';

import * as styles from './Header.css';

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { locale = 'kor' } = useParams<{ locale: string }>()
  const { isMenuOpen, isDarkMode, lang, toggleMenu, toggleDarkMode } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [closing, setClosing] = useState(false)
  const lastY = useRef(0)

  const t = getT(lang)

  const navLinks = [
    { label: t.nav.products, href: `/${locale}/products` },
    { label: t.nav.technology, href: `/${locale}/technology` },
    { label: t.nav.blog, href: `/${locale}/blog` },
  ]

  const handleToggleLang = () => {
    const newLocale = locale === 'kor' ? 'eng' : 'kor'
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`)
    navigate(newPath)
  }

  // Scroll-based header state
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > lastY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCloseMenu = () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      toggleMenu()
    }, 330)
  }

  const handleNavClick = (href: string) => {
    if (isMenuOpen) handleCloseMenu()
    if (href.startsWith('/')) {
      setTimeout(() => navigate(href), isMenuOpen ? 360 : 0)
      return
    }
    const homePath = `/${locale}`
    if (location.pathname !== homePath) {
      navigate(homePath)
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
      return
    }
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, isMenuOpen ? 360 : 0)
  }

  const atTop = !scrolled && isDarkMode

  const headerClass = [
    styles.header,
    scrolled ? styles.headerScrolled : styles.headerTop,
    hidden && !isMenuOpen ? styles.headerHidden : '',
  ].join(' ')

  return (
    <>
      <header className={headerClass}>
        <a
          href="/"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); location.pathname === `/${locale}` ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate(`/${locale}`) }}
        >
          <img
            src="/images/taupt_logo_black.png"
            alt="TaupT"
            className={`${styles.logoImg}${atTop || isDarkMode ? ` ${styles.logoImgWhite}` : ''}`}
          />
        </a>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${atTop ? styles.navLinkWhite : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Language toggle */}
          <button
            className={`${styles.darkModeBtn} ${atTop ? styles.darkModeBtnWhite : ''}`}
            onClick={handleToggleLang}
            aria-label="Toggle language"
            style={{ fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}
          >
            {lang === 'ko' ? 'EN' : 'KO'}
          </button>

          {/* Dark mode toggle */}
          <button
            className={`${styles.darkModeBtn} ${atTop ? styles.darkModeBtnWhite : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Hamburger / X */}
          <button
            className={styles.hamburger}
            onClick={isMenuOpen ? handleCloseMenu : toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburgerInner}>
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine1,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine1Open : '',
              ].join(' ')} />
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine2,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine2Open : '',
              ].join(' ')} />
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine3,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine3Open : '',
              ].join(' ')} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {(isMenuOpen || closing) && (
        <nav className={`${styles.mobileMenu} ${closing ? styles.mobileMenuClosing : ''}`}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link, i) => (
              <li key={link.label} style={{ animationDelay: `${i * 60}ms` }}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileMenuBottom}>
            <span className={styles.mobileMenuBottomText}>TaupT © {new Date().getFullYear()}</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className={styles.mobileDarkBtn} onClick={handleToggleLang}>
                {lang === 'ko' ? '🌐 English' : '🌐 한국어'}
              </button>
              <button className={styles.mobileDarkBtn} onClick={toggleDarkMode}>
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
