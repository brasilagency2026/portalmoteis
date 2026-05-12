const fs = require('fs');

try {
  const mapping = JSON.parse(fs.readFileSync('migration-mapping.json', 'utf8'));

  let sql = '-- Migration Supabase vers Cloudflare R2\n';
  sql += '-- Généré le: ' + new Date().toISOString() + '\n\n';

  sql += '-- Statistiques:\n';
  sql += '-- Total images: ' + mapping.totalImages + '\n';
  sql += '-- Succès: ' + mapping.successCount + '\n';
  sql += '-- Erreurs: ' + mapping.errorCount + '\n\n';

  sql += '-- ⚠️ IMPORTANT: Sauvegardez votre base avant d\'exécuter ces requêtes !\n\n';

  // Générer les UPDATE statements
  const motels = {};
  Object.entries(mapping.mapping).forEach(([oldUrl, newUrl]) => {
    // Extraire l'ID du motel de l'URL
    const match = oldUrl.match(/motel-photos\/([^\/]+)\//);
    if (match) {
      const motelId = match[1];
      if (!motels[motelId]) motels[motelId] = [];
      motels[motelId].push({ old: oldUrl, new: newUrl });
    }
  });

  Object.entries(motels).forEach(([motelId, photos]) => {
    const newUrls = photos.map(p => p.new);
    sql += `-- Motel ID: ${motelId}\n`;
    sql += `UPDATE motels SET photos = '${JSON.stringify(newUrls)}'::jsonb WHERE id = '${motelId}';\n\n`;
  });

  fs.writeFileSync('update-photos-url.sql', sql);
  console.log('✅ Fichier update-photos-url.sql créé avec succès !');
  console.log(`📊 ${Object.keys(motels).length} motels mis à jour`);
} catch (error) {
  console.error('❌ Erreur:', error.message);
}