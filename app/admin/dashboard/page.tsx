'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Users, Home, AlertCircle, MoreVertical } from 'lucide-react'
import { buildMotelPath } from '@/lib/utils'

interface User {
  id: string
  email: string
  role: string
  motel_id: string | null
  created_at: string
}

interface Motel {
  id: string
  name: string
  city: string
  address?: string
  status: 'active' | 'inactive' | 'pending'
  plan: 'free' | 'premium'
  created_at: string
}

interface Stats {
  totalUsers: number
  totalMotels: number
  activeMotels: number
  premiumMotels: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [userRole, setUserRole] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalMotels: 0,
    activeMotels: 0,
    premiumMotels: 0,
  })
  const [users, setUsers] = useState<User[]>([])
  const [motels, setMotels] = useState<Motel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'motels' | 'payments'>('overview')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !authUser) {
          router.push('/login/admin')
          return
        }

        // Get user role
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', authUser.id)
          .single()

        if (userError || !userData) {
          setError('Erro ao verificar permissões')
          return
        }

        if (userData.role !== 'admin' && userData.role !== 'super_admin') {
          router.push('/')
          return
        }

        setUserRole(userData.role)

        // Fetch all users
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (!usersError && usersData) {
          setUsers(usersData)
        }

        // Fetch all motels
        const { data: motelsData, error: motelsError } = await supabase
          .from('motels')
          .select('*')
          .order('created_at', { ascending: false })

        if (!motelsError && motelsData) {
          setMotels(motelsData)

          // Calculate stats
          setStats({
            totalUsers: usersData?.length || 0,
            totalMotels: motelsData.length,
            activeMotels: motelsData.filter(m => m.status === 'active').length,
            premiumMotels: motelsData.filter(m => m.plan === 'premium').length,
          })
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

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error

      setUsers(users.filter(u => u.id !== userId))
    } catch (err: any) {
      alert('Erro ao deletar usuário: ' + err.message)
    }
  }

  const handleUpdateMotelStatus = async (motelId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('motels')
        .update({ status: newStatus })
        .eq('id', motelId)

      if (error) throw error

      setMotels(motels.map(m => 
        m.id === motelId ? { ...m, status: newStatus as any } : m
      ))
    } catch (err: any) {
      alert('Erro ao atualizar motel: ' + err.message)
    }
  }

  const handleDeleteMotel = async (motelId: string) => {
    if (!confirm('Tem certeza que deseja deletar este motel? Esta ação é irreversível.')) return
    
    try {
      const { error } = await supabase
        .from('motels')
        .delete()
        .eq('id', motelId)

      if (error) throw error

      setMotels(motels.filter(m => m.id !== motelId))
    } catch (err: any) {
      alert('Erro ao deletar motel: ' + err.message)
    }
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
            <span className="text-sm text-gray-300">Admin Panel • {userRole === 'super_admin' ? '🛡️ Super Admin' : '👤 Admin'}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition"
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
          <h1 className="text-3xl font-bold text-white mb-2">Painel de Administração</h1>
          <p className="text-gray-400">
            Gerencie usuários, motéis e acompanhe as estatísticas da plataforma
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total de Usuários</p>
            <p className="text-3xl font-bold neon-green-text">{stats.totalUsers}</p>
          </div>
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total de Motéis</p>
            <p className="text-3xl font-bold neon-green-text">{stats.totalMotels}</p>
          </div>
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Motéis Ativos</p>
            <p className="text-3xl font-bold text-green-400">{stats.activeMotels}</p>
          </div>
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Premium</p>
            <p className="text-3xl font-bold text-purple-400">{stats.premiumMotels}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Users size={18} />
            Usuários ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('motels')}
            className={`px-4 py-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'motels'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Home size={18} />
            Motéis ({motels.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'payments'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            💳 Pagamentos
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Últimos Usuários Inscritos</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {users.slice(0, 10).map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <p className="text-white font-semibold">{user.email}</p>
                      <p className="text-xs text-gray-400">Rol: {user.role}</p>
                    </div>
                    <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Últimos Motéis Cadastrados</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {motels.slice(0, 10).map(motel => (
                  <div key={motel.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <p className="text-white font-semibold">{motel.name}</p>
                      <p className="text-xs text-gray-400">{motel.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        motel.status === 'active'
                          ? 'bg-green-900/30 text-green-300'
                          : motel.status === 'pending'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : 'bg-gray-900/30 text-gray-300'
                      }`}>
                        {motel.status === 'active' ? 'Ativo' : motel.status === 'pending' ? 'Pendente' : 'Inativo'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        motel.plan === 'premium'
                          ? 'bg-purple-900/30 text-purple-300'
                          : 'bg-blue-900/30 text-blue-300'
                      }`}>
                        {motel.plan === 'premium' ? 'Premium' : 'Gratuito'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-900 border border-red-500/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700">
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Rol</th>
                    <th className="px-6 py-3 text-left font-semibold">Motel ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Cadastrado em</th>
                    <th className="px-6 py-3 text-center font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.role === 'super_admin'
                            ? 'bg-purple-900/30 text-purple-300'
                            : user.role === 'admin'
                            ? 'bg-red-900/30 text-red-300'
                            : 'bg-blue-900/30 text-blue-300'
                        }`}>
                          {user.role === 'super_admin' ? '🛡️ Super Admin' : user.role === 'admin' ? '👤 Admin' : '🏠 Proprietário'}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs">{user.motel_id || '-'}</td>
                      <td className="px-6 py-3 text-gray-400">{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 transition"
                          title="Deletar usuário"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'motels' && (
          <div className="bg-gray-900 border border-red-500/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700">
                    <th className="px-6 py-3 text-left font-semibold">Nome</th>
                    <th className="px-6 py-3 text-left font-semibold">Cidade</th>
                    <th className="px-6 py-3 text-left font-semibold">Plano</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Cadastrado em</th>
                    <th className="px-6 py-3 text-center font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {motels.map(motel => (
                    <tr key={motel.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-3">{motel.name}</td>
                      <td className="px-6 py-3">{motel.city}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          motel.plan === 'premium'
                            ? 'bg-purple-900/30 text-purple-300'
                            : 'bg-blue-900/30 text-blue-300'
                        }`}>
                          {motel.plan === 'premium' ? 'Premium' : 'Gratuito'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <select
                          value={motel.status}
                          onChange={(e) => handleUpdateMotelStatus(motel.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-semibold bg-transparent border ${
                            motel.status === 'active'
                              ? 'border-green-600 text-green-300'
                              : motel.status === 'pending'
                              ? 'border-yellow-600 text-yellow-300'
                              : 'border-gray-600 text-gray-300'
                          }`}
                        >
                          <option value="active">Ativo</option>
                          <option value="pending">Pendente</option>
                          <option value="inactive">Inativo</option>
                        </select>
                      </td>
                      <td className="px-6 py-3 text-gray-400">{new Date(motel.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={buildMotelPath(motel.name, motel.id, motel.address)}
                            target="_blank"
                            className="text-blue-400 hover:text-blue-300 transition text-xs px-2 py-1 rounded border border-blue-600"
                            title="Ver motel"
                          >
                            Ver
                          </Link>
                          <button
                            onClick={() => handleDeleteMotel(motel.id)}
                            className="text-red-400 hover:text-red-300 transition text-xs px-2 py-1 rounded border border-red-600"
                            title="Deletar motel"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">💳 Sistema de Pagamentos PayPal</p>
              <p className="text-gray-300 mb-6">Os pagamentos premium são processados pelo PayPal Subscriptions API.</p>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2"><strong>Total Motéis Premium:</strong></p>
                  <p className="text-2xl font-bold text-purple-400">{stats.premiumMotels}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2"><strong>Receita Potencial Mensal:</strong></p>
                  <p className="text-2xl font-bold text-green-400">R$ {(stats.premiumMotels * 199).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-8 text-left max-w-2xl mx-auto">
                <h3 className="text-lg font-bold mb-4">Últimos Motéis Premium Cadastrados</h3>
                <div className="space-y-2">
                  {motels
                    .filter(m => m.plan === 'premium')
                    .slice(0, 5)
                    .map(motel => (
                      <div key={motel.id} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-purple-600/30">
                        <div>
                          <p className="text-white font-semibold">{motel.name}</p>
                          <p className="text-xs text-gray-400">{motel.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-purple-400 font-semibold">Premium</p>
                          <p className="text-xs text-gray-500">{new Date(motel.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    ))}
                  {motels.filter(m => m.plan === 'premium').length === 0 && (
                    <p className="text-gray-400 text-center py-4">Nenhum motel premium cadastrado ainda</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
