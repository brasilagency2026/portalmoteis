'use client'

import dynamic from 'next/dynamic'

const MotelMap = dynamic(() => import('./MotelMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-zinc-100 rounded-2xl animate-pulse flex items-center justify-center text-zinc-400">Carregando mapa...</div>
})

export default MotelMap
