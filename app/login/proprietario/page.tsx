'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn, UserPlus } from 'lucide-react'

export default function ProprietarioLoginPage() {
  const searchParams = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(searchParams?.get('signup') === 'true')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      if (isSignUp) {
        // Validação
        if (password !== confirmPassword) {
          setError('Senhas não correspondem')
          setLoading(false)
          return
        }

        if (password.length < 6) {
          setError('Senha deve ter pelo menos 6 caracteres')
          setLoading(false)
          return
        }

        // Sign up
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              role: 'proprietario',
            },
          },
        })

        if (signUpError) throw signUpError

        // A trigger na Supabase irá criar o usuário na tabela users com role 'proprietario'
        setMessage(
          'Cadastro realizado! Um email de confirmação foi enviado. Por favor, confirme seu email para continuar.'
        )
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          router.push('/owner')
        }, 2000)
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError

        // Redireciona para dashboard do proprietário
        router.push('/owner/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro durante a autenticação')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar com Google')
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
          <p className="text-gray-400 mt-2">Portal de Motéis BDSM</p>
          <p className="text-white font-semibold mt-4 text-lg">
            {isSignUp ? 'Criar sua conta' : 'Entrar'}
          </p>
        </div>

        {/* Card */}
        <div className="border border-red-500/50 rounded-lg p-8 bg-gray-900/80 backdrop-blur-sm neon-card">
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-6 mb-6 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#1F2937" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#1F2937" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#1F2937" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#1F2937" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="seu@email.com"
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

            {/* Confirm Password (só em signup) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  placeholder="••••••"
                />
              </div>
            )}

            {/* Messages */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-300 text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-900/20 border border-green-500/50 rounded text-green-300 text-sm">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all overflow-hidden flex items-center justify-center gap-3 ${
                loading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-2xl hover:shadow-red-500/60 hover:scale-105'
              }`}
            >
              {!loading && (
                <>
                  {/* Effet de brillance */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                  
                  {isSignUp ? (
                    <UserPlus size={22} className="relative z-10" />
                  ) : (
                    <LogIn size={22} className="relative z-10" />
                  )}
                </>
              )}
              <span className="relative z-10">
                {loading ? 'Processando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
              </span>
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setMessage(null)
                }}
                className="text-red-500 hover:text-red-400 font-semibold transition"
              >
                {isSignUp ? 'Entrar' : 'Cadastrar'}
              </button>
            </p>
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
