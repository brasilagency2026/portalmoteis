import type { MetadataRoute } from 'next'

const appBaseUrl = 'https://moteis.bdsmbrazil.com.br'

// Detect if running on a Vercel preview/staging domain
const isVercelDomain =
  process.env.VERCEL_URL && process.env.VERCEL_URL.includes('vercel.app')

export default function robots(): MetadataRoute.Robots {
  if (isVercelDomain) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

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
