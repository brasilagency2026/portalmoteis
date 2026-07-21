import type { MetadataRoute } from 'next'

const appBaseUrl = 'https://moteis.bdsmbrazil.com.br'

// Bloquer uniquement les previews Vercel (staging), pas la production
const isVercelPreview =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'

export default function robots(): MetadataRoute.Robots {
  if (isVercelPreview) {
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
