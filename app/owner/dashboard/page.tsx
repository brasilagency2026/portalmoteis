'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Plus, Edit2, Eye, Trash2, AlertCircle, Sparkles, TrendingUp, Crown } from 'lucide-react'
import { buildMotelPath } from '@/lib/utils'

interface Motel {
  id: string
  name: string
  city: string
  address?: string
  status: 'active' | 'inactive' | 'pending'
  plan: 'free' | 'premium'
  created_at: string
}

interface UserProfile {
  id: string
  email: string
  role: string
  motel_id: string | null
}

export default function OwnerDashboard() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [user, setUser] = useState<UserProfile | null>(null)
  const [motel, setMotel] = useState<Motel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !authUser) {
          router.push('/login/proprietario')
          return
        }

        // Get user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single()

        let profile = userData
        if (userError || !userData) {
          const { data: createdUser, error: createUserError } = await supabase
            .from('users')
            .upsert(
              {
                id: authUser.id,
                email: authUser.email,
                role: 'proprietario',
              },
              { onConflict: 'id' }
            )
            .select('*')
            .single()

          if (createUserError || !createdUser) {
            setError('Erro ao carregar perfil')
            return
          }

          profile = createdUser
        }

        setUser(profile)

        // If user has a motel, fetch it
        if (profile.motel_id) {
          const { data: motelData, error: motelError } = await supabase
            .from('motels')
            .select('*')
            .eq('id', profile.motel_id)
            .single()

          if (!motelError && motelData) {
            setMotel(motelData)
          }
        }
      } catch (err: any) {
        setError('Erro ao carregar dados: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen neon-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen neon-bg text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl neon-text">
            BDSMBRAZIL
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-red-500/50 transition-all"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao seu painel</h1>
          <p className="text-gray-400">
            Gerencie seu motel, edite informações e acompanhe o desempenho
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* No Motel Yet */}
        {!motel ? (
          <div className="bg-gray-900 border border-red-500/50 rounded-lg p-8 text-center neon-card">
            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-400 opacity-40" />
            <h2 className="text-2xl font-bold mb-2">Nenhum motel cadastrado ainda</h2>
            <p className="text-gray-400 mb-8">
              Você precisa cadastrar um motel para começar a divulgação. Crie seu primeiro anúncio agora!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/owner/create-motel"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-green-500/50 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                <Sparkles size={22} className="relative z-10" />
                <span className="relative z-10">Cadastrar Meu Motel</span>
              </Link>
              <Link
                href="/owner"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 hover:from-yellow-600 hover:via-orange-600 hover:to-orange-700 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-yellow-500/60 hover:scale-105 text-black overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                <Crown size={22} className="group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">Ver Planos</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Motel Card */}
            <div className="bg-gray-900 border border-red-500/50 rounded-lg p-6 neon-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{motel.name}</h2>
                  <p className="text-gray-400">{motel.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                    motel.status === 'active'
                      ? 'bg-green-900/30 border-green-600/50 text-green-300'
                      : motel.status === 'pending'
                      ? 'bg-yellow-900/30 border-yellow-600/50 text-yellow-300'
                      : 'bg-gray-900/30 border-gray-600/50 text-gray-300'
                  }`}>
                    {motel.status === 'active' ? 'Ativo' : motel.status === 'pending' ? 'Pendente' : 'Inativo'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                    motel.plan === 'premium'
                      ? 'bg-purple-900/30 border-purple-600/50 text-purple-300'
                      : 'bg-blue-900/30 border-blue-600/50 text-blue-300'
                  }`}>
                    {motel.plan === 'premium' ? 'Premium' : 'Gratuito'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Action Buttons (supprimées avec stats) */}
            </div>

            {/* Help Section */}
            <div className="bg-gray-900 border border-yellow-600/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">💡 Dicas para aumentar visibilidade</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✓ Use fotos em alta qualidade (qualidade Premium recomendada)</li>
                <li>✓ Mantenha seus horários de funcionamento atualizados</li>
                <li>✓ Deixe seu WhatsApp sempre ativo para respostas rápidas</li>
                <li>✓ Atualize sua descrição regularmente com novos serviços</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
