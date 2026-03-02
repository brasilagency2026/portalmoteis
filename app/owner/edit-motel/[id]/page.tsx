'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'

type MotelForm = {
  name: string
  state: string
  city: string
  address: string
  phone: string
  whatsapp: string
  operating_hours: string
  description: string
  website: string
  instagram: string
  facebook: string
}

const initialForm: MotelForm = {
  name: '',
  state: '',
  city: '',
  address: '',
  phone: '',
  whatsapp: '',
  operating_hours: '10:00 - 23:00',
  description: '',
  website: '',
  instagram: '',
  facebook: '',
}

export default function EditMotelPage() {
  const params = useParams()
  const router = useRouter()
  const motelIdRaw = params?.id
  const motelId = Array.isArray(motelIdRaw) ? motelIdRaw[0] : motelIdRaw

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<MotelForm>(initialForm)

  useEffect(() => {
    const loadMotel = async () => {
      try {
        setError(null)

        if (!motelId) {
          setError('ID do motel inválido')
          setLoading(false)
          return
        }

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push('/login/proprietario')
          return
        }

        const { data: motel, error: motelError } = await supabase
          .from('motels')
          .select('name, state, city, address, phone, whatsapp, operating_hours, description, website, instagram, facebook, owner_id')
          .eq('id', motelId)
          .eq('owner_id', user.id)
          .single()

        if (motelError || !motel) {
          setError('Você não tem permissão para editar este motel ou ele não existe.')
          setLoading(false)
          return
        }

        setFormData({
          name: motel.name || '',
          state: motel.state || '',
          city: motel.city || '',
          address: motel.address || '',
          phone: motel.phone || '',
          whatsapp: motel.whatsapp || '',
          operating_hours: motel.operating_hours || '10:00 - 23:00',
          description: motel.description || '',
          website: motel.website || '',
          instagram: motel.instagram || '',
          facebook: motel.facebook || '',
        })
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar motel')
      } finally {
        setLoading(false)
      }
    }

    loadMotel()
  }, [motelId, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setSaving(true)

    try {
      if (!motelId) {
        throw new Error('ID do motel inválido')
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/login/proprietario')
        return
      }

      const { error: updateError } = await supabase
        .from('motels')
        .update({
          name: formData.name,
          state: formData.state,
          city: formData.city,
          address: formData.address,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          operating_hours: formData.operating_hours,
          description: formData.description,
          website: formData.website || null,
          instagram: formData.instagram || null,
          facebook: formData.facebook || null,
        })
        .eq('id', motelId)
        .eq('owner_id', user.id)

      if (updateError) throw updateError

      setMessage('Motel atualizado com sucesso!')
      setTimeout(() => router.push('/owner/dashboard'), 900)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar motel')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen neon-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Carregando motel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen neon-bg text-white">
      <div className="bg-gray-900 border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/owner/dashboard" className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Editar Motel</h1>
          <p className="text-gray-400">Atualize as informações do seu estabelecimento</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded text-green-300">
            {message}
          </div>
        )}

        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 border border-red-500/50 rounded-lg p-8 neon-card">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Motel *</label>
              <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado *</label>
                <input name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cidade *</label>
                <input name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Endereço *</label>
              <input name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Horário de funcionamento</label>
              <input name="operating_hours" value={formData.operating_hours} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <input name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                <input name="instagram" value={formData.instagram} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                <input name="facebook" value={formData.facebook} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition" />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                saving
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/50'
              }`}
            >
              <Save size={18} />
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
