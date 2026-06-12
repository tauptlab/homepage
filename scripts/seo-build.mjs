// @ts-check
/**
 * Post-build SEO / GEO pipeline for taupt-official (Cloudflare Pages SPA).
 *
 * Runs automatically after `vite build` (see package.json "postbuild").
 * For every public route it emits a static HTML file containing:
 *   - resolved <title>, description, canonical, hreflang
 *   - Open Graph + Twitter Card tags
 *   - JSON-LD structured data (Organization / WebSite / Blog / BlogPosting / BreadcrumbList)
 *   - the fully rendered article body baked into #root, so JS-less crawlers
 *     (most AI / GEO crawlers) read real content. React replaces it on hydrate.
 * It also generates robots.txt and sitemap.xml.
 *
 * Everything is data-driven from content/posts/{ko,en}/*.md — adding a post or
 * an English translation auto-includes it on the next build. No manual steps.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import markedFootnote from 'marked-footnote'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const CONTENT = join(ROOT, 'content', 'posts')

// ── Site config ──────────────────────────────────────────────────────────────
const ORIGIN = (process.env.SITE_ORIGIN || 'https://taupt.com').replace(/\/$/, '')
const SITE_NAME = 'Taupt'
const SITE_TAGLINE = '차등 프라이버시(Differential Privacy) 전문 기업'
const DEFAULT_OG_IMAGE = `${ORIGIN}/images/taupt_logo_black.png`
const ORG_LOGO = `${ORIGIN}/images/taupt_logo_black.png`

// locale URL segment  ->  { lang, htmlLang, ogLocale }
const LOCALES = {
  kor: { lang: 'ko', htmlLang: 'ko', ogLocale: 'ko_KR', dir: 'ko' },
  eng: { lang: 'en', htmlLang: 'en', ogLocale: 'en_US', dir: 'en' },
}

// ── marked config (mirrors src/shared/lib/posts.ts) ──────────────────────────
marked.use(markedKatex({ throwOnError: false, nonStandard: true }))
marked.use(markedFootnote())

// ── helpers ──────────────────────────────────────────────────────────────────
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const abs = (path = '') => (path.startsWith('http') ? path : `${ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`)

/** Strip HTML/markdown to plain text for word counts. */
const plain = (s = '') =>
  s.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ').replace(/[#>*_`~\-|]/g, ' ').replace(/\s+/g, ' ').trim()

function wordCount(text, lang) {
  const p = plain(text)
  if (lang === 'ko') return (p.match(/[가-힣]/g) || []).length
  return p.split(/\s+/).filter(Boolean).length
}

function readingMinutes(text, lang) {
  const wc = wordCount(text, lang)
  return Math.max(1, Math.round(lang === 'ko' ? wc / 500 : wc / 220))
}

// ── load posts ───────────────────────────────────────────────────────────────
/** @returns {Array<{locale:string, slug:string, data:any, html:string, content:string}>} */
function loadPosts() {
  const out = []
  for (const seg of Object.keys(LOCALES)) {
    const dir = join(CONTENT, LOCALES[seg].dir)
    if (!existsSync(dir)) continue
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue
      const raw = readFileSync(join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = file.replace(/\.md$/, '')
      const html = /** @type {string} */ (marked.parse(content))
      out.push({ locale: seg, slug, data, html, content })
    }
  }
  out.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  return out
}

// ── <head> builders ──────────────────────────────────────────────────────────
function ldScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: ORIGIN,
  logo: ORG_LOGO,
  description: '차등 프라이버시(Differential Privacy) 기술로 데이터 활용과 개인정보 보호를 동시에 실현하는 기업.',
  knowsAbout: ['Differential Privacy', 'Federated Learning', 'Synthetic Data', 'Privacy Engineering', '개인정보보호'],
}

/**
 * Build the <head> meta block for a page.
 * @param {{title:string, description:string, canonical:string, locale:string,
 *   ogType?:string, image?:string, alternates?:Array<{seg:string,href:string}>,
 *   article?:{date?:string, author?:string, category?:string, tags?:string[]},
 *   jsonLd?:any[]}} o
 */
function headMeta(o) {
  const L = LOCALES[o.locale]
  const image = abs(o.image || DEFAULT_OG_IMAGE)
  const lines = [
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}" />`,
    `<link rel="canonical" href="${esc(o.canonical)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
  ]

  // hreflang alternates
  if (o.alternates?.length) {
    for (const a of o.alternates) {
      lines.push(`<link rel="alternate" hreflang="${LOCALES[a.seg].lang}" href="${esc(a.href)}" />`)
    }
    const def = o.alternates.find((a) => a.seg === 'kor') || o.alternates[0]
    lines.push(`<link rel="alternate" hreflang="x-default" href="${esc(def.href)}" />`)
  }

  // Open Graph
  lines.push(
    `<meta property="og:type" content="${o.ogType || 'website'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${L.ogLocale}" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${esc(o.canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
  )

  // article-specific
  if (o.article) {
    if (o.article.date) lines.push(`<meta property="article:published_time" content="${esc(new Date(o.article.date).toISOString())}" />`)
    if (o.article.author) lines.push(`<meta property="article:author" content="${esc(o.article.author)}" />`)
    if (o.article.category) lines.push(`<meta property="article:section" content="${esc(o.article.category)}" />`)
    for (const tag of o.article.tags || []) lines.push(`<meta property="article:tag" content="${esc(tag)}" />`)
  }

  // Twitter
  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(o.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  )

  for (const ld of o.jsonLd || []) lines.push(ldScript(ld))

  return lines.join('\n    ')
}

// ── HTML template assembly ───────────────────────────────────────────────────
const PRERENDER_STYLE = `<style id="seo-prerender-style">#seo-prerender{max-width:760px;margin:0 auto;padding:96px 24px 64px;font-family:Pretendard,system-ui,sans-serif;line-height:1.75;color:#1a1a1a}#seo-prerender img{max-width:100%;height:auto}#seo-prerender pre{overflow:auto}#seo-prerender h1{font-size:2rem;line-height:1.3}</style>`

/**
 * Take the built dist/index.html as the template and produce a route HTML doc.
 * @param {string} template
 * @param {{htmlLang:string, head:string, body:string}} o
 */
function renderDoc(template, o) {
  let html = template
  // set <html lang>
  html = html.replace(/<html[^>]*>/, `<html lang="${o.htmlLang}">`)
  // Strip the template's default SEO tags — we inject fresh per-route ones and
  // must avoid duplicate/conflicting canonical, OG, Twitter, robots, author tags.
  html = html.replace(/[ \t]*<title>[\s\S]*?<\/title>\s*\n?/i, '')
  html = html.replace(/[ \t]*<meta\s+name="(description|author|robots)"[^>]*>\s*\n?/gi, '')
  html = html.replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/gi, '')
  html = html.replace(/[ \t]*<meta\s+(?:property|name)="(?:og:[^"]*|twitter:[^"]*)"[^>]*>\s*\n?/gi, '')
  // drop now-empty "<!-- Open Graph -->" / "<!-- Twitter -->" comment lines
  html = html.replace(/[ \t]*<!--\s*(Open Graph|Twitter)\s*-->\s*\n?/gi, '')
  // inject head block + prerender style before </head>
  html = html.replace(/<\/head>/i, `    ${o.head}\n    ${PRERENDER_STYLE}\n  </head>`)
  // bake content into #root
  html = html.replace(/<div id="root">\s*<\/div>/i, `<div id="root"><div id="seo-prerender">${o.body}</div></div>`)
  return html
}

function writeRoute(routePath, html) {
  const outDir = routePath === '/' ? DIST : join(DIST, routePath)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
}

// ── main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('[seo-build] dist/index.html not found — run `vite build` first.')
    process.exit(1)
  }
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  const posts = loadPosts()
  const byLocale = (seg) => posts.filter((p) => p.locale === seg)
  const localesWithPosts = Object.keys(LOCALES).filter((seg) => byLocale(seg).length > 0)
  const urls = [] // for sitemap: { loc, lastmod, priority, changefreq, alternates? }

  // ── Home ( / redirects to /kor/blog ) ──
  {
    const canonical = `${ORIGIN}/kor/blog`
    const websiteLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: ORIGIN,
      inLanguage: 'ko',
      description: SITE_TAGLINE,
      publisher: organizationLd,
    }
    const head = headMeta({
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: 'TaupT는 차등 프라이버시(Differential Privacy) 기술로 데이터 활용과 개인정보 보호를 동시에 실현합니다. DP-Engine, 연합학습, 합성 데이터, 프라이버시 감사.',
      canonical,
      locale: 'kor',
      ogType: 'website',
      jsonLd: [organizationLd, websiteLd],
    })
    const body = `<h1>${esc(SITE_NAME)} — ${esc(SITE_TAGLINE)}</h1><p>차등 프라이버시(Differential Privacy) 기술로 데이터 활용과 개인정보 보호를 동시에 실현합니다.</p>`
    writeRoute('/', renderDoc(template, { htmlLang: 'ko', head, body }))
    urls.push({ loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly' })
  }

  // ── Blog index per locale ──
  for (const seg of localesWithPosts) {
    const L = LOCALES[seg]
    const list = byLocale(seg)
    const canonical = `${ORIGIN}/${seg}/blog`
    const blogLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE_NAME} Blog`,
      url: canonical,
      inLanguage: L.lang,
      publisher: organizationLd,
      blogPost: list.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.data.title,
        url: `${ORIGIN}/${seg}/blog/${p.slug}`,
        datePublished: p.data.date,
        author: { '@type': 'Person', name: p.data.author },
      })),
    }
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical },
      ],
    }
    const head = headMeta({
      title: `Blog | ${SITE_NAME}`,
      description: L.lang === 'ko'
        ? 'TaupT 팀이 차등 프라이버시, 연합학습, 통계, 데이터 보안에 대해 이야기합니다.'
        : 'The TaupT team writes about Differential Privacy, Federated Learning, and data security.',
      canonical,
      locale: seg,
      ogType: 'website',
      jsonLd: [blogLd, breadcrumb],
    })
    const items = list
      .map(
        (p) =>
          `<li><a href="/${seg}/blog/${esc(p.slug)}"><strong>${esc(p.data.title)}</strong></a><br/><small>${esc(p.data.date)} · ${esc(p.data.category)}</small><br/>${esc(p.data.description)}</li>`,
      )
      .join('')
    const body = `<h1>${SITE_NAME} Blog</h1><ul>${items}</ul>`
    writeRoute(`${seg}/blog`, renderDoc(template, { htmlLang: L.htmlLang, head, body }))
    urls.push({ loc: canonical, priority: '0.9', changefreq: 'daily' })
  }

  // ── Individual posts ──
  for (const p of posts) {
    const seg = p.locale
    const L = LOCALES[seg]
    const canonical = `${ORIGIN}/${seg}/blog/${p.slug}`
    // alternates: same slug present in other locales
    const alternates = Object.keys(LOCALES)
      .filter((s) => posts.some((q) => q.locale === s && q.slug === p.slug))
      .map((s) => ({ seg: s, href: `${ORIGIN}/${s}/blog/${p.slug}` }))

    const blogPostingLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.data.title,
      description: p.data.description,
      image: p.data.thumbnail ? abs(p.data.thumbnail) : DEFAULT_OG_IMAGE,
      datePublished: p.data.date ? new Date(p.data.date).toISOString() : undefined,
      dateModified: p.data.date ? new Date(p.data.date).toISOString() : undefined,
      author: { '@type': 'Person', name: p.data.author },
      publisher: organizationLd,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      url: canonical,
      inLanguage: L.lang,
      articleSection: p.data.category,
      keywords: Array.isArray(p.data.tags) ? p.data.tags.join(', ') : undefined,
      wordCount: wordCount(p.content, L.lang),
    }
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/${seg}/blog` },
        { '@type': 'ListItem', position: 3, name: p.data.title, item: canonical },
      ],
    }
    const head = headMeta({
      title: `${p.data.title} | ${SITE_NAME}`,
      description: p.data.description,
      canonical,
      locale: seg,
      ogType: 'article',
      image: p.data.thumbnail,
      alternates: alternates.length > 1 ? alternates : undefined,
      article: { date: p.data.date, author: p.data.author, category: p.data.category, tags: p.data.tags },
      jsonLd: [blogPostingLd, breadcrumb],
    })
    const thumb = p.data.thumbnail ? `<img src="${esc(p.data.thumbnail)}" alt="${esc(p.data.title)}" />` : ''
    const body = `<article><h1>${esc(p.data.title)}</h1><p>${esc(p.data.description)}</p><p><small>${esc(p.data.author)} · ${esc(p.data.date)} · ${readingMinutes(p.content, L.lang)}${L.lang === 'ko' ? '분 분량' : ' min read'}</small></p>${thumb}${p.html}</article>`
    writeRoute(`${seg}/blog/${p.slug}`, renderDoc(template, { htmlLang: L.htmlLang, head, body }))
    urls.push({
      loc: canonical,
      lastmod: p.data.date ? new Date(p.data.date).toISOString().slice(0, 10) : undefined,
      priority: '0.8',
      changefreq: 'monthly',
      alternates: alternates.length > 1 ? alternates : undefined,
    })
  }

  // ── robots.txt ──
  const robots = `# robots.txt — ${SITE_NAME}
# Search + AI/GEO crawlers are welcome.
User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`
  writeFileSync(join(DIST, 'robots.txt'), robots, 'utf8')

  // ── sitemap.xml ──
  const ns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
  const entries = urls
    .map((u) => {
      const alts = (u.alternates || [])
        .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${LOCALES[a.seg].lang}" href="${a.href}" />`)
        .join('')
      return `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${alts}
  </url>`
    })
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${ns}>\n${entries}\n</urlset>\n`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  console.log(`[seo-build] origin=${ORIGIN}`)
  console.log(`[seo-build] prerendered ${urls.length} routes (${posts.length} posts), robots.txt + sitemap.xml written.`)
}

main()
