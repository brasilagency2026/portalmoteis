import Image from 'next/image'
import Link from 'next/link'
import { Motel } from '@/types'
import { LocateFixed, MapPin, MessageCircle, Star } from 'lucide-react'
import NavigationButton from '@/components/NavigationButton'
import { buildMotelPath } from '@/lib/utils'

export default function MotelCard({ motel, distance, isPremiumClose, hasUserLocation }: { motel: Motel, distance?: number | null, isPremiumClose?: boolean, hasUserLocation?: boolean }) {
  const motelPath = buildMotelPath(motel.name, motel.id, motel.address)

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <Link href={motelPath} className="relative h-56 w-full block overflow-hidden">
        <Image 
          src={motel.photos[0] || 'https://picsum.photos/800/600'} 
          alt={motel.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isPremiumClose && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
            <Star size={12} fill="currentColor" />
            Destaque Premium
          </div>
        )}
        {!isPremiumClose && motel.plan === 'premium' && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
            <Star size={12} fill="currentColor" />
            PREMIUM
          </div>
        )}
        {distance !== undefined && distance !== null && (
          <div className={`absolute ${isPremiumClose || (motel.plan === 'premium' && distance !== null) ? 'top-14' : 'top-3'} right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10 ${
            distance <= 20
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
          }`}>
            <MapPin size={12} />
            {distance.toFixed(1)} km
          </div>
        )}
        {(motel.lat === null || motel.lng === null) && (
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-yellow-600/90 text-white text-xs font-semibold z-10">
            ⚠️ Localização indisponível
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link href={motelPath}>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">{motel.name}</h3>
        </Link>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 flex-grow">{motel.address}</p>
        {hasUserLocation && distance !== undefined && distance !== null && (
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-1">
            <LocateFixed size={14} />
            Você está a {distance.toFixed(1)} km deste motel
          </p>
        )}
        {hasUserLocation && (distance === undefined || distance === null) && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1">
            <LocateFixed size={14} />
            Sua localização está ativa, mas este motel não tem coordenadas GPS
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-2">
            <a 
              href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-300 flex items-center justify-center hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <NavigationButton
              lat={motel.lat}
              lng={motel.lng}
              wrapperClassName="w-10 h-10"
              buttonClassName="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors text-xs font-semibold"
              label=""
            />
          </div>
          
          <Link 
            href={motelPath}
            className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            Ver mais &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
