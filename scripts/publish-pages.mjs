import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const docs = join(root, 'docs')

if (!existsSync(dist)) {
  console.error('dist/ missing. Run "npm run build" first.')
  process.exit(1)
}

rmSync(docs, { recursive: true, force: true })
mkdirSync(docs, { recursive: true })
cpSync(dist, docs, { recursive: true })

const html = readFileSync(join(docs, 'index.html'), 'utf8')
writeFileSync(join(docs, '404.html'), html)

console.log('Published production site to docs/ for GitHub Pages.')
