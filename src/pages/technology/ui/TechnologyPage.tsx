import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import { gsap } from '@shared/lib/gsap'
import * as s from './TechnologyPage.css'

const PATENT_IMAGES = [
  '/images/samples/about_1.png',
  '/images/samples/화면 캡처 2026-03-31 105354.png',
  '/images/samples/화면 캡처 2026-03-31 105155.png',
]

const PATENT_FLOAT_ICONS = ['AC', 'AU', 'L2']

export function TechnologyPage() {
  const { locale = 'kor' } = useParams<{ locale: string }>()
  const navigate = useNavigate()
  const { lang } = useAppStore()
  const t = getT(lang)

  const patentsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Patent items alternate slide-in
      if (patentsRef.current) {
        const items = patentsRef.current.querySelectorAll('[data-patent]')
        items.forEach((item, i) => {
          const content = item.querySelector('[data-patent-content]')
          const visual = item.querySelector('[data-patent-visual]')
          const fromX = i % 2 === 0 ? -50 : 50

          if (content) {
            gsap.from(content, {
              x: fromX, opacity: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 78%' },
            })
          }
          if (visual) {
            gsap.from(visual, {
              x: -fromX, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 78%' },
            })
          }
        })
      }

      // Table rows stagger
      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('tbody tr')
        gsap.from(rows, {
          x: -25, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: tableRef.current, start: 'top 80%' },
        })
      }

      // CTA fade
      if (ctaRef.current) {
        gsap.from(ctaRef.current.querySelector('[data-cta-inner]')!, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleCTA = () => {
    navigate(`/${locale}`)
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  return (
    <>
      <Header />
      <main className={s.page}>
        {/* ── Hero with background ── */}
        <section className={s.hero}>
          <div className={s.heroBg}>
            <img
              src="/images/samples/3d-render-glassy-greenwebp.webp"
              alt=""
              className={s.heroBgImg}
            />
            <div className={s.heroBgOverlay} />
          </div>
          <div className={s.heroContent}>
            <p className={s.heroLabel}>{t.technology.heroLabel}</p>
            <h1 className={s.heroTitle}>{t.technology.heroTitle}</h1>
            <p className={s.heroDesc}>{t.technology.heroDesc}</p>
          </div>
          <div className={s.heroScrollLine} />
        </section>

        <div className={s.shimmerBar} />

        {/* ── Patents ── */}
        <section className={s.section}>
          <p className={s.sectionLabel}>{t.technology.patentsLabel}</p>
          <h2 className={s.sectionTitle}>{t.technology.patentsTitle}</h2>

          <div ref={patentsRef}>
            {t.technology.patents.map((patent, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={patent.badge} className={s.patentItem} data-patent>
                  <div
                    className={isEven ? s.patentContent : s.patentContentReverse}
                    data-patent-content
                  >
                    <span className={s.patentBadge}>{patent.badge}</span>
                    <h3 className={s.patentTitle}>{patent.title}</h3>
                    <p className={s.patentSubtitle}>{patent.subtitle}</p>
                    <p className={s.patentDesc}>{patent.desc}</p>
                    <ul className={s.patentPoints}>
                      {patent.keyPoints.map((point) => (
                        <li key={point} className={s.patentPoint}>{point}</li>
                      ))}
                    </ul>
                    <div className={s.patentMetricBox}>
                      <span className={s.patentMetricValue}>{patent.metric}</span>
                      <span className={s.patentMetricLabel}>{patent.metricLabel}</span>
                    </div>
                  </div>
                  <div
                    className={isEven ? s.patentVisual : s.patentVisualReverse}
                    data-patent-visual
                  >
                    <div className={s.patentDiagram}>
                      <img
                        src={PATENT_IMAGES[i]}
                        alt={patent.title}
                        className={s.patentDiagramImg}
                      />
                      <div className={s.patentDiagramOverlay} />
                      <span className={s.patentDiagramLabel}>{patent.subtitle}</span>
                      <span className={s.patentDiagramFloat}>{PATENT_FLOAT_ICONS[i]}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <div className={s.shimmerBar} />

        {/* ── Comparison ── */}
        <section className={s.sectionAlt}>
          <p className={s.sectionLabel}>{t.technology.compLabel}</p>
          <h2 className={s.sectionTitle}>{t.technology.compTitle}</h2>

          <div className={s.tableWrap} ref={tableRef}>
            <table className={s.table}>
              <thead className={s.tableHead}>
                <tr>
                  {t.technology.compHeaders.map((h, i) => (
                    <th key={h} className={i === 1 ? s.thHighlight : s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.technology.compRows.map((row) => (
                  <tr key={row.feature} className={s.tr}>
                    <td className={s.tdFeature}>{row.feature}</td>
                    <td className={s.tdHighlight}>{row.taupt}</td>
                    <td className={s.tdMuted}>{row.google}</td>
                    <td className={s.tdMuted}>{row.apple}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={s.cta} ref={ctaRef}>
          <div className={s.ctaGlow} />
          <div className={s.ctaContent} data-cta-inner>
            <h2 className={s.ctaTitle}>{t.technology.ctaTitle}</h2>
            <button className={s.ctaButton} onClick={handleCTA}>{t.technology.ctaButton}</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
