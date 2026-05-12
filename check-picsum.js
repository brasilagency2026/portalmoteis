const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPicsumInDB() {
  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .limit(1000);

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  let picsumMotels = [];

  data.forEach(motel => {
    if (motel.photos && motel.photos.length > 0) {
      const hasPicsum = motel.photos.some(url => url.includes('picsum.photos'));
      if (hasPicsum) {
        picsumMotels.push({
          id: motel.id,
          name: motel.name,
          picsumUrls: motel.photos.filter(url => url.includes('picsum.photos'))
        });
      }
    }
  });

  console.log(`Motels avec URLs Picsum: ${picsumMotels.length}`);
  if (picsumMotels.length > 0) {
    console.log('Détails:');
    picsumMotels.slice(0, 5).forEach(motel => {
      console.log(`- ${motel.name} (${motel.id}): ${motel.picsumUrls.length} URLs Picsum`);
    });
  } else {
    console.log('✅ Aucun motel n\'utilise d\'URLs Picsum dans la base de données');
  }
}

checkPicsumInDB().catch(console.error);