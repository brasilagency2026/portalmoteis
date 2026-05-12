const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function regenerateMapping() {
  console.log('🔄 Régénération du mapping complet...\n');

  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .not('photos', 'is', null);

  if (error) {
    console.log('❌ Erreur:', error.message);
    return;
  }

  console.log(`Trouvé ${data.length} motels avec photos`);

  const mapping = {};
  let totalImages = 0;

  data.forEach(motel => {
    if (motel.photos && Array.isArray(motel.photos)) {
      motel.photos.forEach(url => {
        if (url.includes('supabase.co/storage/v1/object/public/motel-photos/')) {
          // Générer l'URL R2 correspondante
          const pathMatch = url.match(/motel-photos\/(.+)/);
          if (pathMatch) {
            const r2Url = `https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/${pathMatch[1]}`;
            mapping[url] = r2Url;
            totalImages++;
          }
        }
      });
    }
  });

  const result = {
    timestamp: new Date().toISOString(),
    totalImages,
    successCount: totalImages,
    errorCount: 0,
    mapping
  };

  fs.writeFileSync('migration-mapping.json', JSON.stringify(result, null, 2));
  console.log(`✅ Nouveau mapping généré: ${totalImages} images à migrer`);
  console.log('📁 Mapping sauvegardé dans migration-mapping.json');
}

regenerateMapping().catch(console.error);