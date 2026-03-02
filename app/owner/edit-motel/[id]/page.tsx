'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, AlertCircle, Eye, Trash2, Upload } from 'lucide-react'

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
  const [existingPhotos, setExistingPhotos] = useState<string[]>([])
  const [newPhotos, setNewPhotos] = useState<File[]>([])
  const [removedStoragePaths, setRemovedStoragePaths] = useState<string[]>([])

  const sanitizeFileName = (originalName: string): string => {
    const normalized = originalName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/-+/g, '-')

    return normalized.length > 0 ? normalized : `photo-${Date.now()}.jpg`
  }

  const extractStoragePath = (publicUrl: string): string | null => {
    const marker = '/storage/v1/object/public/motel-photos/'
    const markerIndex = publicUrl.indexOf(marker)

    if (markerIndex === -1) return null

    return decodeURIComponent(publicUrl.substring(markerIndex + marker.length))
  }

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
          .select('name, state, city, address, phone, whatsapp, operating_hours, description, website, instagram, facebook, owner_id, photos')
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

        const motelPhotos = Array.isArray(motel.photos)
          ? motel.photos.filter((photo: unknown): photo is string => typeof photo === 'string')
          : []

        setExistingPhotos(motelPhotos)
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

  const handleNewPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const selected = Array.from(files)
    const validFiles = selected.filter((file) => file.type.startsWith('image/'))
    const invalidCount = selected.length - validFiles.length

    const tooLarge = validFiles.filter((file) => file.size > 10 * 1024 * 1024)
    const accepted = validFiles.filter((file) => file.size <= 10 * 1024 * 1024)

    if (invalidCount > 0) {
      setError('Alguns arquivos foram ignorados: selecione apenas imagens.')
    } else if (tooLarge.length > 0) {
      setError('Algumas imagens excedem 10MB e foram ignoradas.')
    } else {
      setError(null)
    }

    if (accepted.length > 0) {
      setNewPhotos((prev) => [...prev, ...accepted])
    }

    e.target.value = ''
  }

  const handleRemoveNewPhoto = (index: number) => {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveExistingPhoto = (index: number) => {
    setExistingPhotos((prev) => {
      const targetUrl = prev[index]
      const storagePath = extractStoragePath(targetUrl)

      if (storagePath) {
        setRemovedStoragePaths((current) => (current.includes(storagePath) ? current : [...current, storagePath]))
      }

      return prev.filter((_, i) => i !== index)
    })
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

      const uploadedPhotoUrls: string[] = []
      if (newPhotos.length > 0) {
        for (let index = 0; index < newPhotos.length; index++) {
          const file = newPhotos[index]
          const safeName = sanitizeFileName(file.name)
          const fileName = `${user.id}/${Date.now()}-${index}-${safeName}`

          const { error: uploadError } = await supabase.storage
            .from('motel-photos')
            .upload(fileName, file)

          if (uploadError) {
            throw new Error(`Erro ao enviar ${file.name}: ${uploadError.message}`)
          }

          const { data: publicData } = supabase.storage
            .from('motel-photos')
            .getPublicUrl(fileName)

          uploadedPhotoUrls.push(publicData.publicUrl)
        }
      }

      const finalPhotos = [...existingPhotos, ...uploadedPhotoUrls]

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
          photos: finalPhotos,
        })
        .eq('id', motelId)
        .eq('owner_id', user.id)

      if (updateError) throw updateError

      if (removedStoragePaths.length > 0) {
        await supabase.storage.from('motel-photos').remove(removedStoragePaths)
      }

      setMessage('Motel atualizado com sucesso!')
      setNewPhotos([])
      setRemovedStoragePaths([])
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Fotos atuais</label>
              {existingPhotos.length === 0 ? (
                <p className="text-sm text-gray-400">Nenhuma foto cadastrada.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {existingPhotos.map((photoUrl, index) => (
                    <div key={`${photoUrl}-${index}`} className="bg-gray-800 border border-gray-700 rounded-lg p-2">
                      <img src={photoUrl} alt={`Foto ${index + 1}`} className="w-full h-28 object-cover rounded" />
                      <div className="mt-2 flex gap-2">
                        <a
                          href={photoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-blue-700 hover:bg-blue-600 rounded"
                        >
                          <Eye size={14} />
                          Ver
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingPhoto(index)}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs bg-red-700 hover:bg-red-600 rounded"
                        >
                          <Trash2 size={14} />
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Adicionar novas fotos</label>
              <label className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-600 rounded-lg bg-gray-800/60 hover:bg-gray-800 cursor-pointer">
                <Upload size={16} />
                Selecionar imagens
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleNewPhotoSelect} />
              </label>

              {newPhotos.length > 0 && (
                <div className="mt-3 space-y-2">
                  {newPhotos.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
                      <span className="text-gray-200 truncate pr-3">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewPhoto(index)}
                        className="inline-flex items-center gap-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
