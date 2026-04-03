/**
 * Script de migration des images Supabase vers Cloudflare R2
 * 
 * Prérequis:
 * 1. npm install @aws-sdk/client-s3 @aws-sdk/lib-storage dotenv
 * 2. Créer un fichier .env.local avec:
 *    R2_ACCOUNT_ID=your_account_id
 *    R2_ACCESS_KEY_ID=your_access_key
 *    R2_SECRET_ACCESS_KEY=your_secret_key
 *    R2_BUCKET_NAME=motel-photos
 *    R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
 *    SUPABASE_URL=https://npfrnhwwlbjwfcxewysq.supabase.co
 *    SUPABASE_ANON_KEY=your_supabase_anon_key
 * 
 * Usage: node scripts/migrate-to-r2.js
 */

const { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

// Configuration R2
const R2_CLIENT = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'motel-photos';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

// Configuration Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Télécharge une image depuis Supabase et l'upload vers R2
 */
async function migrateImage(supabaseUrl, r2Key) {
  try {
    console.log(`📥 Téléchargement: ${supabaseUrl}`);
    
    // Télécharger l'image depuis Supabase
    const response = await fetch(supabaseUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Déterminer le content-type
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log(`📤 Upload vers R2: ${r2Key}`);
    
    // Upload vers R2
    const upload = new Upload({
      client: R2_CLIENT,
      params: {
        Bucket: BUCKET_NAME,
        Key: r2Key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      },
    });
    
    await upload.done();
    
    const newUrl = `${R2_PUBLIC_URL}/${r2Key}`;
    console.log(`✅ Succès: ${newUrl}`);
    return { success: true, newUrl };
    
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Extrait le chemin du fichier depuis l'URL Supabase
 */
function extractPathFromUrl(url) {
  // URL format: https://xxx.supabase.co/storage/v1/object/public/motel-photos/user-id/timestamp-filename.jpg
  const match = url.match(/motel-photos\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Migration principale
 */
async function main() {
  console.log('🚀 Début de la migration Supabase → R2\n');
  console.log(`📦 Bucket R2: ${BUCKET_NAME}`);
  console.log(`🌐 URL publique: ${R2_PUBLIC_URL}\n`);
  
  // 1. Récupérer tous les motels avec leurs photos
  console.log('📋 Récupération des motels depuis Supabase...');
  const { data: motels, error } = await supabase
    .from('motels')
    .select('id, name, photos')
    .not('photos', 'is', null);
  
  if (error) {
    console.error('❌ Erreur Supabase:', error);
    process.exit(1);
  }
  
  console.log(`✅ ${motels.length} motels trouvés avec photos\n`);
  
  // 2. Collecter toutes les URLs d'images
  const imageUrls = new Set();
  const motelImageMap = new Map(); // Pour tracker quelle image appartient à quel motel
  
  for (const motel of motels) {
    if (motel.photos && Array.isArray(motel.photos)) {
      motelImageMap.set(motel.id, []);
      for (const url of motel.photos) {
        if (url && url.includes('supabase.co')) {
          imageUrls.add(url);
          motelImageMap.get(motel.id).push(url);
        }
      }
    }
  }
  
  console.log(`📸 ${imageUrls.size} images uniques à migrer\n`);
  
  // 3. Migrer chaque image
  const urlMapping = new Map(); // Ancienne URL → Nouvelle URL
  let successCount = 0;
  let errorCount = 0;
  
  for (const url of imageUrls) {
    const path = extractPathFromUrl(url);
    if (!path) {
      console.log(`⚠️ Impossible d'extraire le chemin: ${url}`);
      errorCount++;
      continue;
    }
    
    const result = await migrateImage(url, path);
    
    if (result.success) {
      urlMapping.set(url, result.newUrl);
      successCount++;
    } else {
      errorCount++;
    }
    
    // Petite pause pour ne pas surcharger
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  
  // 4. Générer le script SQL pour mettre à jour les URLs dans Supabase
  console.log('\n📝 Génération du script SQL de mise à jour...\n');
  
  for (const motel of motels) {
    if (!motel.photos) continue;
    
    const newPhotos = motel.photos.map(url => urlMapping.get(url) || url);
    
    if (JSON.stringify(newPhotos) !== JSON.stringify(motel.photos)) {
      console.log(`-- Motel: ${motel.name} (${motel.id})`);
      console.log(`UPDATE motels SET photos = '${JSON.stringify(newPhotos)}'::jsonb WHERE id = '${motel.id}';`);
      console.log('');
    }
  }
  
  // 5. Sauvegarder le mapping dans un fichier JSON
  const fs = require('fs');
  const mappingPath = 'migration-mapping.json';
  fs.writeFileSync(mappingPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalImages: imageUrls.size,
    successCount,
    errorCount,
    mapping: Object.fromEntries(urlMapping)
  }, null, 2));
  
  console.log(`\n💾 Mapping sauvegardé dans: ${mappingPath}`);
  console.log('\n✨ Migration terminée!');
}

main().catch(console.error);
