type NewSignupNotificationParams = {
  newUserEmail: string
}

const RESEND_API_URL = 'https://api.resend.com/emails'

function getNotificationRecipients() {
  const raw = process.env.SUPER_ADMIN_NOTIFICATION_EMAIL || ''
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export async function sendSuperAdminNewSignupEmail({ newUserEmail }: NewSignupNotificationParams) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || process.env.SUPER_ADMIN_NOTIFICATION_EMAIL || ''
  const recipients = getNotificationRecipients()

  if (!apiKey || !from || recipients.length === 0) {
    return { sent: false, reason: 'missing-email-config' as const }
  }

  const createdAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: '🆕 Nova inscrição no portal de motéis',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin:0 0 12px;">Nova inscrição recebida</h2>
          <p style="margin:0 0 8px;"><strong>Email:</strong> ${newUserEmail}</p>
          <p style="margin:0 0 8px;"><strong>Data:</strong> ${createdAt}</p>
          <p style="margin:16px 0 0; color:#555;">Portal BDSMBRAZIL - Notificação automática</p>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    const payload = await response.text()
    throw new Error(`resend-error-${response.status}: ${payload}`)
  }

  return { sent: true as const }
}
