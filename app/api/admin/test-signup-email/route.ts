import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendSuperAdminNewSignupEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 })
  }

  const { data: roleData, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (roleError || !roleData || roleData.role !== 'super_admin') {
    return NextResponse.json({ error: 'Acesso restrito ao super admin' }, { status: 403 })
  }

  const body = await request.json().catch(() => ({}))
  const testEmail = typeof body?.email === 'string' && body.email.trim().length > 0
    ? body.email.trim()
    : user.email || 'test@example.com'

  try {
    const result = await sendSuperAdminNewSignupEmail({ newUserEmail: testEmail })
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha ao enviar email de teste' },
      { status: 500 }
    )
  }
}
