import logoUmn from '@/logo/Company_Logo/Logo-UMN-e1634700898276 (1).png'
import logoSiloam from '@/logo/Company_Logo/Siloam_Hospitals.svg'

export type VideoBrand = 'umn' | 'siloam'

export interface BrandVideo {
  id: string
  title: string
  driveFileId: string
}

export interface BrandVideoProject {
  id: VideoBrand
  title: string
  subtitle: string
  period: string
  role: string
  type: 'Video Editing'
  stack: string[]
  description: string
  highlights: string[]
  logo: string
  videos: BrandVideo[]
}

export function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function driveThumbnailUrl(fileId: string, size = 1200) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

export const brandVideoProjects: Record<VideoBrand, BrandVideoProject> = {
  umn: {
    id: 'umn',
    title: 'UMN',
    subtitle: 'Educational Content Series',
    period: '2024 – 2025',
    role: 'Video Editor',
    type: 'Video Editing',
    stack: ['Premiere Pro', 'After Effects', 'Motion', 'Social Cut'],
    description:
      'A collection of educational and promotional video edits for Universitas Multimedia Nusantara — short-form storytelling built for social reach, clarity, and campus brand presence.',
    highlights: [
      'Paced explainers and campus stories for scroll-friendly retention.',
      'Consistent title treatment and grade across the UMN content line.',
      'Edited for platform-ready exports with clear narrative beats.',
    ],
    logo: logoUmn,
    videos: [
      {
        id: 'umn-qris',
        title: 'Kenapa QRIS Bisa Mengubah Cara Orang Belanja?',
        driveFileId: '1HbPMXaRdxt6IkM15KV0i3CJbr0QFq6SY',
      },
      {
        id: 'umn-desain-lingkungan',
        title: 'Emangnya Desain Bisa Berdampak ke Lingkungan?',
        driveFileId: '1iqkAKTiHloiXDlo-Lj-MtRv6WCyTFYwR',
      },
      {
        id: 'umn-kuliah-online',
        title: 'Nggak Nyangka, Kuliah Online di UMN Bisa Seseru Ini!',
        driveFileId: '13U6xeiubh27B450uKIMud-o6pZWvHtlr',
      },
      {
        id: 'umn-tes-online',
        title: 'Panduan Lengkap Setelah Tes Online',
        driveFileId: '1bTUNMeDH3OctIIaB2kUOrzq3OHhWFL5E',
      },
      {
        id: 'umn-teori-komunikasi',
        title: '3 Teori Komunikasi',
        driveFileId: '1a2oGE0s6TLflIGSc32lXQms6i-ndJ4iI',
      },
    ],
  },
  siloam: {
    id: 'siloam',
    title: 'Siloam',
    subtitle: 'Healthcare Content Series',
    period: '2024 – 2025',
    role: 'Video Editor',
    type: 'Video Editing',
    stack: ['Premiere Pro', 'After Effects', 'Color Grade', 'Social Cut'],
    description:
      'Medical and patient-education video edits for Siloam — clear messaging, calm pacing, and brand-safe delivery for healthcare audiences.',
    highlights: [
      'Structured doctor tips and medical explainers for easy comprehension.',
      'Kept tone trustworthy with clean cuts and restrained motion.',
      'Delivered platform-ready exports aligned with Siloam brand presence.',
    ],
    logo: logoSiloam,
    videos: [
      {
        id: 'siloam-dr-medok',
        title: 'Dr Medok',
        driveFileId: '1zkMO3DQoCB2sokrnV15iDRwj_2sg88ny',
      },
      {
        id: 'siloam-tips',
        title: 'Siloam Medical Tips',
        driveFileId: '1tUvVNP9QSu1i0fkot2xodnnl6wdt1TBR',
      },
      {
        id: 'siloam-saran-dokter',
        title: 'Saran Dokter',
        driveFileId: '12zpdJcywYTq376a55mFfXVtqst2L-u1i',
      },
    ],
  },
}

export function isVideoBrand(id: string): id is VideoBrand {
  return id === 'umn' || id === 'siloam'
}
