import type { Metadata } from 'next';
import './globals.css'; // Global styles
import ConditionalHeader from '@/components/ConditionalHeader';
import { ThemeProvider } from '@/components/ThemeContext';

export const metadata: Metadata = {
  title: 'BDSMBRAZIL - Moteis',
  description: 'Encontre os melhores motéis no BDSMBRAZIL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors">
        <ThemeProvider>
          <ConditionalHeader />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
