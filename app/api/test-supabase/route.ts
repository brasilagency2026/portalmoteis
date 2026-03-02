import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const checks = {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    url: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'MANQUANTE',
    key: supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MANQUANTE',
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Variables d\'environnement manquantes',
        checks 
      },
      { status: 500 }
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test de connexion
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erreur de connexion Supabase',
          error: error.message,
          checks 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Connexion Supabase réussie ✅',
      checks,
      sessionActive: !!data.session,
    })
  } catch (err: any) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Exception lors du test',
        error: err.message,
        checks 
      },
      { status: 500 }
    )
  }
}
