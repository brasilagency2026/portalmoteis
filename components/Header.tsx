'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@supabase/ssr'
import { LogOut, User } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white/95 dark:bg-black text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="https://i.ibb.co/NdHzfGQ6/symbolbdsmtransparent.png" 
            alt="BDSMBRAZIL Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <span className="font-bold text-xl tracking-wider neon-text">BDSMBRAZIL</span>
        </Link>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <Link href="/owner/dashboard" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <User size={20} />
                <span className="hidden sm:inline">Painel</span>
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <LogOut size={20} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </>
          ) : (
            <Link href="/login/proprietario" className="btn-3d-red hover:bg-red-700">
              Entrar / Cadastrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
