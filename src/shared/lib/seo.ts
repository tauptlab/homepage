import { useEffect } from 'react'

const ORIGIN = 'https://taupt.com'

interface SeoInput {
  title: string
  description?: string
  /** Absolute path beginning with "/" (e.g. "/kor/blog/my-post"). */
  path: string
  image?: string
  type?: 'website' | 'article'
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keep <head> in sync with the active route during client-side navigation.
 * The build-time prerender (scripts/seo-build.mjs) handles crawlers; this keeps
 * the title, canonical, and social tags correct for users sharing live URLs.
 */
export function useSeo({ title, description, path, image, type = 'website' }: SeoInput) {
  useEffect(() => {
    const url = `${ORIGIN}${path}`
    const img = image ? (image.startsWith('http') ? image : `${ORIGIN}${image}`) : `${ORIGIN}/images/taupt_logo_black.png`

    document.title = title
    if (description) setMeta('meta[name="description"]', 'name', 'description', description)
    setLink('canonical', url)

    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:image"]', 'property', 'og:image', img)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img)
    if (description) {
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }
  }, [title, description, path, image, type])
}
