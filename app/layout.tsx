import type { Metadata } from 'next';
import './globals.css'; // Global styles
import ConditionalHeader from '@/components/ConditionalHeader';

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://moteis.bdsmbrazil.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
  title: {
    default: 'Motéis BDSM | BDSMBRAZIL',
    template: '%s | BDSMBRAZIL',
  },
  description: 'Encontre motéis BDSM com foco em discrição, localização e serviços especializados no Brasil.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: appBaseUrl,
    siteName: 'BDSMBRAZIL',
    title: 'Motéis BDSM | BDSMBRAZIL',
    description: 'Descubra motéis BDSM no Brasil com busca por localização e filtros práticos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motéis BDSM | BDSMBRAZIL',
    description: 'Descubra motéis BDSM no Brasil com busca por localização e filtros práticos.',
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
        <ConditionalHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
