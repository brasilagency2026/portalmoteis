'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowLeft, Sparkles, Crown } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import PremiumPayPalButton from '@/components/PremiumPayPalButton'

export default function OwnerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const upgradeRequested = searchParams?.get('upgrade') === 'true'

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // User is authenticated - check if they have a motel
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('motel_id, pending_premium')
          .eq('id', user.id)
          .single()

        if (userError || !userData) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // Si pending_premium mais pas de motel, rediriger vers création premium
        if (!userData.motel_id && userData.pending_premium) {
          router.push('/owner/create-motel?plan=premium')
          return
        }

        if (!userData.motel_id) {
          // No motel - show plans page
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // User has a motel - fetch motel data
        const { data: motelData, error: motelError } = await supabase
          .from('motels')
          .select('plan')
          .eq('id', userData.motel_id)
          .single()

        if (motelError || !motelData) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }

        // If premium, redirect to statistics
        if (motelData.plan === 'premium') {
          router.push('/owner/statistics')
          return
        }

        // If free, redirect to dashboard unless user explicitly requested upgrade flow
        if (motelData.plan === 'free') {
          if (upgradeRequested) {
            setIsAuthenticated(true)
            setIsLoading(false)
            return
          }

          router.push('/owner/dashboard')
          return
        }

        setIsAuthenticated(true)
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router, upgradeRequested])

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const paypalPlanId = process.env.NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID
  
  // Si authentifié, aller à create-motel ; sinon, aller au login
  const freeButtonHref = isAuthenticated ? '/owner/create-motel' : '/login/proprietario'

  // Show loading while checking premium status
  if (isLoading) {
    return (
      <div className="min-h-screen neon-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Verificando seu plano...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen neon-bg text-red-400 bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Bouton Retour */}
        <Link href="/" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-6 transition">
          <ArrowLeft size={20} />
          Voltar ao portal
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Divulgue seu motel</h1>
          <p className="text-zinc-300 max-w-2xl mt-2">Compare os planos e escolha como começar a anunciar seu estabelecimento.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plano Gratuito */}
          <div className="bg-zinc-900 neon-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Plano Gratuito</h2>
                <p className="text-zinc-400 text-sm">Comece a divulgar seu motel sem custos.</p>
              </div>
              <div className="text-3xl font-extrabold neon-green-text">R$ 0 / sempre</div>
            </div>

            <ul className="space-y-3 mb-6 text-zinc-300">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Cadastro completo do motel</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Até 3 fotos do motel</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Links para redes sociais</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> WhatsApp e telefone clicáveis</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Integração Google Maps</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Posição por distância</li>
            </ul>

            <Link 
              href={freeButtonHref}
              className="group relative w-full py-4 px-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-green-500/50 hover:scale-105 text-center flex items-center justify-center gap-3 text-white overflow-hidden"
            >
              {/* Effet de brillance */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
              
              <Sparkles size={22} className="group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">Começar grátis</span>
            </Link>
          </div>

          {/* Plano Premium */}
          <div className="bg-zinc-900 neon-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Plano Premium</h2>
                <p className="text-zinc-400 text-sm">Tenha alcance e visibilidade máximos com recursos exclusivos.</p>
              </div>
              <div className="text-2xl font-extrabold text-red-400">R$ 199 / mês</div>
            </div>

            <ul className="space-y-3 mb-6 text-zinc-300">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Até 20 fotos do motel</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Boost de prioridade 20km</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Badge Premium destaque</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Seção Premium exclusiva</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400"/> Estatísticas avançadas</li>
            </ul>

            <div className="mb-3">
              <div className="group relative w-full py-4 px-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 rounded-xl font-bold text-lg shadow-2xl text-center flex items-center justify-center gap-3 text-black overflow-hidden mb-3">
                <Crown size={24} className="relative z-10" />
                <span className="relative z-10 font-extrabold">Assinatura mensal via PayPal</span>
                <span className="absolute top-1 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">DESTAQUE</span>
              </div>
              <PremiumPayPalButton planId={paypalPlanId} clientId={paypalClientId} />
            </div>
            
            <p className="text-xs text-zinc-500 mt-4">Pagamento via cartão com faturamento mensal. Cancelamento a qualquer momento.</p>
          </div>
        </div>

        <div className="mt-12 bg-zinc-900 neon-card rounded-2xl p-6 text-zinc-300">
          <h3 className="text-lg font-bold neon-text text-white">Como funciona</h3>
          <p className="mt-2">Após a contratação, nossa equipe verificará as informações e ativará seu destaque. Você poderá editar fotos, horários e serviços pelo painel de proprietários.</p>
        </div>
      </div>
    </div>
  )
}
