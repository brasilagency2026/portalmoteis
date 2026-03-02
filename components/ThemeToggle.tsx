'use client'

import { useTheme } from '@/components/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white/80 dark:bg-zinc-900/70 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-100 hover:bg-zinc-100 hover:dark:bg-zinc-800 transition-colors"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? (
        <>
          <Sun size={14} />
          <span className="hidden sm:inline">Claro</span>
        </>
      ) : (
        <>
          <Moon size={14} />
          <span className="hidden sm:inline">Escuro</span>
        </>
      )}
    </button>
  )
}

