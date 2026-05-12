const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function verifyMigration() {
  console.log('🔍 Vérification de la migration R2...\n');

  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .limit(1000);

  if (error) {
    console.error('❌ Erreur de connexion:', error.message);
    return;
  }

  let totalMotels = 0;
  let motelsWithPhotos = 0;
  let supabaseUrls = 0;
  let r2Urls = 0;
  let otherUrls = 0;

  data.forEach(motel => {
    totalMotels++;
    if (motel.photos && motel.photos.length > 0) {
      motelsWithPhotos++;

      motel.photos.forEach(url => {
        if (url.includes('supabase.co')) supabaseUrls++;
        else if (url.includes('r2.cloudflarestorage.com')) r2Urls++;
        else otherUrls++;
      });
    }
  });

  console.log('📊 Résultats après migration:');
  console.log(`   Total motels: ${totalMotels}`);
  console.log(`   Motels avec photos: ${motelsWithPhotos}`);
  console.log(`   URLs Supabase restantes: ${supabaseUrls}`);
  console.log(`   URLs R2 migrées: ${r2Urls}`);
  console.log(`   Autres URLs: ${otherUrls}`);

  if (supabaseUrls === 0 && r2Urls > 0) {
    console.log('\n✅ MIGRATION RÉUSSIE ! Toutes les photos utilisent maintenant R2.');
  } else if (supabaseUrls > 0) {
    console.log(`\n⚠️  MIGRATION INCOMPLÈTE: ${supabaseUrls} URLs Supabase restantes.`);
  } else {
    console.log('\n❓ AUCUNE URL TROUVÉE - vérifiez la connexion à la base.');
  }
}

verifyMigration().catch(console.error);