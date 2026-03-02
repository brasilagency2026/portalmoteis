const { createClient } = require('@supabase/supabase-js');

const url = 'https://npfrnhwwlbjwfcxewysq.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZnJuaHd3bGJqd2ZjeGV3eXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY0MDQsImV4cCI6MjA4NzY5MjQwNH0.TrnSbwJGpfttilnmAQEVdnOhErfzG2ujx4xM0UEZUVo';

async function testConnection() {
  console.log('🔍 Test de connexion à Supabase...\n');
  
  try {
    const supabase = createClient(url, key);
    
    console.log('✅ Client Supabase créé');
    console.log(`   URL: ${url}`);
    console.log(`   Key: ${key.substring(0, 10)}...\n`);
    
    // Test de session
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('❌ Erreur:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Connexion réussie !');
    console.log('   Session:', data.session ? 'Authentifiée' : 'Aucune session');
    console.log('\n✔️  Configuration Supabase correcte\n');
    
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
  }
}

testConnection();
