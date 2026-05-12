const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSample() {
  console.log('🔍 Vérification manuelle des données...\n');

  const { data, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .limit(3);

  if (error) {
    console.log('❌ Erreur:', error.message);
    return;
  }

  console.log('Vérification des 3 premiers motels:');
  data.forEach((motel, i) => {
    console.log(`${i+1}. ${motel.name}`);
    console.log(`   Photos: ${motel.photos ? motel.photos.length : 0}`);
    if (motel.photos && motel.photos.length > 0) {
      console.log(`   Première URL: ${motel.photos[0].substring(0, 80)}...`);
      const hasSupabase = motel.photos.some(url => url.includes('supabase.co'));
      const hasR2 = motel.photos.some(url => url.includes('r2.cloudflarestorage.com'));
      console.log(`   Contient Supabase: ${hasSupabase}, R2: ${hasR2}`);
    }
    console.log('');
  });

  // Vérifier le motel de test
  const { data: testData } = await supabase
    .from('motels')
    .select('photos')
    .eq('id', 'f49539d9-bcd7-4878-8ae9-b10d12617865')
    .single();

  console.log('Motel de test (Meu Tabu):');
  console.log('Photos:', testData.photos);
}

checkSample().catch(console.error);