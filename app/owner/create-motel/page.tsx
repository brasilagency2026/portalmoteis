'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Upload, Image as ImageIcon, MapPin } from 'lucide-react'

// Déclaration TypeScript pour Google Maps
declare global {
  interface Window {
    google: any
  }
}

export default function CreateMotelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950" />}>
      <CreateMotelContent />
    </Suspense>
  )
}

function CreateMotelContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free')
  const plan = (searchParams?.get('plan') as 'free' | 'premium') || userPlan
  const maxPhotos = plan === 'premium' ? 15 : 5
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<string[]>([])
  const [serviceInput, setServiceInput] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [geolocating, setGeolocating] = useState(false)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [mapsError, setMapsError] = useState<string | null>(null)
  const [mapsReady, setMapsReady] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState<Array<{ description: string; placeId: string }>>([])
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false)
  const [loadingAddressSuggestions, setLoadingAddressSuggestions] = useState(false)
  const [addressSuggestionNotice, setAddressSuggestionNotice] = useState<string | null>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
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
  })
  // Vérifier si l'utilisateur a pending_premium
  useEffect(() => {
    const checkPendingPremium = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: userData } = await supabase
        .from('users')
        .select('pending_premium')
        .eq('id', user.id)
        .single()

      if (userData?.pending_premium) {
        setUserPlan('premium')
      }
    }
    checkPendingPremium()
  }, [supabase])
  // Estados do Brasil
  const brazilStates = [
    'Acre (AC)',
    'Alagoas (AL)',
    'Amapá (AP)',
    'Amazonas (AM)',
    'Bahia (BA)',
    'Ceará (CE)',
    'Distrito Federal (DF)',
    'Espírito Santo (ES)',
    'Goiás (GO)',
    'Maranhão (MA)',
    'Mato Grosso (MT)',
    'Mato Grosso do Sul (MS)',
    'Minas Gerais (MG)',
    'Pará (PA)',
    'Paraíba (PB)',
    'Paraná (PR)',
    'Pernambuco (PE)',
    'Piauí (PI)',
    'Rio de Janeiro (RJ)',
    'Rio Grande do Norte (RN)',
    'Rio Grande do Sul (RS)',
    'Rondônia (RO)',
    'Roraima (RR)',
    'Santa Catarina (SC)',
    'São Paulo (SP)',
    'Sergipe (SE)',
    'Tocantins (TO)',
  ]

  // Charger Google Maps Autocomplete
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    const applyAddressComponents = (place: any) => {
      if (!place?.address_components) return

      const location = place.geometry?.location
      if (location) {
        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        })
      }

      let street = ''
      let number = ''
      let city = ''
      let state = ''

      place.address_components.forEach((component: any) => {
        const types = component.types

        if (types.includes('route')) {
          street = component.long_name
        }
        if (types.includes('street_number')) {
          number = component.long_name
        }
        if (types.includes('administrative_area_level_2') || types.includes('locality')) {
          city = component.long_name
        }
        if (types.includes('administrative_area_level_1')) {
          const stateShort = component.short_name
          const stateLong = component.long_name
          state = `${stateLong} (${stateShort})`
        }
      })

      const fullAddress = number ? `${street}, ${number}` : street

      setFormData(prev => ({
        ...prev,
        address: fullAddress || place.formatted_address || prev.address,
        city: city || prev.city,
        state: state || prev.state
      }))
    }

    const loadGoogleMapsScript = () => {
      if (!apiKey) {
        setMapsError('Autocompletar indisponível: chave Google Maps não configurada.')
        return
      }

      if (typeof window !== 'undefined' && !window.google) {
        const existingScript = document.getElementById('google-maps-script') as HTMLScriptElement | null
        if (existingScript) {
          if (window.google?.maps?.places) {
            setMapsError(null)
            initAutocomplete()
          }
          return
        }

        const script = document.createElement('script')
        script.id = 'google-maps-script'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=pt-BR`
        script.async = true
        script.defer = true
        script.onload = () => {
          setMapsError(null)
          setMapsReady(true)
          initAutocomplete()
        }
        script.onerror = () => {
          setMapsError('Google Maps não carregou. Verifique a chave/API Places e as restrições de domínio.')
          setMapsReady(false)
        }
        document.head.appendChild(script)
      } else if (window.google) {
        setMapsError(null)
        setMapsReady(true)
        initAutocomplete()
      }
    }

    const initAutocomplete = () => {
      if (!addressInputRef.current || !window.google?.maps?.places?.Autocomplete) {
        setMapsError('Google Places indisponível. Ative Maps JavaScript API e Places API.')
        return
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: 'br' },
          fields: ['address_components', 'formatted_address', 'geometry'],
          types: ['geocode']
        }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (!place?.address_components) return
        applyAddressComponents(place)
      })
    }

    loadGoogleMapsScript()
  }, [])

  const handleAddressBlur = () => {
    const value = formData.address?.trim()
    if (!mapsReady || !value || value.length < 6 || !window.google?.maps?.Geocoder) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: `${value}, Brasil` }, (results: any, status: any) => {
      if (status !== 'OK' || !results?.[0]) return

      const place = results[0]
      const location = place.geometry?.location
      if (location) {
        setCoordinates({ lat: location.lat(), lng: location.lng() })
      }

      let city = ''
      let state = ''
      place.address_components?.forEach((component: any) => {
        const types = component.types
        if (types.includes('administrative_area_level_2') || types.includes('locality')) {
          city = component.long_name
        }
        if (types.includes('administrative_area_level_1')) {
          const stateShort = component.short_name
          const stateLong = component.long_name
          state = `${stateLong} (${stateShort})`
        }
      })

      setFormData((prev) => ({
        ...prev,
        city: city || prev.city,
        state: state || prev.state,
      }))
    })
  }

  useEffect(() => {
    const input = formData.address?.trim() || ''

    if (!mapsReady || !window.google?.maps?.places?.AutocompleteService || input.length < 3) {
      setAddressSuggestions([])
      setAddressSuggestionNotice(input.length >= 3 ? 'Google Places indisponível no momento.' : null)
      setLoadingAddressSuggestions(false)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setLoadingAddressSuggestions(true)
      setAddressSuggestionNotice(null)
      const service = new window.google.maps.places.AutocompleteService()

      const applyPredictions = (predictions: any[] | null | undefined, status: string) => {
        if (status === 'OK' && predictions?.length) {
          setAddressSuggestions(
            predictions.slice(0, 6).map((prediction: any) => ({
              description: prediction.description,
              placeId: prediction.place_id,
            }))
          )
          setAddressSuggestionNotice(null)
          return true
        }

        return false
      }

      service.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'br' },
          types: ['geocode'],
        },
        (predictions: any[], status: string) => {
          const hasPrimary = applyPredictions(predictions, status)
          if (hasPrimary) {
            setLoadingAddressSuggestions(false)
            return
          }

          service.getPlacePredictions(
            {
              input,
              componentRestrictions: { country: 'br' },
            },
            (fallbackPredictions: any[], fallbackStatus: string) => {
              setLoadingAddressSuggestions(false)
              const hasFallback = applyPredictions(fallbackPredictions, fallbackStatus)
              if (!hasFallback) {
                setAddressSuggestions([])
                setAddressSuggestionNotice('Nenhuma sugestão encontrada para este texto.')
              }
            }
          )
        }
      )
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [formData.address, mapsReady])

  const handleSelectAddressSuggestion = (suggestion: { description: string; placeId: string }) => {
    setFormData((prev) => ({ ...prev, address: suggestion.description }))
    setShowAddressSuggestions(false)
    setAddressSuggestions([])

    if (!window.google?.maps?.Geocoder) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ placeId: suggestion.placeId }, (results: any, status: any) => {
      if (status !== 'OK' || !results?.[0]) return

      const place = results[0]
      const location = place.geometry?.location
      if (location) {
        setCoordinates({ lat: location.lat(), lng: location.lng() })
      }

      let city = ''
      let state = ''
      let street = ''
      let number = ''

      place.address_components?.forEach((component: any) => {
        const types = component.types
        if (types.includes('route')) {
          street = component.long_name
        }
        if (types.includes('street_number')) {
          number = component.long_name
        }
        if (types.includes('administrative_area_level_2') || types.includes('locality')) {
          city = component.long_name
        }
        if (types.includes('administrative_area_level_1')) {
          const stateShort = component.short_name
          const stateLong = component.long_name
          state = `${stateLong} (${stateShort})`
        }
      })

      const fullAddress = number ? `${street}, ${number}` : street

      setFormData((prev) => ({
        ...prev,
        address: fullAddress || suggestion.description || prev.address,
        city: city || prev.city,
        state: state || prev.state,
      }))
    })
  }

  // Géolocalisation
  const handleGeolocation = async () => {
    setGeolocating(true)
    setError(null)

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocalização não é suportada pelo seu navegador')
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          // Usar Google Maps Geocoding API
          const geocoder = new window.google.maps.Geocoder()
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any, status: any) => {
            if (status === 'OK' && results[0]) {
              setCoordinates({ lat: latitude, lng: longitude })
              const place = results[0]
              let street = ''
              let number = ''
              let city = ''
              let state = ''

              place.address_components.forEach((component: any) => {
                const types = component.types
                
                if (types.includes('route')) {
                  street = component.long_name
                }
                if (types.includes('street_number')) {
                  number = component.long_name
                }
                if (types.includes('administrative_area_level_2') || types.includes('locality')) {
                  city = component.long_name
                }
                if (types.includes('administrative_area_level_1')) {
                  const stateShort = component.short_name
                  const stateLong = component.long_name
                  state = `${stateLong} (${stateShort})`
                }
              })

              const fullAddress = number ? `${street}, ${number}` : street

              setFormData(prev => ({
                ...prev,
                address: fullAddress || place.formatted_address || '',
                city: city || prev.city,
                state: state || prev.state
              }))

              setError(null)
            } else {
              throw new Error('Não foi possível encontrar o endereço')
            }
            setGeolocating(false)
          })
        },
        (error) => {
          setGeolocating(false)
          if (error.code === 1) {
            setError('Você negou o acesso à geolocalização. Por favor, ative nas configurações do navegador.')
          } else if (error.code === 2) {
            setError('Localização indisponível. Por favor, tente novamente.')
          } else {
            setError('Erro ao obter localização: ' + error.message)
          }
        },
        { timeout: 10000, enableHighAccuracy: true }
      )
    } catch (err: any) {
      setError(err.message)
      setGeolocating(false)
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'address') {
      setShowAddressSuggestions(true)
    }
  }

  const handleAddService = () => {
    if (serviceInput.trim() && !services.includes(serviceInput.trim())) {
      setServices([...services, serviceInput.trim()])
      setServiceInput('')
    }
  }

  const handleRemoveService = (service: string) => {
    setServices(services.filter(s => s !== service))
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    const newPhotos = Array.from(files)
    const totalPhotos = photos.length + newPhotos.length

    if (totalPhotos > maxPhotos) {
      setError(`Você pode adicionar no máximo ${maxPhotos} fotos no plano ${plan === 'premium' ? 'Premium' : 'Gratuito'}`)
      return
    }

    setPhotos([...photos, ...newPhotos])
    setError(null)
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        router.push('/login/proprietario')
        return
      }

      // Validate inputs
      if (!formData.name || !formData.state || !formData.city || !formData.address) {
        setError('Por favor, preencha todos os campos obrigatórios')
        setLoading(false)
        return
      }

      // Garantir coordenadas (lat/lng) avant insert
      let motelCoordinates = coordinates
      if (!motelCoordinates) {
        if (!window.google) {
          setError('Google Maps não carregou corretamente. Recarregue a página e tente novamente.')
          setLoading(false)
          return
        }

        try {
          const geocoder = new window.google.maps.Geocoder()
          const geocodeResult = await new Promise<{ lat: number; lng: number }>((resolve, reject) => {
            geocoder.geocode({
              address: `${formData.address}, ${formData.city}, ${formData.state}, Brasil`
            }, (results: any, status: any) => {
              if (status === 'OK' && results?.[0]?.geometry?.location) {
                resolve({
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                })
              } else {
                reject(new Error('Não foi possível localizar este endereço no mapa'))
              }
            })
          })

          motelCoordinates = geocodeResult
          setCoordinates(geocodeResult)
        } catch (geocodeError: any) {
          setError(geocodeError.message || 'Não foi possível obter as coordenadas do endereço')
          setLoading(false)
          return
        }
      }

      // Upload photos to Supabase Storage
      const photoUrls: string[] = []
      if (photos.length > 0) {
        setUploading(true)
        for (let i = 0; i < photos.length; i++) {
          const file = photos[i]
          const timestamp = Date.now()
          const filename = `${user.id}/${timestamp}-${i}-${file.name}`

          const { error: uploadError, data } = await supabase.storage
            .from('motel-photos')
            .upload(filename, file)

          if (uploadError) throw uploadError

          // Get public URL
          const { data: publicData } = supabase.storage
            .from('motel-photos')
            .getPublicUrl(filename)

          photoUrls.push(publicData.publicUrl)
        }
        setUploading(false)
      }

      // Insert motel
      const { data: motel, error: insertError } = await supabase
        .from('motels')
        .insert({
          owner_id: user.id,
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
          lat: motelCoordinates.lat,
          lng: motelCoordinates.lng,
          services: services,
          photos: photoUrls,
          plan: plan,
          status: 'active',
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Update user's motel_id et clear pending_premium si présent
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          motel_id: motel.id,
          pending_premium: false
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Redirect to dashboard
      router.push('/owner/dashboard')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar motel')
      setUploading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen neon-bg text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-red-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/owner/dashboard" className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <ArrowLeft size={20} />
            Voltar
          </Link>
          <div className="text-sm bg-red-600/20 border border-red-600/50 px-3 py-1 rounded">
            Plano: <span className="font-semibold">{plan === 'premium' ? 'Premium' : 'Gratuito'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cadastre seu motel</h1>
          <p className="text-gray-400">Preencha os dados básicos do seu estabelecimento</p>
          <p className="text-sm text-yellow-400 mt-2">
            📷 Você pode adicionar até <strong>{maxPhotos} fotos</strong> neste plano
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded text-red-300">
            {error}
          </div>
        )}

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 border border-red-500/50 rounded-lg p-8 neon-card">
            {/* Nome do Motel */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome do Motel *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                placeholder="Ex: Motel Paradise BDSM"
              />
            </div>

            {/* Estado e Cidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                >
                  <option value="">Selecione um estado</option>
                  {brazilStates.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                  placeholder="Ex: São Paulo"
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Endereço *
                </label>
                <button
                  type="button"
                  onClick={handleGeolocation}
                  disabled={geolocating}
                  className="flex items-center gap-1 text-xs px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-blue-500/50"
                  title="Usar minha localização atual"
                >
                  <MapPin size={14} />
                  {geolocating ? 'Localizando...' : 'Minha localização'}
                </button>
              </div>
              <input
                ref={addressInputRef}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleAddressBlur}
                onFocus={() => setShowAddressSuggestions(true)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                placeholder="Digite o endereço e selecione nas sugestões"
              />
              {showAddressSuggestions && formData.address.trim().length >= 3 && (
                <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-20 max-h-56 overflow-y-auto">
                  {loadingAddressSuggestions ? (
                    <div className="px-3 py-2 text-sm text-gray-400">Buscando sugestões...</div>
                  ) : addressSuggestions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-400">{addressSuggestionNotice || 'Nenhuma sugestão encontrada.'}</div>
                  ) : (
                    addressSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.placeId}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelectAddressSuggestion(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 transition"
                      >
                        {suggestion.description}
                      </button>
                    ))
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                📍 Comece a digitar e selecione o endereço nas sugestões do Google Maps
              </p>
              {mapsError && (
                <p className="text-xs text-red-400 mt-2">{mapsError}</p>
              )}
            </div>

            {/* Telefone e WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                  placeholder="Ex: (11) 1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                  placeholder="Ex: (11) 98765-4321"
                />
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Horário de Funcionamento
              </label>
              <input
                type="text"
                name="operating_hours"
                value={formData.operating_hours}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                placeholder="Ex: 10:00 - 23:00"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                placeholder="Descreva seu motel, ambientes temáticos, diferenciais BDSM, etc..."
              />
            </div>

            {/* Redes Sociais e Website */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Presença Online (opcional)</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  🌐 Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                  placeholder="https://www.seumotel.com.br"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    📷 Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                    placeholder="@seumotel ou URL completa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    👍 Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                    placeholder="@seumotel ou URL completa"
                  />
                </div>
              </div>
            </div>

            {/* Serviços */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Serviços & Amenidades
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddService()
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition"
                  placeholder="Ex: Suites temáticas, Piscina, Jacuzzi"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>

              {/* Lista de Serviços */}
              {services.length > 0 && (
                <div className="space-y-2">
                  {services.map(service => (
                    <div
                      key={service}
                      className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700"
                    >
                      <span className="text-gray-300">{service}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fotos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-300">
                  Fotos do Motel
                </label>
                <span className="text-xs text-gray-400">
                  {photos.length} / {maxPhotos} fotos
                </span>
              </div>

              {/* File Input */}
              <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-red-500 transition group">
                <div className="flex flex-col items-center justify-center">
                  <Upload size={32} className="text-gray-500 group-hover:text-red-500 transition mb-2" />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                    Clique ou arraste imagens
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF até 10MB cada
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoSelect}
                  disabled={photos.length >= maxPhotos}
                  className="hidden"
                />
              </label>

              {/* Photo Preview Grid */}
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-700 group-hover:border-red-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} className="text-white" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                loading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 btn-3d-red'
              }`}
            >
              {loading ? 'Criando motel...' : 'Criar Motel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
