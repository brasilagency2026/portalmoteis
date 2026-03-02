import type { Metadata } from 'next';
import './globals.css'; // Global styles
import ConditionalHeader from '@/components/ConditionalHeader';

export const metadata: Metadata = {
  title: 'BDSMBRAZIL - Moteis',
  description: 'Encontre os melhores motéis no BDSMBRAZIL',
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
