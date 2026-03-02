'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Motel } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MessageCircle } from 'lucide-react'
import NavigationButton from '@/components/NavigationButton'

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const premiumIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function AutoFitBounds({ userLocation, motels }: { userLocation: [number, number] | null, motels: Motel[] }) {
  const map = useMap()
  
  useEffect(() => {
    const bounds = L.latLngBounds([])
    let hasPoints = false

    // Ajouter la position utilisateur
    if (userLocation) {
      bounds.extend(userLocation)
      hasPoints = true
    }

    // Ajouter tous les motels avec coordonnées
    motels.forEach(motel => {
      if (motel.lat && motel.lng) {
        bounds.extend([motel.lat, motel.lng])
        hasPoints = true
      }
    })

    // Ajuster la carte pour afficher tous les points
    if (hasPoints) {
      map.fitBounds(bounds, { 
        padding: [50, 50],
        maxZoom: 15
      })
    } else if (userLocation) {
      map.flyTo(userLocation, 13)
    }
  }, [userLocation, motels, map])

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={icon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  )
}

export default function MotelMap({ motels, userLocation }: { motels: Motel[], userLocation: [number, number] | null }) {
  const defaultCenter: [number, number] = [-23.5505, -46.6333] // São Paulo
  
  // Filtrer uniquement les motels avec coordonnées valides
  const motelsWithCoords = motels.filter(m => m.lat && m.lng)

  // Debug logging
  console.log('🗺️ MotelMap - Total motels:', motels.length)
  console.log('🗺️ MotelMap - Motels avec coordonnées:', motelsWithCoords.length)
  console.log('🗺️ MotelMap - User location:', userLocation)
  motels.forEach(m => {
    console.log(`   Motel: ${m.name} - lat: ${m.lat}, lng: ${m.lng}`)
  })

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200">
      {motelsWithCoords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-[1000] rounded-2xl">
          <div className="text-center p-6">
            <p className="text-gray-700 font-semibold mb-2">⚠️ Nenhum motel com localização GPS</p>
            <p className="text-sm text-gray-500">Os motels precisam de coordenadas para aparecer no mapa</p>
          </div>
        </div>
      )}
      <MapContainer 
        center={userLocation || defaultCenter} 
        zoom={12} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AutoFitBounds userLocation={userLocation} motels={motelsWithCoords} />
        
        {/* Cercle de 20km pour les motels premium proches */}
        {userLocation && (
          <Circle 
            center={userLocation} 
            radius={20000} 
            pathOptions={{
              color: 'rgba(251, 146, 60, 0.2)',
              fillColor: 'rgba(251, 146, 60, 0.1)',
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.2,
              dashArray: '5, 5'
            }}
          />
        )}
        
        {motelsWithCoords.map((motel) => {
          const markerIcon = motel.plan === 'premium' ? premiumIcon : icon
          console.log(`🗺️ Rendering marker for ${motel.name} at [${motel.lat}, ${motel.lng}]`)
          return (
            <Marker key={motel.id} position={[motel.lat!, motel.lng!]} icon={markerIcon}>
            <Popup className="custom-popup">
              <div className="w-48">
                <div className="relative h-32 w-full rounded-t-lg overflow-hidden mb-2">
                  <Image 
                    src={motel.photos[0] || 'https://picsum.photos/400/300'} 
                    alt={motel.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">{motel.name}</h3>
                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{motel.address}</p>
                
                <div className="flex gap-2 mb-3">
                  <a 
                    href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-green-500 !text-white p-1.5 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors btn-3d"
                  >
                    <MessageCircle size={16} className="text-white" />
                  </a>
                  <NavigationButton
                    lat={motel.lat}
                    lng={motel.lng}
                    wrapperClassName="flex-1"
                    buttonClassName="w-full bg-blue-500 text-white p-1.5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-xs font-semibold btn-3d"
                    label="Ir"
                    labelClassName="ml-1"
                  />
                </div>
                
                <Link 
                  href={`/motel/${motel.id}`}
                  className="block w-full text-center bg-black !text-white py-1.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors btn-3d"
                >
                  Ver Detalhes
                </Link>
              </div>
            </Popup>
          </Marker>
        )})}
      </MapContainer>
    </div>
  )
}
