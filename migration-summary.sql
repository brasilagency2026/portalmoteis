-- ===========================================
-- MIGRATION SUPABASE VERS CLOUDFLARE R2
-- ===========================================
-- Généré le: 2026-04-03T18:11:08.988Z
-- Total images migrées: 245
-- Motels mis à jour: 141

-- ⚠️ IMPORTANT: SAUVEGARDEZ D'ABORD !
-- CREATE TABLE motels_backup AS SELECT * FROM motels;

-- Les requêtes UPDATE suivantes remplacent toutes les URLs Supabase par des URLs R2
-- Copiez-collez tout le contenu du fichier update-photos-url.sql après cette ligne