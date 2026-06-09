import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import { gsap } from '@shared/lib/gsap'
import * as s from './ProductsPage.css'

const FEATURE_ICONS = ['AC', 'AU', 'HD', 'SD', 'PB', 'RC']

export function ProductsPage() {
  const { locale = 'kor' } = useParams<{ locale: string }>()
  const navigate = useNavigate()
  const { lang } = useAppStore()
  const t = getT(lang)

  const problemRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const useCasesSectionRef = useRef<HTMLDivElement>(null)
  const useCasesTrackRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Problem section slide-in
      if (problemRef.current) {
        const left = problemRef.current.querySelector('[data-animate="left"]')
        const right = problemRef.current.querySelector('[data-animate="right"]')
        if (left) {
          gsap.from(left, {
            x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: problemRef.current, start: 'top 78%' },
          })
        }
        if (right) {
          gsap.from(right, {
            x: 50, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: problemRef.current, start: 'top 78%' },
          })
        }
      }

      // Feature cards stagger
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 82%' },
        })
      }

      // Use Cases horizontal scroll (desktop only)
      if (useCasesSectionRef.current && useCasesTrackRef.current && window.innerWidth > 768) {
        const track = useCasesTrackRef.current
        const totalWidth = track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: useCasesSectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
      }

      // Metrics count-up
      if (metricsRef.current) {
        const items = metricsRef.current.querySelectorAll('[data-metric-value]')
        items.forEach((el, i) => {
          const target = parseInt(el.getAttribute('data-metric-value') || '0', 10)
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: metricsRef.current, start: 'top 70%' },
            onUpdate() {
              el.textContent = Math.round(obj.val).toString()
            },
          })
        })

        gsap.from(metricsRef.current.children, {
          y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: metricsRef.current, start: 'top 78%' },
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
        {/* ── Hero with background image ── */}
        <section className={s.hero}>
          <div className={s.heroBg}>
            <img
              src="/images/samples/b.jpg"
              alt=""
              className={s.heroBgImg}
            />
            <div className={s.heroBgOverlay} />
          </div>
          <div className={s.heroContent}>
            <p className={s.heroLabel}>{t.products.heroLabel}</p>
            <h1 className={s.heroTitle}>{t.products.heroTitle}</h1>
            <p className={s.heroDesc}>{t.products.heroDesc}</p>
          </div>
          <div className={s.heroScrollLine} />
        </section>

        <div className={s.shimmerBar} />

        {/* ── Problem ── */}
        <section className={s.section} ref={problemRef}>
          <p className={s.sectionLabel}>{t.products.problemLabel}</p>
          <h2 className={s.sectionTitle}>{t.products.problemTitle}</h2>
          <div className={s.problemGrid}>
            <div data-animate="left" className={s.problemLeft}>
              <p className={s.problemDesc}>{t.products.problemDesc}</p>
              <div className={s.problemImage}>
                <img
                  src="/images/samples/화면 캡처 2026-03-31 105354.png"
                  alt="Data privacy shield"
                  className={s.problemImgInner}
                />
              </div>
            </div>
            <div data-animate="right" className={s.problemCards}>
              {t.products.problemCases.map((c) => (
                <div key={c.title} className={s.problemCard}>
                  <span className={s.problemCardYear}>{c.year}</span>
                  <p className={s.problemCardTitle}>{c.title}</p>
                  <p className={s.problemCardDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={s.shimmerBar} />

        {/* ── Features ── */}
        <section className={s.sectionAlt}>
          <p className={s.sectionLabel}>{t.products.featuresLabel}</p>
          <h2 className={s.sectionTitle}>{t.products.featuresTitle}</h2>
          <div className={s.featuresGrid} ref={featuresRef}>
            {t.products.features.map((f, i) => (
              <div key={f.title} className={s.featureCard}>
                <div className={s.featureIcon}>{FEATURE_ICONS[i]}</div>
                <h3 className={s.featureTitle}>{f.title}</h3>
                <p className={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Use Cases (horizontal scroll) ── */}
        <section className={s.useCasesSection} ref={useCasesSectionRef}>
          <div className={s.useCasesStickyWrap}>
            <div className={s.useCasesTop}>
              <p className={s.sectionLabel}>{t.products.useCasesLabel}</p>
              <h2 className={s.sectionTitle} style={{ marginBottom: 0 }}>{t.products.useCasesTitle}</h2>
            </div>
            <div className={s.useCasesTrackWrapper}>
              <div className={s.useCasesTrack} ref={useCasesTrackRef}>
                {t.products.useCases.map((uc) => (
                  <div key={uc.industry} className={s.useCaseCard}>
                    <div className={s.useCaseCardTop}>
                      <span className={s.useCaseIndustry}>{uc.industry}</span>
                      <h3 className={s.useCaseTitle}>{uc.title}</h3>
                    </div>
                    <div className={s.useCaseDivider} />
                    <div className={s.useCaseCardBottom}>
                      <ul className={s.useCasePoints}>
                        {uc.points.map((p) => (
                          <li key={p} className={s.useCasePoint}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Metrics (background image section) ── */}
        <section className={s.metricsSection}>
          <div className={s.metricsBg}>
            <img
              src="/images/samples/bluegreen.jpg"
              alt=""
              className={s.metricsBgImg}
            />
            <div className={s.metricsBgOverlay} />
          </div>
          <div className={s.metricsContent}>
            <p className={s.metricsLabel}>{t.products.metricsLabel}</p>
            <div className={s.metricsGrid} ref={metricsRef}>
              {t.products.metrics.map((m) => (
                <div key={m.label} className={s.metricItem}>
                  <div className={s.metricValue}>
                    <span data-metric-value={m.value}>0</span>{m.suffix}
                  </div>
                  <p className={s.metricLabel}>{m.label}</p>
                  <p className={s.metricDesc}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={s.cta} ref={ctaRef}>
          <div className={s.ctaGlow} />
          <div className={s.ctaContent} data-cta-inner>
            <h2 className={s.ctaTitle}>{t.products.ctaTitle}</h2>
            <button className={s.ctaButton} onClick={handleCTA}>{t.products.ctaButton}</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
