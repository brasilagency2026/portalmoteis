const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function executeMigration() {
  console.log('🚀 Exécution automatique de la migration...\n');

  // Lire le fichier SQL
  const sqlContent = fs.readFileSync('update-photos-url.sql', 'utf8');

  // Extraire seulement les lignes UPDATE
  const updateLines = sqlContent
    .split('\n')
    .filter(line => line.trim().startsWith('UPDATE'))
    .map(line => line.trim());

  console.log(`📋 Trouvé ${updateLines.length} requêtes UPDATE à exécuter\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < updateLines.length; i++) {
    const query = updateLines[i];
    console.log(`🔄 Exécution ${i + 1}/${updateLines.length}...`);

    try {
      const { error } = await supabase.rpc('exec_sql', { sql: query });

      if (error) {
        console.log(`❌ Erreur: ${error.message}`);
        errorCount++;
      } else {
        successCount++;
        console.log(`✅ Succès`);
      }
    } catch (err) {
      console.log(`❌ Exception: ${err.message}`);
      errorCount++;
    }

    // Petite pause pour éviter de surcharger
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Résultats finaux:');
  console.log(`✅ Réussites: ${successCount}`);
  console.log(`❌ Échecs: ${errorCount}`);

  if (errorCount === 0) {
    console.log('\n🎉 Migration terminée ! Lancez: node verify-migration.js');
  } else {
    console.log('\n⚠️  Quelques erreurs détectées. Vérifiez les logs ci-dessus.');
  }
}

executeMigration().catch(console.error);