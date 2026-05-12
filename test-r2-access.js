const https = require('https');
require('dotenv').config({ path: '.env.local' });

const testURL = 'https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660452033-0-001.jpg';

console.log('🧪 Test d\'accès R2...\n');
console.log('URL testée:', testURL);

https.get(testURL, {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  console.log('\n📊 Réponse HTTP:');
  console.log('Status Code:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length']);
  console.log('Access-Control-Allow-Origin:', res.headers['access-control-allow-origin'] || '❌ Non configuré');
  console.log('Access-Control-Allow-Methods:', res.headers['access-control-allow-methods'] || '❌ Non configuré');

  if (res.statusCode === 200) {
    console.log('\n✅ Image accessible !');
  } else if (res.statusCode === 403) {
    console.log('\n❌ Accès refusé (403) - R2 n\'est pas bien configuré pour l\'accès public');
  } else {
    console.log(`\n❌ Erreur HTTP ${res.statusCode}`);
  }
}).on('error', (err) => {
  console.error('❌ Erreur connexion:', err.message);
});
