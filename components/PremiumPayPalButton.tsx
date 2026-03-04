'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    paypal?: any
  }
}

type Props = {
  planId?: string
  clientId?: string
  isAuthenticated?: boolean
}

export default function PremiumPayPalButton({ planId, clientId, isAuthenticated = false }: Props) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const normalizedClientId = (clientId || '').trim().replace(/^['"]+|['"]+$/g, '')

  const isConfigured = Boolean(planId && normalizedClientId)

  useEffect(() => {
    if (!isAuthenticated || !isConfigured || !normalizedClientId) return

    const scriptId = 'paypal-sdk-subscription-script'
    const sdkSrc = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(normalizedClientId)}&vault=true&intent=subscription`

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null
    if (existing) {
      if (window.paypal?.Buttons) {
        setSdkReady(true)
      } else {
        existing.addEventListener('load', () => setSdkReady(true), { once: true })
      }
      return
    }

    setFeedback('Carregando PayPal...')
    const script = document.createElement('script')
    script.id = scriptId
    script.src = sdkSrc
    script.setAttribute('data-sdk-integration-source', 'button-factory')
    script.async = true
    script.onload = () => {
      setSdkReady(true)
      setFeedback(null)
    }
    script.onerror = () => {
      setFeedback('❌ Falha ao carregar SDK PayPal. Verifique client ID e bloqueadores de script no navegador.')
    }

    document.head.appendChild(script)
  }, [isAuthenticated, isConfigured, normalizedClientId])

  useEffect(() => {
    if (!sdkReady || !isConfigured || !planId || !containerRef.current || !window.paypal?.Buttons) return

    containerRef.current.innerHTML = ''
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'subscribe',
          height: 48,
        },
        createSubscription: (_data: unknown, actions: any) => {
          if (!actions.subscription) {
            throw new Error('PayPal subscription action indisponível')
          }
          return actions.subscription.create({
            plan_id: planId,
            quantity: '1',
          })
        },
        onApprove: async (data: any) => {
          try {
            setLoading(true)
            setFeedback('Validando assinatura...')

            const response = await fetch('/api/paypal/verify-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscriptionID: data.subscriptionID }),
            })

            const result = await response.json()
            if (!response.ok) {
              throw new Error(result?.error || 'Falha ao validar assinatura')
            }

            setFeedback('✅ Assinatura ativa! Redirecionando...')
            if (result?.upgradedExistingMotel) {
              router.push('/owner/dashboard')
            } else {
              router.push('/owner/create-motel?plan=premium')
            }
            router.refresh()
          } catch (error: any) {
            setFeedback(`❌ ${error?.message || 'Erro ao processar assinatura'}`)
          } finally {
            setLoading(false)
          }
        },
        onError: (error: unknown) => {
          const message = error instanceof Error ? error.message : 'Erro no checkout PayPal'
          setFeedback(`❌ ${message}. Verifique se o Client ID e o Plan ID são do mesmo ambiente (live/sandbox).`)
        },
      })
      .render(containerRef.current)
      .then(() => setFeedback(null))
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Falha ao renderizar botão PayPal'
        setFeedback(`❌ ${message}`)
      })
  }, [sdkReady, isConfigured, planId, router])

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
    const missing = [
      !clientId ? 'NEXT_PUBLIC_PAYPAL_CLIENT_ID' : null,
      !planId ? 'NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID' : null,
    ].filter(Boolean).join(', ')

    return (
      <div className="w-full rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
        Configure as variáveis {missing} para ativar o pagamento PayPal.
      </div>
    )
  }

  return (
    <div className="w-full">
      <div ref={containerRef} className="min-h-[56px]" />

      {loading && <p className="mt-3 text-sm text-zinc-300">Processando...</p>}
      {feedback && <p className="mt-3 text-sm text-zinc-300">{feedback}</p>}
    </div>
  )
}
