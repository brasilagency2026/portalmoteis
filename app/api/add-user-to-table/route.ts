import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Endpoint to manually add a user to the users table
 * POST /api/add-user-to-table
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, role, setupKey } = body

    // Validate setup key
    const SETUP_KEY = process.env.SETUP_SUPER_ADMIN_KEY
    if (!setupKey || setupKey !== SETUP_KEY) {
      return NextResponse.json(
        { error: 'Clé de configuration invalide' },
        { status: 403 }
      )
    }

    // Create admin Supabase client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get user from auth
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers()

    if (usersError) {
      return NextResponse.json(
        { error: 'Erreur lors de la recherche de l\'utilisateur' },
        { status: 400 }
      )
    }

    const authUser = users.find(u => u.email === email)
    if (!authUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé dans Supabase Auth' },
        { status: 404 }
      )
    }

    // Add user to users table
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert({
        id: authUser.id,
        email: authUser.email,
        role: role || 'proprietario',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'ajout à la table users: ' + error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: 'Utilisateur ajouté à la table users avec succès!',
        user: data,
      },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur: ' + err.message },
      { status: 500 }
    )
  }
}
