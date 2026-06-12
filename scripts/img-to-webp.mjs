// @ts-check
/**
 * Convert raster images under public/images to WebP for lighter deployment.
 *
 * Usage:  node scripts/img-to-webp.mjs            (convert, keep sources)
 *         node scripts/img-to-webp.mjs --delete   (convert, then remove the
 *                                                   png/jpg sources so only
 *                                                   .webp ships)
 *
 * Skips a file when an up-to-date .webp sibling already exists. Idempotent.
 */
import { readdirSync, statSync, existsSync, unlinkSync } from 'node:fs'
import { join, extname, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const IMAGES_DIR = join(ROOT, 'public', 'images')
const SRC_EXT = new Set(['.png', '.jpg', '.jpeg'])
const QUALITY = 82
const del = process.argv.includes('--delete')

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

async function run() {
  if (!existsSync(IMAGES_DIR)) {
    console.log('[img-to-webp] no public/images directory — nothing to do.')
    return
  }
  const sources = walk(IMAGES_DIR).filter((f) => SRC_EXT.has(extname(f).toLowerCase()))
  let converted = 0
  let skipped = 0
  let removed = 0

  for (const src of sources) {
    const webp = join(dirname(src), basename(src, extname(src)) + '.webp')
    const fresh = existsSync(webp) && statSync(webp).mtimeMs >= statSync(src).mtimeMs
    if (!fresh) {
      await sharp(src).webp({ quality: QUALITY }).toFile(webp)
      converted++
      console.log(`  ✓ ${webp.replace(ROOT, '').replace(/\\/g, '/')}`)
    } else {
      skipped++
    }
    if (del) {
      unlinkSync(src)
      removed++
    }
  }

  console.log(`[img-to-webp] converted ${converted}, skipped ${skipped}${del ? `, removed ${removed} source(s)` : ''}.`)
}

run().catch((e) => {
  console.error('[img-to-webp]', e)
  process.exit(1)
})
