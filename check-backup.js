const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBackup() {
  console.log('🔍 Vérification de la sauvegarde...\n');

  // Vérifier si la table backup existe
  const { data, error } = await supabase
    .from('motels_backup')
    .select('id, name')
    .limit(1);

  if (error) {
    console.log('❌ Table motels_backup n\'existe pas ou erreur:', error.message);
    console.log('💡 Vous devez d\'abord exécuter: CREATE TABLE motels_backup AS SELECT * FROM motels;');
    return;
  }

  console.log('✅ Table motels_backup trouvée - sauvegarde effectuée');

  // Compter les motels dans backup
  const { count } = await supabase
    .from('motels_backup')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 Sauvegarde contient ${count} motels`);
}

checkBackup().catch(console.error);