import { useRef, useEffect } from 'react'
import { gsap } from '@shared/lib/gsap'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import * as styles from './Contact.css'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLFormElement>(null)

  const { lang } = useAppStore()
  const t = getT(lang)
  const tc = t.contact

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const titleLines = tc.title.split('\n')

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div ref={leftRef} className={styles.leftCol}>
          <div>
            <p className={styles.sectionLabel}>{tc.label}</p>
            <h2 className={styles.sectionTitle}>
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>{tc.emailLabel}</span>
              <span className={styles.contactItemValue}>hello@taupt.io</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>{tc.phoneLabel}</span>
              <span className={styles.contactItemValue}>+82 02-0000-0000</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>{tc.addressLabel}</span>
              <span className={styles.contactItemValue}>서울특별시 강남구</span>
            </div>
          </div>
        </div>

        <form ref={rightRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{tc.nameField}</label>
              <input className={styles.input} type="text" placeholder={tc.namePlaceholder} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{tc.phoneField}</label>
              <input className={styles.input} type="tel" placeholder={tc.phonePlaceholder} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{tc.emailField}</label>
            <input className={styles.input} type="email" placeholder={tc.emailPlaceholder} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{tc.typeField}</label>
            <input className={styles.input} type="text" placeholder={tc.typePlaceholder} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{tc.messageField}</label>
            <textarea className={styles.textarea} placeholder={tc.messagePlaceholder} />
          </div>
          <button type="submit" className={styles.submitBtn}>{tc.submit}</button>
        </form>
      </div>
    </section>
  )
}
