import { createClient } from '@/lib/supabase/server'
import { Motel } from '@/types'
import HomeContent from '@/components/HomeContent'

export default async function Page() {
  const supabase = await createClient()

  const { data: motels, error } = await supabase
    .from('motels')
    .select('*')
    .eq('status', 'active')
    .order('plan', { ascending: false }) // Premium first

  if (error) {
    console.error('Error fetching motels:', error)
  }

  // Mock data if database is empty for demonstration
  const displayMotels: Motel[] = (motels && motels.length > 0) ? motels : [
    {
      id: '1',
      name: 'Motel Exemplo Premium',
      address: 'Av. das Nações Unidas, 12345 - São Paulo, SP',
      lat: -23.5505,
      lng: -46.6333,
      plan: 'premium',
      status: 'active',
      photos: ['https://picsum.photos/seed/motel1/800/600'],
      whatsapp: '11999999999',
      phone: '1155555555',
      description: 'Um motel de luxo para momentos especiais.',
      owner_id: 'system',
      created_at: new Date().toISOString(),
      hours: '24h',
      periods: { twoHours: '100', fourHours: '180', twelveHours: '350' },
      services: ['Ar condicionado', 'Hidromassagem', 'Cama King'],
      accessories: ['Frigobar', 'Smart TV'],
      tripadvisor: ''
    },
    {
      id: '2',
      name: 'Motel Conforto',
      address: 'Rua das Flores, 456 - São Paulo, SP',
      lat: -23.5605,
      lng: -46.6433,
      plan: 'free',
      status: 'active',
      photos: ['https://picsum.photos/seed/motel2/800/600'],
      whatsapp: '11888888888',
      phone: '1144444444',
      description: 'Conforto e discrição com o melhor preço.',
      owner_id: 'system',
      created_at: new Date().toISOString(),
      hours: '24h',
      periods: { twoHours: '70', fourHours: '120', twelveHours: '250' },
      services: ['Ar condicionado', 'TV'],
      accessories: ['Frigobar'],
      tripadvisor: ''
    }
  ]

  return <HomeContent motels={displayMotels} />
}
