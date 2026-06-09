import { marked } from 'marked'
import type { Lang } from './i18n'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  thumbnail: string
  tags: string[]
  lang: Lang
}

export interface Post extends PostMeta {
  content: string
  html: string
}

// Minimal browser-safe frontmatter parser
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlStr = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (!key) continue

    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }

  return { data, content }
}

const koModules = import.meta.glob('/content/posts/ko/*.md', { query: '?raw', import: 'default', eager: true })
const enModules = import.meta.glob('/content/posts/en/*.md', { query: '?raw', import: 'default', eager: true })

function slugFromPath(path: string): string {
  return path.replace(/^\/content\/posts\/(ko|en)\//, '').replace('.md', '')
}

function buildPosts(modules: Record<string, unknown>, lang: Lang): Post[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw as string)
      const slug = slugFromPath(path)
      const html = marked(content) as string
      return {
        slug,
        lang,
        title: (data.title as string) ?? '',
        description: (data.description as string) ?? '',
        date: (data.date as string) ?? '',
        category: (data.category as string) ?? '',
        author: (data.author as string) ?? '',
        thumbnail: (data.thumbnail as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        content,
        html,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const _cache: Partial<Record<Lang, Post[]>> = {}

export function getAllPosts(lang: Lang): Post[] {
  if (_cache[lang]) return _cache[lang]!
  const modules = lang === 'ko' ? koModules : enModules
  _cache[lang] = buildPosts(modules, lang)
  return _cache[lang]!
}

export function getPostBySlug(slug: string, lang: Lang): Post | undefined {
  return getAllPosts(lang).find((p) => p.slug === slug)
}

export function getAllCategories(lang: Lang): string[] {
  const cats = new Set(getAllPosts(lang).map((p) => p.category))
  return Array.from(cats)
}
