'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      // Vérifier le rôle - doit être admin ou super_admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', authData.user.id)
        .single()

      if (userError || !userData) {
        throw new Error('Usuário não encontrado no sistema')
      }

      if (userData.role !== 'admin' && userData.role !== 'super_admin') {
        // Sign out imédiatement
        await supabase.auth.signOut()
        throw new Error('Acesso negado: apenas administradores podem acessar')
      }

      // Redireciona para dashboard admin
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center px-4">
      {/* Fundo neon */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold neon-text hover:opacity-80 transition">
              BDSMBRAZIL
            </h1>
          </Link>
          <p className="text-gray-400 mt-2">Painel de Administração</p>
        </div>

        {/* Card */}
        <div className="border border-red-500/50 rounded-lg p-8 bg-gray-900/80 backdrop-blur-sm neon-card">
          {/* Warning */}
          <div className="flex items-start gap-2 p-3 mb-6 bg-yellow-900/20 border border-yellow-600/50 rounded text-sm">
            <span className="text-lg">⚠️</span>
            <p className="text-yellow-300">
              Este painel é restrito a administradores. Acesso não autorizado será registrado.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email de Administrador
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="admin@bdsmbrazil.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                loading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 btn-3d-red shadow-lg shadow-red-600/50'
              }`}
            >
              {loading ? 'Conectando...' : 'Acessar Painel'}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <Link href="/" className="text-red-500 hover:text-red-400 font-semibold transition text-sm">
              ← Voltar ao portal
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 BDSMBRAZIL. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
