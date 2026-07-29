import eateaseThumbnail from '@/3dAssetThumbnail/eatease.jpeg'
import cangopiThumbnail from '@/3dAssetThumbnail/cangopi.jpeg'
import smsThumbnail from '@/3dAssetThumbnail/sms.jpeg'
import anakpipaThumbnail from '@/3dAssetThumbnail/anakpipa.jpeg'
import todoThumbnail from '@/3dAssetThumbnail/todo.jpeg'
import bannerThumb from '@/Website Banner/Banner1 (1).jpg'
import { brandVideoProjects } from '@/data/videos'
import {
  coverForBrand,
  creativeBrands,
  type CreativeBrandId,
} from '@/data/creative'

export type PortfolioCategory =
  | 'Software Development'
  | 'Creative Design'
  | 'Video Editing'

export type CategoryKey = 'all' | 'software' | 'creative' | 'video'

export type CategoryLabel = PortfolioCategory | 'All'

export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  category: PortfolioCategory
  tags: string[]
  thumbnail: string
  thumbnailFit?: 'cover' | 'contain'
  /** Optional override when the detail experience is not `/project/:id`. */
  href?: string
}

export const CATEGORY_META: {
  key: CategoryKey
  label: CategoryLabel
  shortTitle: string
}[] = [
  { key: 'all', label: 'All', shortTitle: 'All' },
  { key: 'software', label: 'Software Development', shortTitle: 'Software' },
  { key: 'creative', label: 'Creative Design', shortTitle: 'Creative' },
  { key: 'video', label: 'Video Editing', shortTitle: 'Video' },
]

export const CATEGORY_FROM_QUERY: Record<string, CategoryKey> = {
  all: 'all',
  software: 'software',
  creative: 'creative',
  video: 'video',
}

const creativeBrandItems: PortfolioItem[] = creativeBrands.map((brand) => ({
  id: brand.id,
  title: brand.name,
  subtitle: brand.tagline,
  category: 'Creative Design' as const,
  tags: brand.tags,
  thumbnail: coverForBrand(brand.id as CreativeBrandId) ?? bannerThumb,
  href: `/creative/${brand.id}`,
}))

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'pradita-canteen',
    title: 'Pradita Canteen',
    subtitle: 'Food Order System',
    category: 'Software Development',
    tags: ['Flutter', 'Firebase', 'Dart', 'FCM'],
    thumbnail: eateaseThumbnail,
  },
  {
    id: 'cangopi-pos',
    title: 'Cangopi POS',
    subtitle: 'Point of Sale Application',
    category: 'Software Development',
    tags: ['Laravel', 'PHP', 'JavaScript', 'Blade'],
    thumbnail: cangopiThumbnail,
  },
  {
    id: 'summarecon',
    title: 'Summarecon Serpong',
    subtitle: 'Internal Document System',
    category: 'Software Development',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'Design System'],
    thumbnail: smsThumbnail,
  },
  {
    id: 'anakpipa',
    title: 'Anak Pipa',
    subtitle: 'Visual Identity & Design',
    category: 'Software Development',
    tags: ['Figma', 'Branding', 'UI Design'],
    thumbnail: anakpipaThumbnail,
  },
  {
    id: 'cheetask',
    title: 'Cheetask',
    subtitle: 'Task Management UI',
    category: 'Software Development',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    thumbnail: todoThumbnail,
  },
  {
    id: 'website-banner',
    title: 'Website Banner',
    subtitle: 'Digital Marketing Banners',
    category: 'Creative Design',
    tags: ['Photoshop', 'Banner Design', 'Marketing'],
    thumbnail: bannerThumb,
  },
  ...creativeBrandItems,
  {
    id: 'umn',
    title: brandVideoProjects.umn.title,
    subtitle: brandVideoProjects.umn.subtitle,
    category: 'Video Editing',
    tags: ['Premiere Pro', 'After Effects', 'UMN'],
    thumbnail: brandVideoProjects.umn.thumbnail,
    thumbnailFit: 'cover',
  },
  {
    id: 'siloam',
    title: brandVideoProjects.siloam.title,
    subtitle: brandVideoProjects.siloam.subtitle,
    category: 'Video Editing',
    tags: ['Premiere Pro', 'After Effects', 'Siloam'],
    thumbnail: brandVideoProjects.siloam.thumbnail,
    thumbnailFit: 'cover',
  },
]

export function itemsByCategoryKey(key: CategoryKey): PortfolioItem[] {
  if (key === 'all') return portfolioItems
  const meta = CATEGORY_META.find((c) => c.key === key)
  if (!meta || meta.label === 'All') return portfolioItems
  return portfolioItems.filter((item) => item.category === meta.label)
}

export function countByCategoryKey(key: CategoryKey): number {
  return itemsByCategoryKey(key).length
}

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id)
}

/** Other portfolio items in the same category as `id` (excludes the current item). */
export function relatedByCategory(id: string): PortfolioItem[] {
  const current = getPortfolioItem(id)
  if (!current) return []
  return portfolioItems.filter(
    (item) => item.category === current.category && item.id !== id,
  )
}

export function categoryKeyFromLabel(
  label: PortfolioCategory,
): Exclude<CategoryKey, 'all'> {
  const meta = CATEGORY_META.find((c) => c.label === label)
  if (meta && meta.key !== 'all') return meta.key
  return 'software'
}
