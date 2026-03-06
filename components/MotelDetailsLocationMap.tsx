'use client'

import { useEffect, useMemo, useState } from 'react'
import { LocateFixed, RefreshCcw } from 'lucide-react'
import MotelMapDynamic from '@/components/MotelMapDynamic'
import { Motel } from '@/types'

type Props = {
  motel: Motel
}

type UserLocation = [number, number] | null

const calculateDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function MotelDetailsLocationMap({ motel }: Props) {
  const [userLocation, setUserLocation] = useState<UserLocation>(null)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [geoMessage, setGeoMessage] = useState<string>('')

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      setGeoMessage('Geolocalização não suportada neste navegador.')
      return
    }

    setGeoStatus('loading')
    setGeoMessage('Obtendo sua localização...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
        setGeoStatus('ready')
        setGeoMessage('Sua localização está ativa no mapa.')
      },
      (error) => {
        setGeoStatus('error')
        if (error.code === 1) {
          setGeoMessage('Permissão de localização negada. Ative e tente novamente.')
        } else {
          setGeoMessage('Não foi possível obter sua localização agora.')
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  useEffect(() => {
    requestLocation()
  }, [])

  const distanceLabel = useMemo(() => {
    if (!userLocation || motel.lat === null || motel.lng === null) return null
    const km = calculateDistanceKm(userLocation[0], userLocation[1], motel.lat, motel.lng)
    return `${km.toFixed(1)} km de você`
  }, [userLocation, motel.lat, motel.lng])

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={requestLocation}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          <LocateFixed size={16} />
          Atualizar minha localização
          {geoStatus === 'loading' && <RefreshCcw size={14} className="animate-spin" />}
        </button>

        {distanceLabel && (
          <span className="inline-flex items-center rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 text-sm font-semibold px-3 py-1 border border-emerald-500/30">
            {distanceLabel}
          </span>
        )}
      </div>

      {geoMessage && (
        <p className={`text-sm ${geoStatus === 'error' ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
          {geoMessage}
        </p>
      )}

      <MotelMapDynamic motels={[motel]} userLocation={userLocation} />
    </div>
  )
}
