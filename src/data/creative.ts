import logoKenji from '@/logo/Company_Logo/kenji.png'
import logoRoyale from '@/logo/Company_Logo/royale.jpg'
import logoSaheela from '@/logo/Company_Logo/saheela.jpg'
import logoDemuria from '@/logo/Company_Logo/680f3bfb25c9fae7ad98b43a61f90593.png'
import logoUmn from '@/logo/Company_Logo/Logo-UMN-e1634700898276 (1).png'
import thumbDurenKenji from '@/3dAssetThumbnail/DurenKenji.png'
import thumbKurmaAjwaRoyal from '@/3dAssetThumbnail/Kurma Ajwa Royale.png'
import thumbMaduSaheela from '@/3dAssetThumbnail/Madusaheela.png'
import thumbMuriafresh from '@/3dAssetThumbnail/Muriafresh.png'
import thumbAjwaNaeem from '@/3dAssetThumbnail/Ajwa naeem.png'
import thumbUmnOnlineLearning from '@/3dAssetThumbnail/bannerUMNOnlinelearning.png'
import thumbUmnGraduate from '@/3dAssetThumbnail/umngraduatepost.png'
import logoUmnGraduate from '@/3dAssetThumbnail/umngraduatevideo.png'

export type CreativeBrandId =
  | 'umn-online-learning'
  | 'umn-graduate'
  | 'ajwa-naeem'
  | 'madu-saheela'
  | 'duren-kenji'
  | 'kurma-ajwa-royal'
  | 'muriafresh'

export interface BrandColor {
  name: string
  hex: string
}

export interface BrandFont {
  role: 'Display' | 'Body'
  family: string
  /** CSS font-family value used for the live sample */
  stack: string
  usage: string
}

export interface CreativeBrand {
  id: CreativeBrandId
  name: string
  folder: string
  tagline: string
  description: string
  tags: string[]
  /** Brand mark shown in the board hero */
  logo: string
  /** Portfolio / folder card cover — falls back to first post when omitted */
  thumbnail?: string
  /** Primary brand color used on the info panel */
  primary: string
  /** Soft board / cream surface */
  surface: string
  /** Secondary / accent on chips */
  accent: string
  /** Text color on the primary panel */
  onPrimary: string
  /** Full color system shown on the brand board */
  palette: BrandColor[]
  /** Typography system shown on the brand board */
  fonts: BrandFont[]
}

export interface CreativePost {
  id: string
  brandId: CreativeBrandId
  brandName: string
  src: string
  alt: string
  kind: 'feed' | 'carousel' | 'frame'
}

export const creativeBrands: CreativeBrand[] = [
  {
    id: 'umn-online-learning',
    name: 'UMN Online Learning',
    folder: 'UOL',
    tagline: 'Campus life, framed.',
    description:
      'University organization posts and event frames — clean compositions for announcements, highlights, and community stories.',
    tags: ['Organization', 'Event', 'Social'],
    logo: logoUmn,
    thumbnail: thumbUmnOnlineLearning,
    primary: '#1E3A5F',
    surface: '#F5F7FA',
    accent: '#E63946',
    onPrimary: '#F5F7FA',
    palette: [
      { name: 'Campus Navy', hex: '#1E3A5F' },
      { name: 'Signal Red', hex: '#E63946' },
      { name: 'Paper White', hex: '#F5F7FA' },
      { name: 'Slate', hex: '#6B7280' },
      { name: 'Ink', hex: '#111827' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Poppins',
        stack: '"Poppins", "Montserrat", sans-serif',
        usage: 'Event titles, frame headlines',
      },
      {
        role: 'Body',
        family: 'Inter',
        stack: '"Inter", "Segoe UI", sans-serif',
        usage: 'Announcements, supporting copy',
      },
    ],
  },
  {
    id: 'umn-graduate',
    name: 'UMN Graduate',
    folder: 'UMN Graduate',
    tagline: 'Celebrate the next chapter.',
    description:
      'Graduation campaign frames for Universitas Multimedia Nusantara — polished layouts built for announcement and storytelling posts.',
    tags: ['Campus', 'Event', 'Editorial'],
    logo: logoUmnGraduate,
    thumbnail: thumbUmnGraduate,
    primary: '#0B3D5C',
    surface: '#F0F4F8',
    accent: '#4EA8DE',
    onPrimary: '#F0F4F8',
    palette: [
      { name: 'UMN Navy', hex: '#0B3D5C' },
      { name: 'Sky Blue', hex: '#4EA8DE' },
      { name: 'Cool Mist', hex: '#F0F4F8' },
      { name: 'Steel', hex: '#5C6B7A' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Montserrat',
        stack: '"Montserrat", "Helvetica Neue", sans-serif',
        usage: 'Graduate titles, announcement headers',
      },
      {
        role: 'Body',
        family: 'Inter',
        stack: '"Inter", "Segoe UI", sans-serif',
        usage: 'Body copy, captions, details',
      },
    ],
  },
  {
    id: 'ajwa-naeem',
    name: 'Ajwa Naeem',
    folder: 'Ajwa naeeem',
    tagline: 'Premium dates. Gold-accent elegance.',
    description:
      'Social creatives for Kurma Ajwa Naeem — dark luxury stages, gold typography, and promo storytelling built around dates and saffron.',
    tags: ['Luxury', 'Product Promo', 'Religious'],
    logo: thumbAjwaNaeem,
    thumbnail: thumbAjwaNaeem,
    primary: '#1A1A1A',
    surface: '#F5F0E6',
    accent: '#D4A017',
    onPrimary: '#F5F0E6',
    palette: [
      { name: 'Charcoal', hex: '#1A1A1A' },
      { name: 'Royal Gold', hex: '#D4A017' },
      { name: 'Warm Ivory', hex: '#F5F0E6' },
      { name: 'Soft Gold', hex: '#E8C547' },
      { name: 'Deep Black', hex: '#0D0D0D' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Playfair Display',
        stack: '"Playfair Display", Georgia, serif',
        usage: 'Brand wordmark, luxury headlines',
      },
      {
        role: 'Body',
        family: 'Montserrat',
        stack: '"Montserrat", "Helvetica Neue", sans-serif',
        usage: 'Promo labels, captions, supporting text',
      },
    ],
  },
  {
    id: 'madu-saheela',
    name: 'Madu Saheela',
    folder: 'Madu Saheela',
    tagline: 'Fresh from the comb.',
    description:
      'Honey brand campaign visuals with warm amber tones, gift-box product reveals, and clean promotional hierarchy.',
    tags: ['Warm', 'Product Focus', 'Promo'],
    logo: logoSaheela,
    thumbnail: thumbMaduSaheela,
    primary: '#C45C16',
    surface: '#FFFBF0',
    accent: '#F0C040',
    onPrimary: '#FFF8F0',
    palette: [
      { name: 'Honey Amber', hex: '#C45C16' },
      { name: 'Golden Nectar', hex: '#F0C040' },
      { name: 'Comb White', hex: '#FFFBF0' },
      { name: 'Leaf Green', hex: '#2E7D32' },
      { name: 'Burnt Orange', hex: '#E67E22' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Quicksand',
        stack: '"Quicksand", "Nunito", sans-serif',
        usage: 'Promo titles, brand lockups',
      },
      {
        role: 'Body',
        family: 'Nunito',
        stack: '"Nunito", "Segoe UI", sans-serif',
        usage: 'Offers, period text, product details',
      },
    ],
  },
  {
    id: 'duren-kenji',
    name: 'Duren Kenji',
    folder: 'DurenKenji',
    tagline: 'Premium durian. Playful promos.',
    description:
      'Social creatives for a durian brand — bright yellow energy, mascot-led storytelling, and interactive feed posts that stop the scroll.',
    tags: ['Playful', 'Product Promo', 'Engagement'],
    logo: logoKenji,
    thumbnail: thumbDurenKenji,
    primary: '#1B5E20',
    surface: '#FFF8DC',
    accent: '#F4C430',
    onPrimary: '#FFF8DC',
    palette: [
      { name: 'Forest Green', hex: '#1B5E20' },
      { name: 'Durian Yellow', hex: '#F4C430' },
      { name: 'Pale Cream', hex: '#FFF8DC' },
      { name: 'Leaf Green', hex: '#4CAF50' },
      { name: 'Near Black', hex: '#1A1A1A' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Fredoka',
        stack: '"Fredoka", "Nunito", sans-serif',
        usage: 'Headlines, promo titles, mascot callouts',
      },
      {
        role: 'Body',
        family: 'Nunito',
        stack: '"Nunito", "Segoe UI", sans-serif',
        usage: 'Captions, product names, body copy',
      },
    ],
  },
  {
    id: 'kurma-ajwa-royal',
    name: 'Kurma Ajwa Royal',
    folder: 'Kurma Ajwa Royal',
    tagline: 'Royal dates. Bold campaign energy.',
    description:
      'Feed and carousel systems for a dates & saffron brand — deep red stages, gold accents, and high-impact promo storytelling.',
    tags: ['Luxury', 'Promo', 'Carousel'],
    logo: logoRoyale,
    thumbnail: thumbKurmaAjwaRoyal,
    primary: '#8B0000',
    surface: '#F8EDE3',
    accent: '#D4A017',
    onPrimary: '#FFF5F0',
    palette: [
      { name: 'Royal Red', hex: '#8B0000' },
      { name: 'Gold', hex: '#D4A017' },
      { name: 'Warm Ivory', hex: '#F8EDE3' },
      { name: 'Crimson', hex: '#C41E3A' },
      { name: 'Deep Mahogany', hex: '#4A0E0E' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Playfair Display',
        stack: '"Playfair Display", Georgia, serif',
        usage: 'Brand wordmark, luxury headlines',
      },
      {
        role: 'Body',
        family: 'Montserrat',
        stack: '"Montserrat", "Helvetica Neue", sans-serif',
        usage: 'Promo labels, dates, supporting text',
      },
    ],
  },
  {
    id: 'muriafresh',
    name: 'Muriafresh',
    folder: 'Muriafresh',
    tagline: 'Fresh fruit. Good vibes.',
    description:
      'Youthful produce brand content — playful fruit characters, interactive spot-the-difference posts, and vibrant green energy.',
    tags: ['Fresh', 'Youthful', 'Interactive'],
    logo: logoDemuria,
    thumbnail: thumbMuriafresh,
    primary: '#2D6A4F',
    surface: '#F4F7F0',
    accent: '#E09F3E',
    onPrimary: '#F4F7F0',
    palette: [
      { name: 'Fresh Green', hex: '#2D6A4F' },
      { name: 'Citrus Orange', hex: '#E09F3E' },
      { name: 'Mint Mist', hex: '#F4F7F0' },
      { name: 'Apple Red', hex: '#E63946' },
      { name: 'Lemon Yellow', hex: '#F4D35E' },
    ],
    fonts: [
      {
        role: 'Display',
        family: 'Baloo 2',
        stack: '"Baloo 2", "Fredoka", sans-serif',
        usage: 'Game titles, playful headlines',
      },
      {
        role: 'Body',
        family: 'Poppins',
        stack: '"Poppins", "Nunito", sans-serif',
        usage: 'CTAs, captions, UI labels',
      },
    ],
  }
]

const folderToBrand = Object.fromEntries(
  creativeBrands.map((brand) => [brand.folder, brand]),
) as Record<string, CreativeBrand>

const modules = import.meta.glob<{ default: string }>(
  '/src/Social Media Post/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true },
)

function stemKey(path: string): string {
  return path.replace(/\.(jpe?g|png)$/i, '').toLowerCase()
}

function scorePreferred(path: string): number {
  if (/\.jpe?g$/i.test(path)) return 2
  if (/\.png$/i.test(path)) return 1
  return 0
}

function postKind(file: string): CreativePost['kind'] {
  const lower = file.toLowerCase()
  if (lower.includes('carousel')) return 'carousel'
  if (lower.includes('frame')) return 'frame'
  return 'feed'
}

const preferredByStem = new Map<string, { path: string; src: string }>()

for (const [path, mod] of Object.entries(modules)) {
  const key = stemKey(path)
  const prev = preferredByStem.get(key)
  if (!prev || scorePreferred(path) > scorePreferred(prev.path)) {
    preferredByStem.set(key, { path, src: mod.default })
  }
}

function brandFromPath(path: string): CreativeBrand | undefined {
  const match = path.match(/Social Media Post\/([^/]+)\//)
  if (!match) return undefined
  return folderToBrand[match[1]]
}

export const creativePosts: CreativePost[] = Array.from(preferredByStem.values())
  .map(({ path, src }, index) => {
    const brand = brandFromPath(path)
    if (!brand) return null
    const file = path.split('/').pop() ?? `post-${index}`
    return {
      id: `${brand.id}-${index}-${file}`,
      brandId: brand.id,
      brandName: brand.name,
      src,
      alt: `${brand.name} — ${file.replace(/\.[^.]+$/, '')}`,
      kind: postKind(file),
    }
  })
  .filter((post): post is CreativePost => post !== null)
  .sort((a, b) => {
    const brandOrder =
      creativeBrands.findIndex((brand) => brand.id === a.brandId) -
      creativeBrands.findIndex((brand) => brand.id === b.brandId)
    if (brandOrder !== 0) return brandOrder
    return a.alt.localeCompare(b.alt, undefined, { numeric: true })
  })

export function postsByBrand(brandId: CreativeBrandId | 'all'): CreativePost[] {
  if (brandId === 'all') return creativePosts
  return creativePosts.filter((post) => post.brandId === brandId)
}

export function coverForBrand(brandId: CreativeBrandId): string | undefined {
  const brand = getBrand(brandId)
  if (brand?.thumbnail) return brand.thumbnail
  return creativePosts.find((post) => post.brandId === brandId)?.src
}

export function getBrand(brandId: CreativeBrandId): CreativeBrand | undefined {
  return creativeBrands.find((brand) => brand.id === brandId)
}

/** Split a brand's posts into layout slots for the brand-board (no duplicates). */
export function boardSlots(brandId: CreativeBrandId) {
  const posts = postsByBrand(brandId)
  const hero = posts[0]
  const featured = posts.slice(1, 4)
  const used = new Set(
    [hero, ...featured].filter(Boolean).map((post) => post!.id),
  )
  const leftover = posts.filter((post) => !used.has(post.id))
  const carousel = leftover.filter((post) => post.kind === 'carousel')
  const nonCarousel = leftover.filter((post) => post.kind !== 'carousel')
  const social = nonCarousel.slice(0, 3)
  const socialIds = new Set(social.map((post) => post.id))
  const gallery = leftover.filter(
    (post) => !socialIds.has(post.id) && post.kind !== 'carousel',
  )
  // If carousel already shown in its section, keep remaining carousel slides in gallery too
  // only when there are more than 4 — otherwise keep carousel exclusive to that section.
  const carouselExtra = carousel.slice(4)
  return {
    posts,
    hero,
    featured,
    social,
    gallery: [...gallery, ...carouselExtra],
    carousel,
  }
}
