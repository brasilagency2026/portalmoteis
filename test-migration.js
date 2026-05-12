const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listMotels() {
  console.log('📋 Liste des premiers motels:\n');

  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .limit(5);

  if (error) {
    console.log('❌ Erreur:', error.message);
    return;
  }

  data.forEach((motel, i) => {
    console.log(`${i + 1}. ${motel.name}`);
    console.log(`   ID: ${motel.id}`);
    console.log(`   Photos: ${motel.photos ? motel.photos.length : 0} images`);
    console.log('');
  });

  // Utiliser le premier motel pour un test
  if (data.length > 0) {
    const testMotel = data[0];
    console.log(`🧪 Test de mise à jour avec le motel: ${testMotel.name}`);

    const testUrls = [
      'https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/test-1.jpg',
      'https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/test-2.jpg'
    ];

    const { error: updateError } = await supabase
      .from('motels')
      .update({ photos: testUrls })
      .eq('id', testMotel.id);

    if (updateError) {
      console.log('❌ Erreur update:', updateError.message);
    } else {
      console.log('✅ Update réussi !');

      // Vérifier
      const { data: verifyData } = await supabase
        .from('motels')
        .select('photos')
        .eq('id', testMotel.id)
        .single();

      console.log('Nouvelles photos:', verifyData.photos);
    }
  }
}

listMotels().catch(console.error);