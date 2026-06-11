import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { buildMotelPath } from '@/lib/utils'

const rawAppBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.trim() !== ''
    ? process.env.NEXT_PUBLIC_APP_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://moteis.bdsmbrazil.com.br'
const appBaseUrl = rawAppBaseUrl.replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${appBaseUrl}/`, priority: 1, changeFrequency: 'daily' },
    { url: `${appBaseUrl}/apps`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${appBaseUrl}/classificados`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${appBaseUrl}/owner`, priority: 0.6, changeFrequency: 'weekly' },
    { url: `${appBaseUrl}/suporte-contato`, priority: 0.5, changeFrequency: 'monthly' },
  ]

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return staticRoutes
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data: motels } = await supabase
    .from('motels')
    .select('id, name, address, created_at, status')
    .eq('status', 'active')

  const motelRoutes: MetadataRoute.Sitemap =
    motels?.map((motel) => ({
      url: `${appBaseUrl}${buildMotelPath(motel.name, motel.id, motel.address)}`,
      lastModified: motel.created_at ? new Date(motel.created_at) : undefined,
      changeFrequency: 'weekly',
      priority: 0.9,
    })) || []

  return [...staticRoutes, ...motelRoutes]
}
