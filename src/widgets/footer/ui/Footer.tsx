import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import * as styles from './Footer.css'


export function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { locale = 'kor' } = useParams<{ locale: string }>()
  const { lang, isDarkMode } = useAppStore()
  const t = getT(lang)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith('/')) {
      navigate(`/${locale}${href}`)
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span className={styles.footerLogo}>
          <img
            src="/images/taupt_logo_black.png"
            alt="TaupT"
            className={styles.footerLogoImg}
            style={isDarkMode ? { filter: 'invert(1)' } : undefined}
          />
        </span>
        <p className={styles.footerDesc}>{t.footer.desc}</p>
      </div>

      <div className={styles.footerRight}>
        <div className={styles.footerLinks}>
          {t.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.footerLink}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} TaupT. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
