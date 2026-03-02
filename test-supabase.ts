import { createClient } from '@supabase/supabase-js'

async function testSupabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('🔍 Vérification de la configuration Supabase...\n')

  if (!supabaseUrl) {
    console.error('❌ ERREUR: NEXT_PUBLIC_SUPABASE_URL est manquante')
    process.exit(1)
  }

  if (!supabaseKey) {
    console.error('❌ ERREUR: NEXT_PUBLIC_SUPABASE_ANON_KEY est manquante')
    process.exit(1)
  }

  console.log('✅ Variables d\'environnement trouvées')
  console.log(`   URL: ${supabaseUrl}`)
  console.log(`   Key: ${supabaseKey.substring(0, 10)}...`)

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('\n🔗 Test de connexion...')
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message)
      process.exit(1)
    }

    console.log('✅ Connexion Supabase réussie!')
    console.log('   Session:', data.session ? 'Authentifiée' : 'Non authentifiée')
  } catch (err) {
    console.error('❌ Exception:', err)
    process.exit(1)
  }
}

testSupabaseConnection()
