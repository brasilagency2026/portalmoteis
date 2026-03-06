'use client'

import { useMemo, useState, useEffect } from 'react'
import MotelCard from '@/components/MotelCard'
import MotelMapDynamic from '@/components/MotelMapDynamic'
import { Motel } from '@/types'
import { MapPin } from 'lucide-react'

type Props = {
  motels: Motel[]
}

type UserLocation = {
  lat: number
  lng: number
}

type MotelWithCoords = Motel & {
  lat: number
  lng: number
}

const brazilStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const ufToStateName: Record<string, string> = {
  AC: 'acre',
  AL: 'alagoas',
  AP: 'amapa',
  AM: 'amazonas',
  BA: 'bahia',
  CE: 'ceara',
  DF: 'distrito federal',
  ES: 'espirito santo',
  GO: 'goias',
  MA: 'maranhao',
  MT: 'mato grosso',
  MS: 'mato grosso do sul',
  MG: 'minas gerais',
  PA: 'para',
  PB: 'paraiba',
  PR: 'parana',
  PE: 'pernambuco',
  PI: 'piaui',
  RJ: 'rio de janeiro',
  RN: 'rio grande do norte',
  RS: 'rio grande do sul',
  RO: 'rondonia',
  RR: 'roraima',
  SC: 'santa catarina',
  SP: 'sao paulo',
  SE: 'sergipe',
  TO: 'tocantins',
}

// Calcul de distance Haversine
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371 // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const hasCoordinates = (motel: Motel): motel is MotelWithCoords => motel.lat !== null && motel.lng !== null

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const hasUfToken = (text: string, uf: string): boolean => {
  const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegex(uf)}([^a-z0-9]|$)`, 'i')
  return pattern.test(text)
}

export default function HomeContent({ motels }: Props) {
  const [selectedState, setSelectedState] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)

  // Récupérer la géolocalisation
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log('Géolocalisation refusée ou indisponible:', error)
        },
        { timeout: 5000 }
      )
    }
  }, [])

  // Demander la géolocalisation manuellement
  const handleRequestGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Géolocalisation non supportée par votre navigateur')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        console.log('✅ Geolocalização obtida:', { lat, lng })
        setUserLocation({ lat, lng })
        alert(`✅ Localização ativa! Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`)
      },
      (error) => {
        console.error('❌ Erro de geolocalização:', error)
        if (error.code === 1) {
          alert('Acesso à geolocalização negado. Habilite nas configurações do seu navegador.')
        } else if (error.code === 2) {
          alert('Localização indisponível. Tente novamente.')
        } else {
          alert('Erro ao obter localização: ' + error.message)
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const filteredMotels = useMemo(() => {
    let results = motels.filter((motel) => {
      const motelWithLocation = motel as Motel & { city?: string | null; state?: string | null }
      const normalizedAddress = normalizeText(motel.address || '')
      const normalizedCity = normalizeText(motelWithLocation.city || '')
      const normalizedState = normalizeText(motelWithLocation.state || '')

      const stateScope = `${normalizedState} ${normalizedCity} ${normalizedAddress}`
      const normalizedSelectedState = normalizeText(selectedState)
      const selectedStateName = ufToStateName[selectedState] || ''

      const matchesState = normalizedSelectedState
        ? hasUfToken(stateScope, normalizedSelectedState) || stateScope.includes(selectedStateName)
        : true

      const normalizedQuery = normalizeText(query)
      const searchScope = `${normalizeText(motel.name || '')} ${normalizedAddress} ${normalizedCity} ${normalizedState}`
      const queryTokens = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : []
      const matchesQuery = queryTokens.length > 0
        ? queryTokens.every((token) => searchScope.includes(token))
        : true

      return matchesState && matchesQuery
    })

    // Si on a la position de l'utilisateur, trier par distance avec priorité aux premium 20km
    if (userLocation) {
      // Séparer les motels avec et sans coordonnées
      const withCoords = results.filter(hasCoordinates)
      const withoutCoords = results.filter((m) => !hasCoordinates(m))

      withCoords.sort((a, b) => {
        const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng)
        const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)

        // Prioriser les motels premium dans un rayon de 20km
        const aPremiumClose = a.plan === 'premium' && distanceA <= 20
        const bPremiumClose = b.plan === 'premium' && distanceB <= 20

        if (aPremiumClose && !bPremiumClose) return -1
        if (!aPremiumClose && bPremiumClose) return 1

        // Ensuite trier par distance
        return distanceA - distanceB
      })

      // Mettre les motels sans coordonnées à la fin
      results = [...withCoords, ...withoutCoords]
    }

    return results
  }, [motels, selectedState, query, userLocation])

  const searchSuggestions = useMemo(() => {
    const values = new Set<string>()

    motels.forEach((motel) => {
      const motelWithLocation = motel as Motel & { city?: string | null; state?: string | null }
      if (motel.address) values.add(motel.address)
      if (motelWithLocation.city) values.add(motelWithLocation.city)
      if (motelWithLocation.state) values.add(motelWithLocation.state)
      if (motel.name) values.add(motel.name)
    })

    return Array.from(values).filter(Boolean).slice(0, 20)
  }, [motels])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Notification de géolocalisation active */}
      {userLocation && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 text-center text-sm font-semibold shadow-lg">
          ✅ Localização ativa | Mostrando motéis próximos a você
        </div>
      )}

      <section className="relative overflow-hidden">
        <div
          className="relative w-full"
          style={{
            backgroundImage: "url('https://i.ibb.co/jFjp6nh/grok-image-28e567e3-b224-45cb-aa3c-3d11b5bda95f-1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-black/50">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="max-w-3xl text-white mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                  O Maior Portal de Motéis BDSM do Brasil
                </h1>
                <p className="text-sm md:text-base text-zinc-200">
                  Descubra uma seleção exclusiva de motéis especializados em suites temáticas BDSM e ambientes diferenciados. Busque por estado para encontrar os melhores estabelecimentos próximos a você com total discrição.
                </p>
              </div>

              <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 uppercase tracking-wide">
                      Estado (UF)
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Todos os estados</option>
                      {brazilStates.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 uppercase tracking-wide">
                      Endereço / Cidade
                    </label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      list="motel-search-suggestions"
                      placeholder="Ex: São Paulo, Av. Paulista..."
                      className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <datalist id="motel-search-suggestions">
                      {searchSuggestions.map((item) => (
                        <option key={item} value={item} />
                      ))}
                    </datalist>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-1">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 uppercase tracking-wide">
                      Localização
                    </span>
                    <button
                      onClick={handleRequestGeolocation}
                      className={`h-11 rounded-xl border transition-all duration-300 px-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        userLocation
                          ? 'border-green-600 dark:border-green-600 bg-green-600 dark:bg-green-700 text-white shadow-lg shadow-green-500/50'
                          : 'border-blue-600 dark:border-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-600/70'
                      }`}
                    >
                      <MapPin size={16} />
                      <span>Perto de mim</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-1">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 uppercase tracking-wide">
                      Resultados
                    </span>
                    <div className="h-11 flex items-center justify-center">
                      <span className="neon-green-text font-semibold text-sm">
                        {filteredMotels.length} motéis encontrados
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste + carte */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col gap-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Motéis com Suites Temáticas BDSM
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base">
                {filteredMotels.length} motéis destaque
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMotels.map((motel) => {
                const hasCoords = hasCoordinates(motel)
                const distance = userLocation && hasCoords
                  ? calculateDistance(userLocation.lat, userLocation.lng, motel.lat, motel.lng) 
                  : null
                const isPremiumClose = motel.plan === 'premium' && distance !== null && distance <= 20

                // Debug logging pour motels sans coordonnées
                if (!hasCoords) {
                  console.warn(`⚠️ Motel ${motel.name} (${motel.id}) sem coordenadas GPS - lat: ${motel.lat}, lng: ${motel.lng}`)
                }

                return (
                  <MotelCard 
                    key={motel.id} 
                    motel={motel} 
                    distance={distance}
                    isPremiumClose={isPremiumClose}
                    hasUserLocation={Boolean(userLocation)}
                  />
                )
              })}
              {filteredMotels.length === 0 && (
                <div className="col-span-full text-center text-zinc-500 dark:text-zinc-400 text-sm md:text-base py-8">
                  Nenhum motel com suites BDSM encontrado nessa região. Tente buscar em outro estado.
                </div>
              )}
            </div>
          </section>

          <section className="mt-4 md:mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Visualizar no Mapa</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
                Localize facilmente os motéis com suites BDSM mais próximos de você no mapa interativo.
              </p>
            </div>
            <MotelMapDynamic motels={filteredMotels} userLocation={userLocation ? [userLocation.lat, userLocation.lng] : null} />
          </section>
        </div>
      </div>

      <footer className="border-t border-zinc-800/60 bg-black mt-4">
        <div className="container mx-auto px-4 py-10 md:py-12 text-zinc-300">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white mb-2">BDSMBRAZIL Motéis</h3>
              <p className="text-sm text-zinc-400">
                O portal especializado em motéis com suites temáticas e ambientes BDSM no Brasil. 
                Encontre estabelecimentos com discreção, qualidade e serviços diferenciados. 
                Busque por estado, cidade ou endereço e descubra as melhores opções para 
                experiências memoráveis e seguras.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">Aplicativos BDSMBRAZIL</h4>
                <ul className="space-y-1 text-zinc-400">
                  <li><a href="/apps" className="hover:text-red-500 transition-colors">Conheça nosso ecossistema</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Para proprietários</h4>
                <ul className="space-y-1 text-zinc-400">
                  <li><a href="/owner" className="hover:text-red-500 transition-colors">Divulgue o seu motel</a></li>
                  <li><a href="/suporte-contato" className="hover:text-red-500 transition-colors">Suporte e contato</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-bold text-yellow-400">
            A entrada em motéis é proibida para menores de 18 anos.
          </div>
          <div className="mt-4 pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <span>© {new Date().getFullYear()} BDSMBRAZIL. Todos os direitos reservados.</span>
            <div className="flex gap-4">
              <span>Termos de uso</span>
              <span>Política de privacidade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
