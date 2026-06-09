import { useState, useEffect, useRef, useMemo } from 'react'
import { gsap, ScrollTrigger } from '@shared/lib/gsap'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import * as styles from './Hero.css'

function useTypingEffect(wordList: string[], speed = 65) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setDisplay('')
    setWordIdx(0)
    setDeleting(false)
    setStarted(false)
    const t = setTimeout(() => setStarted(true), 1800)
    return () => clearTimeout(t)
  }, [wordList])

  useEffect(() => {
    if (!started) return
    const word = wordList[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && display.length < word.length) {
      timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed)
    } else if (!deleting && display.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % wordList.length)
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, wordList, speed, started])

  return display
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  const { lang } = useAppStore()
  const t = getT(lang)
  const words = useMemo(() => [...t.hero.words], [lang])
  const typedText = useTypingEffect(words)

  useEffect(() => {
    const sticky = stickyRef.current
    const imgWrap = imgWrapRef.current
    if (!sticky || !imgWrap) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')

      gsap.set(labelRef.current, { opacity: 0, y: 20 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(metaRef.current, { opacity: 0, y: 20 })

      if (window.innerWidth > 768) {
        gsap.to(imgWrap, {
          width: 'calc(100% - 8rem)',
          borderRadius: '10px',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sticky,
            pin: true,
            start: 'top top',
            end: `+=${window.innerHeight * 2}`,
            scrub: 0.3,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const headlineLines = t.hero.headline.split('\n')

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>

        <div ref={imgWrapRef} className={styles.imgWrap}>
          <video
            src="/images/samples/hero.mp4"
            className={styles.bgImg}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className={styles.content}>
          <span ref={labelRef} className={styles.label}>
            {t.hero.label}
          </span>
          <h1 ref={headlineRef} className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}{i < headlineLines.length - 1 && <br />}
              </span>
            ))}
            {' '}
            {typedText}
            <span className={styles.typingCursor} />
          </h1>
          <div ref={metaRef} className={styles.meta}>
            <p className={styles.metaDesc}>
              {t.hero.desc.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className={styles.scrollIndicator}>
              <span className={styles.scrollLine} />
              <span>{t.hero.scroll}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
