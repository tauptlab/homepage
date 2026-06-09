import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gsap } from '@shared/lib/gsap'
import { getPostBySlug, getAllPosts, type PostMeta } from '@shared/lib/posts'
import { useAppStore } from '@shared/store'
import { getT } from '@shared/lib/i18n'
import { Header } from '@widgets/header'
import * as styles from './PostPage.css'

function formatDate(dateStr: string, lang: 'ko' | 'en'): string {
  const d = new Date(dateStr)
  return lang === 'ko'
    ? d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function PostPage() {
  const { slug, locale = 'kor' } = useParams<{ slug: string; locale: string }>()
  const navigate = useNavigate()
  const { lang } = useAppStore()
  const t = getT(lang)
  const proseRef = useRef<HTMLDivElement>(null)

  const post = slug ? getPostBySlug(slug, lang) : undefined
  const allPosts = getAllPosts(lang)
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug, lang])

  useEffect(() => {
    if (!proseRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(proseRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      })
    })
    return () => ctx.revert()
  }, [slug, lang])

  if (!post) {
    return (
      <div className={styles.page}>
        <Header />
        <div style={{ paddingTop: '140px', paddingLeft: '4rem', color: 'var(--color-textMuted)' }}>
          {lang === 'ko' ? '포스트를 찾을 수 없습니다.' : 'Post not found.'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <button className={styles.backBtn} onClick={() => navigate(`/${locale}/blog`)}>
          {t.blog.back}
        </button>

        <div className={styles.heroMeta}>
          <span className={styles.categoryBadge}>{post.category}</span>
          <span className={styles.heroDate}>{formatDate(post.date, lang)}</span>
        </div>

        <h1 className={styles.heroTitle}>{post.title}</h1>
        <p className={styles.heroDesc}>{post.description}</p>

        <div className={styles.heroAuthor}>
          <span>{post.author}</span>
          <span className={styles.authorDot} />
          <span>{formatDate(post.date, lang)}</span>
          {post.tags.length > 0 && (
            <>
              <span className={styles.authorDot} />
              <span>{post.tags.join(', ')}</span>
            </>
          )}
        </div>
      </div>

      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
      )}

      <div className={styles.layout}>
        <div
          ref={proseRef}
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>{t.blog.infoLabel}</p>
            <div className={styles.sidebarInfo}>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>{t.blog.authorLabel}</span>
                <span className={styles.sidebarInfoValue}>{post.author}</span>
              </div>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>{t.blog.dateLabel}</span>
                <span className={styles.sidebarInfoValue}>{formatDate(post.date, lang)}</span>
              </div>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>{t.blog.categoryLabel}</span>
                <span className={styles.sidebarInfoValue}>{post.category}</span>
              </div>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className={styles.sidebarSection}>
              <p className={styles.sidebarTitle}>{t.blog.tagsLabel}</p>
              <div className={styles.tagList}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>{t.blog.related}</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <RelatedCard key={p.slug} post={p} onClick={() => navigate(`/${locale}/blog/${p.slug}`)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RelatedCard({ post, onClick }: { post: PostMeta; onClick: () => void }) {
  return (
    <div className={styles.relatedCard} onClick={onClick}>
      <div className={styles.relatedCardImgWrap}>
        <img src={post.thumbnail} alt={post.title} className={styles.relatedCardImg} />
      </div>
      <div className={styles.relatedCardBody}>
        <p className={styles.relatedCardCategory}>{post.category}</p>
        <h3 className={styles.relatedCardTitle}>{post.title}</h3>
      </div>
    </div>
  )
}
