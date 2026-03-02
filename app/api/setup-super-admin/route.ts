import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Setup endpoint for creating the super admin user
 * POST /api/setup-super-admin
 * Body: { email, password, setupKey }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, setupKey } = body

    // Validate setup key
    const SETUP_KEY = process.env.SETUP_SUPER_ADMIN_KEY
    if (!setupKey || setupKey !== SETUP_KEY) {
      return NextResponse.json(
        { error: 'Clé de configuration invalide' },
        { status: 403 }
      )
    }

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe sont requis' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Create admin Supabase client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Create user in auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError || !authUser) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: authError?.message || 'Erreur lors de la création du compte auth' },
        { status: 400 }
      )
    }

    // Create user entry in users table with super_admin role
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        role: 'super_admin',
      })
      .select()
      .single()

    if (userError) {
      console.error('User table error:', userError)
      // Try to delete the auth user if user table insert failed
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
      return NextResponse.json(
        { error: 'Erreur lors de la création du profil utilisateur' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: 'Super admin créé avec succès!',
        user: {
          id: authUser.user.id,
          email: authUser.user.email,
          role: 'super_admin',
        },
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('Setup error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur: ' + err.message },
      { status: 500 }
    )
  }
}
