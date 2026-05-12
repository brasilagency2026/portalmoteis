const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function debugMigration() {
  console.log('🔍 Debug de la migration...\n');

  // Charger le mapping
  const mapping = JSON.parse(fs.readFileSync('migration-mapping.json', 'utf8'));
  console.log(`Mapping contient ${Object.keys(mapping.mapping).length} URLs\n`);

  // Récupérer tous les motels
  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .not('photos', 'is', null);

  if (error) {
    console.log('❌ Erreur:', error.message);
    return;
  }

  let totalSupabaseUrls = 0;
  let totalR2Urls = 0;
  let urlsInMapping = 0;
  let urlsNotInMapping = 0;

  data.forEach(motel => {
    if (motel.photos && Array.isArray(motel.photos)) {
      motel.photos.forEach(url => {
        if (url.includes('supabase.co')) {
          totalSupabaseUrls++;
          if (mapping.mapping[url]) {
            urlsInMapping++;
          } else {
            urlsNotInMapping++;
            if (urlsNotInMapping <= 3) { // Montrer seulement les 3 premiers
              console.log(`URL non mappée: ${url.substring(0, 100)}...`);
            }
          }
        } else if (url.includes('r2.cloudflarestorage.com')) {
          totalR2Urls++;
        }
      });
    }
  });

  console.log('\n📊 Analyse:');
  console.log(`Total URLs Supabase dans DB: ${totalSupabaseUrls}`);
  console.log(`URLs Supabase dans mapping: ${urlsInMapping}`);
  console.log(`URLs Supabase PAS dans mapping: ${urlsNotInMapping}`);
  console.log(`URLs R2 dans DB: ${totalR2Urls}`);

  if (urlsNotInMapping > 0) {
    console.log('\n💡 Les URLs non mappées sont probablement des images plus récentes');
    console.log('🔄 Régénération du mapping recommandée');
  }
}

debugMigration().catch(console.error);