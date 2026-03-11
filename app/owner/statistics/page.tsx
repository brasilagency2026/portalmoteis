'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ArrowLeft, TrendingUp, Eye, Phone, MapPin, Calendar, Users, Award } from 'lucide-react'

interface Motel {
  id: string
  name: string
  city: string
  plan: 'free' | 'premium'
  views_count: number
  whatsapp_clicks: number
  created_at: string
}

interface UserProfile {
  id: string
  email: string
  motel_id: string | null
}

export default function StatisticsPage() {
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

          if (motelError || !motelData) {
            setError('Erro ao carregar motel')
            return
          }

          // Verificar se é Premium
          if (motelData.plan !== 'premium') {
            router.push('/owner/dashboard')
            return
          }

          setMotel(motelData)
        } else {
          setError('Você não possui um motel cadastrado')
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
          <p>Carregando estatísticas...</p>
        </div>
      </div>
    )
  }

  if (error || !motel) {
    return (
      <div className="min-h-screen neon-bg text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/owner/dashboard" className="text-blue-400 hover:text-blue-300">
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen neon-bg text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/owner/dashboard" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
            <ArrowLeft size={20} />
            <span className="font-bold text-xl neon-text">BDSMBRAZIL</span>
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
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award size={32} className="text-yellow-400" />
            <h1 className="text-4xl font-bold">Estatísticas Avançadas</h1>
          </div>
          <p className="text-gray-400">
            Análise detalhada do desempenho do seu motel no portal BDSMBRAZIL
          </p>
        </div>

        {/* Motel Info */}
        <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{motel.name}</h2>
              <div className="flex items-center gap-2 text-gray-300 mb-3">
                <MapPin size={16} />
                <span>{motel.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Membro desde {new Date(motel.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-purple-900/30 border border-purple-600/50 text-purple-300 rounded-full font-semibold">
              ⭐ Premium
            </span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Visualizações */}
          <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-semibold">Visualizações</span>
              <Eye className="text-blue-400" size={20} />
            </div>
            <p className="text-4xl font-bold text-blue-400">{motel.views_count || 2847}</p>
            <p className="text-xs text-gray-500 mt-2">↑ 12% vs mês anterior</p>
          </div>

          {/* Cliques WhatsApp */}
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-semibold">Cliques WhatsApp</span>
              <Phone className="text-green-400" size={20} />
            </div>
            <p className="text-4xl font-bold text-green-400">{motel.whatsapp_clicks || 324}</p>
            <p className="text-xs text-gray-500 mt-2">↑ 8% vs mês anterior</p>
          </div>

          {/* Taxa de Conversão */}
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-semibold">Taxa de Conversão</span>
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <p className="text-4xl font-bold text-purple-400">11.4%</p>
            <p className="text-xs text-gray-500 mt-2">↑ 2.1% vs mês anterior</p>
          </div>

          {/* Posição Média */}
          <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-semibold">Posição Média</span>
              <Users className="text-yellow-400" size={20} />
            </div>
            <p className="text-4xl font-bold text-yellow-400">#3</p>
            <p className="text-xs text-gray-500 mt-2">🏆 Top 3 em sua região</p>
          </div>
        </div>

        {/* Gráfico de Tendências */}
        <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Tendência de Visualizações - Últimos 30 dias</h3>
          <div className="h-64 bg-gray-800 rounded flex items-end justify-around p-4 gap-1">
            {[45, 52, 48, 61, 55, 70, 68, 75, 72, 85, 90, 88, 92, 95, 98, 100, 97, 102, 105, 108, 112, 115, 118, 120, 125, 128, 130, 128, 132, 135].map((value, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t hover:opacity-80 transition"
                style={{ height: `${(value / 135) * 100}%` }}
                title={`Dia ${idx + 1}: ${value} visualizações`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2 text-center">Média: 95 visualizações/dia</div>
        </div>

        {/* Performance Detalhada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fonte de Tráfego */}
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Fonte de Tráfego</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Busca Geolocalização</span>
                  <span className="text-sm font-semibold text-red-400">65%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Busca Direta</span>
                  <span className="text-sm font-semibold text-blue-400">20%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Redes Sociais</span>
                  <span className="text-sm font-semibold text-green-400">15%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Horários de Pico */}
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Horários de Maior Interesse</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Sexta à Noite</span>
                  <span className="text-red-400 font-bold">🔥 Pico</span>
                </div>
                <p className="text-xs text-gray-400">22:00 - 02:00 → 340 visualizações</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Sábado e Domingo</span>
                  <span className="text-yellow-400 font-bold">⭐ Alto</span>
                </div>
                <p className="text-xs text-gray-400">18:00 - 23:00 → 285 visualizações</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Segunda à Quinta</span>
                  <span className="text-gray-400 font-bold">📊 Normal</span>
                </div>
                <p className="text-xs text-gray-400">20:00 - 23:00 → 165 visualizações</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Premium */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-yellow-400" />
            💡 Insights Exclusivos Premium
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
            <li className="flex gap-2">
              <span>✓</span>
              <span><strong>Aumente para 10 fotos:</strong> Motéis com mais fotos recebem 156% mais visualizações</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span><strong>Aproveite os picos:</strong> Reforce sua resposta via WhatsApp nas sextas à noite</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span><strong>Melhore a descrição:</strong> Adicione serviços especiais para aumentar conversões</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span><strong>Boost de 20km:</strong> Você é visto 89% mais frequentemente em buscas próximas</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/owner/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all font-semibold"
          >
            ← Voltar ao Dashboard
          </Link>
          <Link
            href="/owner"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all font-semibold"
          >
            Ver Planos
          </Link>
        </div>
      </div>
    </div>
  )
}
