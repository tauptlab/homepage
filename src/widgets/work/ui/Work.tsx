import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@shared/lib/gsap'
import * as styles from './Work.css'

const BASE = 'https://www.kacelab.com/img/main'

const projects = [
  { img: `${BASE}/portfolio1.jpg`, tag: 'E-Commerce', title: 'ShopFlow', desc: '직관적인 쇼핑 경험을 위한 커머스 플랫폼 리디자인' },
  { img: `${BASE}/portfolio2.jpg`, tag: 'Fintech', title: 'PayBridge', desc: '간편하고 안전한 금융 서비스 앱 설계 및 개발' },
  { img: `${BASE}/portfolio3.jpg`, tag: 'Healthcare', title: 'MediCare', desc: '의료 데이터 시각화 대시보드 구축' },
  { img: `${BASE}/portfolio4.jpg`, tag: 'EdTech', title: 'LearnPath', desc: '개인화된 학습 경험을 제공하는 교육 플랫폼' },
  { img: `${BASE}/portfolio5.jpg`, tag: 'PropTech', title: 'HomeView', desc: '부동산 탐색을 위한 인터랙티브 지도 서비스' },
  { img: `${BASE}/portfolio6.jpg`, tag: 'Entertainment', title: 'SoundWave', desc: '음악 스트리밍 서비스 브랜드 리뉴얼 및 UX 개선' },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (window.innerWidth <= 768) return

    const ctx = gsap.context(() => {
      const getScrollLength = () => track.scrollWidth - window.innerWidth

      const st = ScrollTrigger.create({
        trigger: section,
        pin: stickyRef.current,
        start: 'top top',
        end: () => `+=${getScrollLength()}`,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -getScrollLength() * self.progress,
          })
        },
      })

      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.stickyWrap}>
        <div className={styles.sectionTop}>
          <span className={styles.sectionLabel}>Our Work</span>
          <h2 className={styles.sectionTitle}>Selected Projects</h2>
        </div>
        <div className={styles.trackWrapper}>
          <div ref={trackRef} className={styles.track}>
            {projects.map((project) => (
              <div key={project.title} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={project.img} alt={project.title} className={styles.cardImageInner} />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{project.tag}</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
