const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function recreateBackup() {
  console.log('🔄 Recréation de la sauvegarde...\n');

  try {
    // Supprimer l'ancienne table backup si elle existe
    await supabase.from('motels_backup').select('*').limit(1);
    console.log('🗑️  Suppression de l\'ancienne sauvegarde...');
    // Note: On ne peut pas DROP via l'API standard, il faudra le faire manuellement
  } catch (e) {
    // Table n'existe pas, c'est normal
  }

  console.log('💡 Veuillez exécuter manuellement dans Supabase SQL Editor:');
  console.log('DROP TABLE IF EXISTS motels_backup;');
  console.log('CREATE TABLE motels_backup AS SELECT * FROM motels;');
  console.log('');
  console.log('Puis relancez: node verify-migration.js');
}

recreateBackup().catch(console.error);