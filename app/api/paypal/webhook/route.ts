import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyPayPalWebhookSignature } from '@/lib/paypal'

type PayPalWebhookPayload = {
  id?: string
  event_type?: string
  resource?: {
    subscriber?: {
      email_address?: string
    }
  }
}

const UPGRADE_EVENTS = new Set([
  'BILLING.SUBSCRIPTION.ACTIVATED',
  'BILLING.SUBSCRIPTION.RE-ACTIVATED',
])

const DOWNGRADE_EVENTS = new Set([
  'BILLING.SUBSCRIPTION.CANCELLED',
  'BILLING.SUBSCRIPTION.SUSPENDED',
  'BILLING.SUBSCRIPTION.EXPIRED',
  'BILLING.SUBSCRIPTION.PAYMENT.FAILED',
])

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const payload = JSON.parse(rawBody) as PayPalWebhookPayload

    const transmissionId = request.headers.get('paypal-transmission-id') || ''
    const transmissionTime = request.headers.get('paypal-transmission-time') || ''
    const certUrl = request.headers.get('paypal-cert-url') || ''
    const authAlgo = request.headers.get('paypal-auth-algo') || ''
    const transmissionSig = request.headers.get('paypal-transmission-sig') || ''

    if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
      return NextResponse.json({ error: 'Headers PayPal ausentes para validação' }, { status: 400 })
    }

    const isValid = await verifyPayPalWebhookSignature(
      {
        transmissionId,
        transmissionTime,
        certUrl,
        authAlgo,
        transmissionSig,
      },
      payload
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Webhook PayPal inválido' }, { status: 400 })
    }

    const eventType = payload.event_type || ''
    const shouldUpgrade = UPGRADE_EVENTS.has(eventType)
    const shouldDowngrade = DOWNGRADE_EVENTS.has(eventType)

    if (!shouldUpgrade && !shouldDowngrade) {
      return NextResponse.json({ received: true, processed: false, eventType })
    }

    const subscriberEmail = payload.resource?.subscriber?.email_address
    if (!subscriberEmail) {
      return NextResponse.json({
        received: true,
        processed: false,
        eventType,
        message: 'Evento sem email do assinante para mapear usuário',
      })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Configuração Supabase incompleta no servidor' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', subscriberEmail)
      .single()

    if (userError || !user?.id) {
      return NextResponse.json({
        received: true,
        processed: false,
        eventType,
        message: 'Usuário não encontrado para email do assinante',
      })
    }

    const nextPlan = shouldUpgrade ? 'premium' : 'free'

    const { error: updateError } = await supabaseAdmin
      .from('motels')
      .update({ plan: nextPlan })
      .eq('owner_id', user.id)

    if (updateError) {
      return NextResponse.json({ error: `Erro ao atualizar plano do motel: ${updateError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      received: true,
      processed: true,
      eventType,
      planUpdatedTo: nextPlan,
      subscriberEmail,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erro interno no webhook PayPal' },
      { status: 500 }
    )
  }
}
