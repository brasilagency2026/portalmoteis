import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css'; // Global styles
import ConditionalHeader from '@/components/ConditionalHeader';

const appBaseUrl = 'https://moteis.bdsmbrazil.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
  title: {
    default: 'Motéis BDSM | Suite Fetiche BDSM | BDSMBRAZIL',
    template: '%s | Suite Fetiche BDSM | BDSMBRAZIL',
  },
  description: 'Encontre motéis BDSM e suítes fetiche BDSM no Brasil com foco em discrição, localização et services spécialisés.',
  keywords: ['motéis BDSM', 'suite fetiche BDSM', 'motéis no Brasil', 'motel BDSM', 'suíte fetish', 'discrição'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: appBaseUrl,
    siteName: 'BDSMBRAZIL',
    title: 'Motéis BDSM | Suite Fetiche BDSM | BDSMBRAZIL',
    description: 'Descubra motéis BDSM e suítes fetiche BDSM no Brasil com busca por localização e filtros práticos.',
    images: [
      {
        url: `${appBaseUrl}/moteisbdsm.png`,
        width: 1200,
        height: 630,
        alt: 'Motéis BDSM | Suite Fetiche BDSM | BDSMBRAZIL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motéis BDSM | Suite Fetiche BDSM | BDSMBRAZIL',
    description: 'Descubra motéis BDSM e suítes fetiche BDSM no Brasil com busca por localização e filtros práticos.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <ConditionalHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
