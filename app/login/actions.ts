'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendSuperAdminNewSignupEmail } from '@/lib/email'

function getAuthRedirectBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    'https://moteis.bdsmbrazil.com.br'
  )
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/owner')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const emailRedirectTo = `${getAuthRedirectBaseUrl()}/auth/callback`

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo,
    },
  })

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  try {
    const notifyResult = await sendSuperAdminNewSignupEmail({ newUserEmail: data.email })
    if (!notifyResult.sent) {
      console.warn('signup-notification-skipped', {
        reason: notifyResult.reason,
        hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
        hasRecipient: Boolean(process.env.SUPER_ADMIN_NOTIFICATION_EMAIL),
        hasFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
      })
    }
  } catch (notifyError) {
    console.error('signup-notification-error', notifyError)
  }

  revalidatePath('/', 'layout')
  redirect('/owner')
}
