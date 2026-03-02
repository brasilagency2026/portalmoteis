import { Navigation } from 'lucide-react'

interface NavigationButtonProps {
  lat: number | null
  lng: number | null
  buttonClassName?: string
  label?: string
  labelClassName?: string
  wrapperClassName?: string
}

export default function NavigationButton({
  lat,
  lng,
  buttonClassName = '',
  label = 'Ir',
  labelClassName = '',
  wrapperClassName = ''
}: NavigationButtonProps) {
  // Ne pas afficher le bouton si coordonnées manquantes
  if (!lat || !lng) {
    return null
  }

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`

  return (
    <details className={`relative ${wrapperClassName}`}>
      <summary className={`${buttonClassName} list-none cursor-pointer flex items-center justify-center`}>
        <Navigation className={label ? 'mr-2' : ''} size={18} />
        {label && <span className={labelClassName}>{label}</span>}
      </summary>

      <div className="absolute z-50 bottom-full mb-2 right-0 bg-white border border-zinc-200 rounded-xl shadow-lg p-2 w-44">
        <p className="text-xs font-semibold text-zinc-500 px-2 pb-1">Escolha o app</p>
        <div className="flex flex-col gap-1">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-left"
          >
            Abrir no Google Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-left"
          >
            Abrir no Waze
          </a>
        </div>
      </div>
    </details>
  )
}

