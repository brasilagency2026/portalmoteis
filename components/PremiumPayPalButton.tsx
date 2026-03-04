'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

type Props = {
  planId?: string
  clientId?: string
}

export default function PremiumPayPalButton({ planId, clientId }: Props) {
  const router = useRouter()
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const isConfigured = Boolean(planId && clientId)

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const {
        data: { user },
      } = await supabase.auth.getUser()
      console.log('👤 Utilisateur authentifié:', user?.email)
      setIsAuthenticated(!!user)
      setCheckingAuth(false)
    }
    checkAuth()
  }, [])

  const options = useMemo(
    () => ({
      clientId: clientId || '',
      'client-id': clientId || '',
      vault: true,
      intent: 'subscription',
      currency: 'BRL',
      locale: 'pt_BR',
    }),
    [clientId]
  )

  if (checkingAuth) {
    return <div className="w-full text-sm text-zinc-400">Verificando autenticação...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
        ⚠️ Você deve criar uma conta e fazer login antes de se inscrever no plano premium.{' '}
        <a href="/login/proprietario?signup=true" className="underline hover:text-yellow-100 font-semibold">
          Clique aqui para criar sua conta
        </a>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="w-full rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
        Configure NEXT_PUBLIC_PAYPAL_CLIENT_ID e NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID para ativar o pagamento PayPal.
      </div>
    )
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'subscribe',
            height: 48,
          }}
          createSubscription={(_data: unknown, actions: any) => {
            if (!actions.subscription) {
              throw new Error('PayPal subscription action indisponível')
            }
            return actions.subscription.create({
              plan_id: planId!,
              quantity: '1',
              return_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/owner/create-motel?plan=premium`,
            })
          }}
          onApprove={async (data: any) => {
            try {
              setLoading(true)
              setFeedback('Validando assinatura...')
              console.log('📤 Enviando subscriptionID:', data.subscriptionID)

              const response = await fetch('/api/paypal/verify-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionID: data.subscriptionID }),
              })

              console.log('📥 Resposta do servidor:', response.status, response.statusText)
              const result = await response.json()
              console.log('📦 Resultado:', result)

              if (!response.ok) {
                throw new Error(result?.error || 'Falha ao validar assinatura')
              }

              setFeedback('✅ Assinatura ativa! Redirecionando...')
              if (result?.upgradedExistingMotel) {
                console.log('✅ Sucesso! Motel existente atualizado para premium. Redirecionando para /owner/dashboard')
                router.push('/owner/dashboard')
              } else {
                console.log('✅ Sucesso! Redirecionando para /owner/create-motel?plan=premium')
                router.push('/owner/create-motel?plan=premium')
              }
              router.refresh()
            } catch (error: any) {
              console.error('❌ Erro:', error)
              setFeedback(`❌ ${error?.message || 'Erro ao processar assinatura'}`)
            } finally {
              setLoading(false)
            }
          }}
          onError={(error: unknown) => {
            const message = error instanceof Error ? error.message : 'Erro no checkout PayPal'
            setFeedback(`❌ ${message}`)
          }}
        />
      </PayPalScriptProvider>

      {loading && <p className="mt-3 text-sm text-zinc-300">Processando...</p>}
      {feedback && <p className="mt-3 text-sm text-zinc-300">{feedback}</p>}
    </div>
  )
}
