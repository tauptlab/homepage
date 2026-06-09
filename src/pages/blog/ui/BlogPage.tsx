import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gsap } from '@shared/lib/gsap'
import { getAllPosts, getAllCategories, type PostMeta } from '@shared/lib/posts'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import * as styles from './BlogPage.css'

function formatDate(dateStr: string, lang: 'ko' | 'en'): string {
  const d = new Date(dateStr)
  return lang === 'ko'
    ? d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogPage() {
  const navigate = useNavigate()
  const { locale = 'kor' } = useParams<{ locale: string }>()
  const { lang } = useAppStore()
  const t = getT(lang)
  const [activeCategory, setActiveCategory] = useState<string>(t.blog.allCategory)
  const gridRef = useRef<HTMLDivElement>(null)

  const allPosts = getAllPosts(lang)
  const categories = [t.blog.allCategory, ...getAllCategories(lang)]

  // Reset category filter when language changes
  useEffect(() => {
    setActiveCategory(t.blog.allCategory)
  }, [lang, t.blog.allCategory])

  const filtered = activeCategory === t.blog.allCategory
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(Array.from(gridRef.current!.children), {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'all',
      })
    }, gridRef)
    return () => ctx.revert()
  }, [activeCategory, lang])

  const goPost = (slug: string) => navigate(`/${locale}/blog/${slug}`)

  const titleLines = t.blog.title.split('\n')

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <p className={styles.heroLabel}>{t.blog.label}</p>
        <h1 className={styles.heroTitle}>
          {titleLines.map((line, i) => (
            <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
          ))}
        </h1>
        <p className={styles.heroDesc}>{t.blog.desc}</p>
      </div>

      <div className={styles.body}>
        {/* Category filter */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn}${activeCategory === cat ? ` ${styles.filterBtnActive}` : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>{t.blog.empty}</div>
        )}

        {/* Featured post */}
        {featured && (
          <div className={styles.featured} onClick={() => goPost(featured.slug)}>
            <div className={styles.featuredImgWrap}>
              <img src={featured.thumbnail} alt={featured.title} className={styles.featuredImg} />
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.featuredCategory}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.featuredMeta}>
                <span>{featured.author}</span>
                <span className={styles.metaDot} />
                <span>{formatDate(featured.date, lang)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className={styles.grid} ref={gridRef}>
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} onClick={() => goPost(post.slug)} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function PostCard({ post, lang, onClick }: { post: PostMeta; lang: 'ko' | 'en'; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardImgWrap}>
        <img src={post.thumbnail} alt={post.title} className={styles.cardImg} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{post.category}</span>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardDesc}>{post.description}</p>
        <div className={styles.cardMeta}>
          <span>{post.author}</span>
          <span className={styles.metaDot} />
          <span>{formatDate(post.date, lang)}</span>
        </div>
      </div>
    </div>
  )
}
