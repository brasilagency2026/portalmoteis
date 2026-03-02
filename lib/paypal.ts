type PayPalTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

type PayPalSubscription = {
  id: string
  status: string
  plan_id: string
}

type PayPalWebhookHeaders = {
  transmissionId: string
  transmissionTime: string
  certUrl: string
  authAlgo: string
  transmissionSig: string
}

const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

export function getPayPalBaseUrl() {
  return PAYPAL_BASE_URL
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID/PAYPAL_CLIENT_SECRET não configurados')
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Erro ao obter token PayPal: ${response.status} - ${errorBody}`)
  }

  const data = (await response.json()) as PayPalTokenResponse
  return data.access_token
}

export async function getPayPalSubscriptionDetails(subscriptionId: string) {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Erro ao validar assinatura PayPal: ${response.status} - ${errorBody}`)
  }

  return (await response.json()) as PayPalSubscription
}

export async function verifyPayPalWebhookSignature(
  headers: PayPalWebhookHeaders,
  webhookEvent: unknown
) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID

  if (!webhookId) {
    throw new Error('PAYPAL_WEBHOOK_ID não configurado')
  }

  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transmission_id: headers.transmissionId,
      transmission_time: headers.transmissionTime,
      cert_url: headers.certUrl,
      auth_algo: headers.authAlgo,
      transmission_sig: headers.transmissionSig,
      webhook_id: webhookId,
      webhook_event: webhookEvent,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Erro ao verificar webhook PayPal: ${response.status} - ${errorBody}`)
  }

  const result = (await response.json()) as { verification_status?: string }
  return result.verification_status === 'SUCCESS'
}
