const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkMotelIds() {
  const { data, error } = await supabase
    .from('motels')
    .select('id, name')
    .limit(10);

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  console.log('📋 Premiers 10 motels dans la base:');
  data.forEach(motel => {
    console.log(`ID: ${motel.id} - Nom: ${motel.name}`);
  });

  // Vérifier si les IDs 1 et 2 existent vraiment
  const mockIds = ['1', '2'];
  for (const id of mockIds) {
    const { data: mockData } = await supabase
      .from('motels')
      .select('id, name')
      .eq('id', id)
      .single();

    if (mockData) {
      console.log(`✅ ID ${id} existe dans la base: ${mockData.name}`);
    } else {
      console.log(`❌ ID ${id} n'existe pas - utilise données mockées`);
    }
  }
}

checkMotelIds().catch(console.error);