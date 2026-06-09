import { useRef, useEffect, useState } from 'react'
import { gsap } from '@shared/lib/gsap'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import * as styles from './About.css'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE = 'https://www.kacelab.com/img/main'

const PARTNER_LOGOS = [
  `${BASE}/ms2_part1.png`,
  `${BASE}/ms2_part2.png`,
  `${BASE}/ms2_part3.png`,
  `${BASE}/ms2_part4.png`,
]

const MEMBER_THUMBS = [
  `/images/samples/about_1.png`,
  `${BASE}/ms2_member_thum2.jpg`,
  `${BASE}/ms2_member_thum3.jpg`,
  `${BASE}/ms2_member_thum4.jpg`,
]

const STACK_CARD_STYLES = [
  { bg: '#141519', color: '#ffffff', img: `${BASE}/ms2_career.jpg` },
  { bg: '#4B4C50', color: '#ffffff', img: `${BASE}/ms2_contact.jpg` },
  { bg: '#BDBEC0', color: '#222222', img: `${BASE}/ms2_counseling.jpg` },
  { bg: 'var(--color-bgSecondary, #f5f5f3)', color: 'var(--color-text, #0d0d0d)', img: `${BASE}/ms2_KSPM.jpg` },
]

const DAYS_KO = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ─── Stacked card height helper ──────────────────────────────────────────────

const getCardHeight = (idx: number, hovered: number | null): string => {
  const defaults = ['100%', '80%', '60%', '40%']
  if (hovered === null) return defaults[idx]
  const map: Record<number, string[]> = {
    0: ['100%', '8.25rem', '4.5rem', '2.25rem'],
    1: ['100%', 'calc(100% - 3.75rem)', '6rem', '2.25rem'],
    2: ['100%', 'calc(100% - 2.25rem)', 'calc(100% - 6rem)', '3.75rem'],
    3: ['100%', 'calc(100% - 2.25rem)', 'calc(100% - 4.5rem)', 'calc(100% - 8.25rem)'],
  }
  return map[hovered][idx]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { isDarkMode, lang, toggleDarkMode } = useAppStore()
  const t = getT(lang)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')

  const DAYS = lang === 'ko' ? DAYS_KO : DAYS_EN

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hh}:${mm}`)
      setDay(DAYS[now.getDay()])
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [DAYS])

  // GSAP scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      if (bottomRef.current) {
        gsap.from(Array.from(bottomRef.current.children), {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const allLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.layout}>

        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftCol} ref={leftRef}>

          {/* left1: floating keyword tags */}
          <div className={styles.left1}>
            {t.about.keywords.map((kw, i) => (
              <span
                key={kw}
                className={styles.keyword}
                style={{
                  animationDuration: `${2.5 + (i % 4) * 0.5}s`,
                  animationDelay: `${(i * 0.3) % 2}s`,
                }}
              >
                {kw}
              </span>
            ))}
          </div>

          {/* left2: dark mode toggle card */}
          <div className={styles.left2} onClick={toggleDarkMode}>
            <div className={styles.left2BgImg} />
            <span className={styles.left2Label}>{t.about.theme}</span>
            <div className={styles.left2Text}>Dark Mode / Light Mode</div>
            <div className={styles.toggleSwitch}>
              <div
                className={`${styles.toggleThumb}${isDarkMode ? ` ${styles.toggleThumbActive}` : ''}`}
              />
            </div>
          </div>

          {/* left3: member card before/after flip */}
          <div className={styles.left3}>
            <div className={styles.left3Before}>
              <div className={styles.left3BeforeOverlay} />
              <div className={styles.left3BeforeContent}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                  {t.about.teamLabel}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>
                  {t.about.teamTitle}
                </div>
              </div>
            </div>

            <div className={styles.left3After}>
              <div className={styles.left3ThumbGrid}>
                {MEMBER_THUMBS.map((src, i) => (
                  <div
                    key={i}
                    className={styles.left3Thumb}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
              </div>
              <div className={styles.left3MemberCount}>{t.about.memberCount}</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={styles.rightCol} ref={rightRef}>

          <div className={styles.ms2Top}>

            <div className={styles.topLeft}>

              <div className={styles.topRow}>

                {/* Work card */}
                <div className={`${styles.linkItem} ${styles.workCard}`}>
                  <div
                    className={styles.bgImg}
                    style={{ backgroundImage: `url(${BASE}/ms2_work.jpg)` }}
                  />
                  <div className={styles.bgImgOverlay} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{t.about.workTitle}</span>
                    <div>
                      <div className={styles.cardNumber}>{t.about.workNumber}</div>
                      <div className={styles.cardTitle}>{t.about.workTitle}</div>
                    </div>
                  </div>
                </div>

                {/* Who We Are card */}
                <div className={styles.whoCard}>
                  <img
                    src={`/images/samples/b.jpg`}
                    alt="Who We Are"
                    className={styles.whoCardImg}
                  />
                  <span className={styles.whoCardLabel}>Who We Are</span>
                </div>
              </div>

              {/* Video card */}
              <div className={styles.videoCard}>
                <img
                  src={`/images/samples/bluegreen.jpg`} 
                  alt="Portfolio"
                  className={styles.videoCardImg}
                />
                <div className={styles.videoCardOverlay} />
              </div>
            </div>

            <div className={styles.topRight}>

              {/* Culture card */}
              <div className={`${styles.linkItem} ${styles.cultureCard}`}>
                <div
                  className={styles.bgImg}
                  style={{ backgroundImage: `url(${BASE}/ms2_ourCulture.jpg)` }}
                />
                <div className={styles.bgImgOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{t.about.cultureTitle}</span>
                  <div>
                    <div className={styles.cardNumber}>{t.about.cultureNumber}</div>
                    <div className={styles.cardTitle}>{t.about.cultureTitle}</div>
                  </div>
                </div>
              </div>

              {/* Stacked cards */}
              <div className={styles.stackedCards}>
                {t.about.stackCards.map((card, i) => (
                  <div
                    key={card.title}
                    className={styles.stackCard}
                    style={{
                      backgroundColor: STACK_CARD_STYLES[i].bg,
                      color: STACK_CARD_STYLES[i].color,
                      height: getCardHeight(i, activeCard),
                      zIndex: i + 1,
                    }}
                    onMouseEnter={() => setActiveCard(i)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div
                      className={`${styles.stackCardBgImg}${activeCard === i ? ` ${styles.stackCardBgImgActive}` : ''}`}
                      style={{ backgroundImage: `url(${STACK_CARD_STYLES[i].img})` }}
                    />
                    <div className={styles.stackCardContent}>
                      <div className={styles.stackCardTitle} style={{ color: STACK_CARD_STYLES[i].color }}>
                        {card.title}
                      </div>
                      <div className={styles.stackCardDesc} style={{ color: STACK_CARD_STYLES[i].color }}>
                        {card.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ms2Bottom */}
          <div className={styles.ms2Bottom} ref={bottomRef}>

            <div className={styles.bottomTime}>
              <div className={styles.clockDay}>{day}</div>
              <div className={styles.clockTime}>{time}</div>
            </div>

            <div className={styles.bottomMarquee}>
              <div className={styles.marqueeTrack}>
                {allLogos.map((src, i) => (
                  <div key={i} className={styles.marqueeItemStyle}>
                    <img src={src} alt={`Partner ${(i % 4) + 1}`} className={styles.marqueeImg} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.bottomDark} onClick={toggleDarkMode}>
              <span className={styles.bottomDarkLabel}>{t.about.theme}</span>
              <span className={styles.bottomDarkIcon}>{isDarkMode ? '☀️' : '🌙'}</span>
              <span className={styles.bottomDarkTitle}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
