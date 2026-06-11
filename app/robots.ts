import type { MetadataRoute } from 'next'

const rawAppBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.trim() !== ''
    ? process.env.NEXT_PUBLIC_APP_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://moteis.bdsmbrazil.com.br'
const appBaseUrl = rawAppBaseUrl.replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'facebot',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${appBaseUrl}/sitemap.xml`,
    host: appBaseUrl,
  }
}
