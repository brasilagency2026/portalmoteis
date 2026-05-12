const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrateViaAPI() {
  console.log('🚀 Migration via API Supabase (version corrigée)...\n');

  // Charger le mapping
  const mapping = JSON.parse(fs.readFileSync('migration-mapping.json', 'utf8'));
  console.log(`📊 ${mapping.totalImages} images dans le mapping\n`);

  // Récupérer tous les motels avec leurs photos actuelles
  const { data: motelsData, error: motelsError } = await supabase
    .from('motels')
    .select('id, name, photos')
    .not('photos', 'is', null);

  if (motelsError) {
    console.log('❌ Erreur récupération motels:', motelsError.message);
    return;
  }

  console.log(`🏨 ${motelsData.length} motels trouvés avec photos\n`);

  let successCount = 0;
  let errorCount = 0;

  // Pour chaque motel, remplacer les URLs qui sont dans le mapping
  for (const motel of motelsData) {
    const currentPhotos = motel.photos || [];
    const newPhotos = currentPhotos.map(url => {
      // Si l'URL est dans le mapping, la remplacer
      return mapping.mapping[url] || url;
    });

    // Vérifier si des URLs ont changé
    const hasChanges = JSON.stringify(currentPhotos) !== JSON.stringify(newPhotos);

    if (hasChanges) {
      console.log(`🔄 Mise à jour ${motel.name.slice(0, 20)}... (${newPhotos.length} photos)`);

      try {
        const { error } = await supabase
          .from('motels')
          .update({ photos: newPhotos })
          .eq('id', motel.id);

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
    } else {
      // Pas de changements nécessaires pour ce motel
      console.log(`⏭️  ${motel.name.slice(0, 20)} - déjà migré`);
    }

    // Petite pause
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Résultats finaux:');
  console.log(`✅ Motels mis à jour: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);

  if (errorCount === 0) {
    console.log('\n🎉 Migration terminée ! Lancez: node verify-migration.js');
  } else {
    console.log('\n⚠️  Quelques erreurs détectées.');
  }
}

migrateViaAPI().catch(console.error);