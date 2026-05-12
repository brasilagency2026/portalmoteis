-- Migration Supabase vers Cloudflare R2
-- Généré le: 2026-04-03T18:11:08.988Z

-- Statistiques:
-- Total images: 245
-- Succès: 245
-- Erreurs: 0

-- ⚠️ IMPORTANT: Sauvegardez votre base avant d'exécuter ces requêtes !

-- Motel ID: 5440bbe3-55f4-4b66-a399-63c7c2526d0b
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5440bbe3-55f4-4b66-a399-63c7c2526d0b/1772582475248-0-image%20(6).png","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5440bbe3-55f4-4b66-a399-63c7c2526d0b/1772582476302-1-image%20(1).png"]'::jsonb WHERE id = '5440bbe3-55f4-4b66-a399-63c7c2526d0b';

-- Motel ID: 910c78a9-5ccc-4524-aa00-42553189518c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/910c78a9-5ccc-4524-aa00-42553189518c/1772310229525-0-pic1.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/910c78a9-5ccc-4524-aa00-42553189518c/1772310230714-1-pic2.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/910c78a9-5ccc-4524-aa00-42553189518c/1772310231486-2-pic3.jpg"]'::jsonb WHERE id = '910c78a9-5ccc-4524-aa00-42553189518c';

-- Motel ID: d09d52e5-70d0-485e-99d8-263713125def
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d09d52e5-70d0-485e-99d8-263713125def/1772721272517-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d09d52e5-70d0-485e-99d8-263713125def/1772721273319-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d09d52e5-70d0-485e-99d8-263713125def/1772721274060-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d09d52e5-70d0-485e-99d8-263713125def/1772721274924-3-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d09d52e5-70d0-485e-99d8-263713125def/1772721276720-4-005.jpg"]'::jsonb WHERE id = 'd09d52e5-70d0-485e-99d8-263713125def';

-- Motel ID: 355858ec-3065-4df9-a50e-b993ea71e6fe
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660452033-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660452509-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660452852-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660453216-3-004.jpg"]'::jsonb WHERE id = '355858ec-3065-4df9-a50e-b993ea71e6fe';

-- Motel ID: 252dc18e-dae2-4588-95ad-a51be9b71426
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/252dc18e-dae2-4588-95ad-a51be9b71426/1772631139499-0-foto1-suites.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/252dc18e-dae2-4588-95ad-a51be9b71426/1772631140518-1-foto2-suites.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/252dc18e-dae2-4588-95ad-a51be9b71426/1772631141097-2-foto3-suites.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/252dc18e-dae2-4588-95ad-a51be9b71426/1772631141672-3-foto4-suites.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/252dc18e-dae2-4588-95ad-a51be9b71426/1772631142383-4-foto5-suites.jpg"]'::jsonb WHERE id = '252dc18e-dae2-4588-95ad-a51be9b71426';

-- Motel ID: 0d7043e2-bebe-4f7a-a2d6-b564098aa0f5
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d7043e2-bebe-4f7a-a2d6-b564098aa0f5/1772722354783-3-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d7043e2-bebe-4f7a-a2d6-b564098aa0f5/1772722402636-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d7043e2-bebe-4f7a-a2d6-b564098aa0f5/1772722403256-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d7043e2-bebe-4f7a-a2d6-b564098aa0f5/1772722403846-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d7043e2-bebe-4f7a-a2d6-b564098aa0f5/1772722405165-3-005.jpg"]'::jsonb WHERE id = '0d7043e2-bebe-4f7a-a2d6-b564098aa0f5';

-- Motel ID: 8697d40b-c3bc-4d23-a5ed-996d280ffcef
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252288594-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252491348-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252492284-1-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252492705-2-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252493204-3-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252493644-4-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252494117-5-007.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252494731-6-008.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8697d40b-c3bc-4d23-a5ed-996d280ffcef/1773252495348-7-009.jpg"]'::jsonb WHERE id = '8697d40b-c3bc-4d23-a5ed-996d280ffcef';

-- Motel ID: 9298f43e-fd6a-4c5e-9db0-ae6af7786934
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9298f43e-fd6a-4c5e-9db0-ae6af7786934/1772730330088-0-003.jpeg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9298f43e-fd6a-4c5e-9db0-ae6af7786934/1772730376952-0-001.jpeg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9298f43e-fd6a-4c5e-9db0-ae6af7786934/1772730378102-1-002.jpeg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9298f43e-fd6a-4c5e-9db0-ae6af7786934/1772730431641-0-004.jpeg"]'::jsonb WHERE id = '9298f43e-fd6a-4c5e-9db0-ae6af7786934';

-- Motel ID: 8c3ebd2f-376a-48f7-9080-44a903d0bd9d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269165210-0-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269358463-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269359170-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269359660-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269360683-3-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269361212-4-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269361725-5-007.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8c3ebd2f-376a-48f7-9080-44a903d0bd9d/1773269362206-6-008.jpg"]'::jsonb WHERE id = '8c3ebd2f-376a-48f7-9080-44a903d0bd9d';

-- Motel ID: 4f315aa7-db8b-4612-83a5-ed79a0ddf4a1
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773345855272-0-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346071694-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346072434-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346073121-2-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346073980-3-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346074527-4-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4f315aa7-db8b-4612-83a5-ed79a0ddf4a1/1773346075025-5-007.jpg"]'::jsonb WHERE id = '4f315aa7-db8b-4612-83a5-ed79a0ddf4a1';

-- Motel ID: b2da0ea9-68d0-4017-8b0f-23478030f833
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b2da0ea9-68d0-4017-8b0f-23478030f833/1774469657287-0-001.jpg"]'::jsonb WHERE id = 'b2da0ea9-68d0-4017-8b0f-23478030f833';

-- Motel ID: 8411e25e-c337-47ca-869f-25bc25c3a2f0
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8411e25e-c337-47ca-869f-25bc25c3a2f0/1772735535890-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8411e25e-c337-47ca-869f-25bc25c3a2f0/1772735591692-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8411e25e-c337-47ca-869f-25bc25c3a2f0/1772735592116-1-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8411e25e-c337-47ca-869f-25bc25c3a2f0/1772735592697-2-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/8411e25e-c337-47ca-869f-25bc25c3a2f0/1772735593176-3-006.jpg"]'::jsonb WHERE id = '8411e25e-c337-47ca-869f-25bc25c3a2f0';

-- Motel ID: 9cf85418-0409-4251-8ff1-ab64035acdfa
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9cf85418-0409-4251-8ff1-ab64035acdfa/1772659333864-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9cf85418-0409-4251-8ff1-ab64035acdfa/1772659334643-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9cf85418-0409-4251-8ff1-ab64035acdfa/1772659335494-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9cf85418-0409-4251-8ff1-ab64035acdfa/1772659336209-3-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9cf85418-0409-4251-8ff1-ab64035acdfa/1772659336890-4-005.jpg"]'::jsonb WHERE id = '9cf85418-0409-4251-8ff1-ab64035acdfa';

-- Motel ID: 06b3d995-19ec-45df-b688-39044d7da41c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/06b3d995-19ec-45df-b688-39044d7da41c/1772740491629-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/06b3d995-19ec-45df-b688-39044d7da41c/1772740599016-0-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/06b3d995-19ec-45df-b688-39044d7da41c/1772740599492-1-011.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/06b3d995-19ec-45df-b688-39044d7da41c/1772740599947-2-012.jpg"]'::jsonb WHERE id = '06b3d995-19ec-45df-b688-39044d7da41c';

-- Motel ID: 81776a7b-d786-4d82-9c77-7d8f7a65d0aa
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/81776a7b-d786-4d82-9c77-7d8f7a65d0aa/1773254501298-0-001.jpg"]'::jsonb WHERE id = '81776a7b-d786-4d82-9c77-7d8f7a65d0aa';

-- Motel ID: 3a931209-3e12-4b2f-bee3-1e73b92d2acd
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3a931209-3e12-4b2f-bee3-1e73b92d2acd/1772741940340-0-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3a931209-3e12-4b2f-bee3-1e73b92d2acd/1772742105510-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3a931209-3e12-4b2f-bee3-1e73b92d2acd/1772742106073-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3a931209-3e12-4b2f-bee3-1e73b92d2acd/1772742106698-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3a931209-3e12-4b2f-bee3-1e73b92d2acd/1772742107175-3-005.jpg"]'::jsonb WHERE id = '3a931209-3e12-4b2f-bee3-1e73b92d2acd';

-- Motel ID: ea9d6079-3119-4cea-974c-ba666eb52e13
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ea9d6079-3119-4cea-974c-ba666eb52e13/1773404928098-0-001.jpg"]'::jsonb WHERE id = 'ea9d6079-3119-4cea-974c-ba666eb52e13';

-- Motel ID: 4bf94e72-4c45-4617-989a-85cb8e021b81
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337412792-0-007.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337554597-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337555378-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337556028-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337556656-3-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337557345-4-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337557991-5-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337558567-6-008.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337559482-7-009.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4bf94e72-4c45-4617-989a-85cb8e021b81/1773337560114-8-010.jpg"]'::jsonb WHERE id = '4bf94e72-4c45-4617-989a-85cb8e021b81';

-- Motel ID: 56368c73-ba80-4516-a773-384753724669
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56368c73-ba80-4516-a773-384753724669/1772811347803-0-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56368c73-ba80-4516-a773-384753724669/1772811445383-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56368c73-ba80-4516-a773-384753724669/1772811445962-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56368c73-ba80-4516-a773-384753724669/1772811446722-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56368c73-ba80-4516-a773-384753724669/1772811447574-3-004.jpg"]'::jsonb WHERE id = '56368c73-ba80-4516-a773-384753724669';

-- Motel ID: 5ec2cdd6-0524-4905-aa84-b788c8f6ba78
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5ec2cdd6-0524-4905-aa84-b788c8f6ba78/1772818340141-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5ec2cdd6-0524-4905-aa84-b788c8f6ba78/1772818384245-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5ec2cdd6-0524-4905-aa84-b788c8f6ba78/1772818385205-1-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5ec2cdd6-0524-4905-aa84-b788c8f6ba78/1772818386438-2-004-.jpg"]'::jsonb WHERE id = '5ec2cdd6-0524-4905-aa84-b788c8f6ba78';

-- Motel ID: 0d81b816-0dd0-4292-ad01-70f7dfa88e71
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d81b816-0dd0-4292-ad01-70f7dfa88e71/1772908369551-0-Suite-X-124-2-3.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d81b816-0dd0-4292-ad01-70f7dfa88e71/1772908481964-0-Suite-X-124-2.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d81b816-0dd0-4292-ad01-70f7dfa88e71/1772908484007-1-Suite-X-124-2-1.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d81b816-0dd0-4292-ad01-70f7dfa88e71/1772908484770-2-Suite-X-124-6.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0d81b816-0dd0-4292-ad01-70f7dfa88e71/1772908485468-3-Suite-X-124-7.jpg"]'::jsonb WHERE id = '0d81b816-0dd0-4292-ad01-70f7dfa88e71';

-- Motel ID: c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f/1773094255279-0-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f/1773094278506-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f/1773094279281-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f/1773094280201-2-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f/1773094280607-3-005.jpg"]'::jsonb WHERE id = 'c6fc95f1-74ac-49a8-8a5c-4007d70d3e4f';

-- Motel ID: 0122ff12-bfa9-4510-b519-162a73dae815
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0122ff12-bfa9-4510-b519-162a73dae815/1772910715302-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0122ff12-bfa9-4510-b519-162a73dae815/1772910733418-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0122ff12-bfa9-4510-b519-162a73dae815/1772910734234-1-003.jpg"]'::jsonb WHERE id = '0122ff12-bfa9-4510-b519-162a73dae815';

-- Motel ID: 2d454161-a3e4-4913-aca9-5bce53592c03
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2d454161-a3e4-4913-aca9-5bce53592c03/1773266541018-0-005.jpg"]'::jsonb WHERE id = '2d454161-a3e4-4913-aca9-5bce53592c03';

-- Motel ID: e242a9e2-c0e0-465c-a2a3-9429cfe9df8e
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e242a9e2-c0e0-465c-a2a3-9429cfe9df8e/1773167725772-0-008.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e242a9e2-c0e0-465c-a2a3-9429cfe9df8e/1773167781631-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e242a9e2-c0e0-465c-a2a3-9429cfe9df8e/1773167782796-2-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e242a9e2-c0e0-465c-a2a3-9429cfe9df8e/1773167783487-3-010.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e242a9e2-c0e0-465c-a2a3-9429cfe9df8e/1773167785503-4-011.jpg"]'::jsonb WHERE id = 'e242a9e2-c0e0-465c-a2a3-9429cfe9df8e';

-- Motel ID: 5f115fde-25e9-44ec-b012-852a0139d973
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5f115fde-25e9-44ec-b012-852a0139d973/1773173311873-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5f115fde-25e9-44ec-b012-852a0139d973/1773173359835-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5f115fde-25e9-44ec-b012-852a0139d973/1773173360245-1-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5f115fde-25e9-44ec-b012-852a0139d973/1773173360706-2-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5f115fde-25e9-44ec-b012-852a0139d973/1773173361282-3-006.jpg"]'::jsonb WHERE id = '5f115fde-25e9-44ec-b012-852a0139d973';

-- Motel ID: 603a1614-94b2-4c9a-9d48-33f88fe95815
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175139019-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175209897-0-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175210495-1-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175211052-2-010.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175212052-3-011.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/603a1614-94b2-4c9a-9d48-33f88fe95815/1773175213101-4-012.jpg"]'::jsonb WHERE id = '603a1614-94b2-4c9a-9d48-33f88fe95815';

-- Motel ID: 56e62092-97c1-461a-91b8-21d6d08485bb
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/56e62092-97c1-461a-91b8-21d6d08485bb/1773247014156-0-001.jpg"]'::jsonb WHERE id = '56e62092-97c1-461a-91b8-21d6d08485bb';

-- Motel ID: bd971635-9a99-46a5-be1a-8916a8bc9767
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250056927-0-003.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250400470-0-001.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250401058-1-002.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250401489-2-004.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250401956-3-005.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250402534-4-006.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250403101-5-007.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250403488-6-008.jpg","https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/bd971635-9a99-46a5-be1a-8916a8bc9767/1773250404169-7-009.jpg"]'::jsonb WHERE id = 'bd971635-9a99-46a5-be1a-8916a8bc9767';

-- Motel ID: be31e785-af96-48fc-b7f4-87d0717c1346
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/be31e785-af96-48fc-b7f4-87d0717c1346/1773410559977-0-006.jpg"]'::jsonb WHERE id = 'be31e785-af96-48fc-b7f4-87d0717c1346';

-- Motel ID: 9104a2f1-143c-469a-a21f-c83d98da4799
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9104a2f1-143c-469a-a21f-c83d98da4799/1773412858052-0-002.jpg"]'::jsonb WHERE id = '9104a2f1-143c-469a-a21f-c83d98da4799';

-- Motel ID: 15c01f0c-7c77-4785-8d12-ffc8044a6184
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/15c01f0c-7c77-4785-8d12-ffc8044a6184/1774451411218-0-004.jpg"]'::jsonb WHERE id = '15c01f0c-7c77-4785-8d12-ffc8044a6184';

-- Motel ID: 52f34c4a-08af-436c-8f1c-111d038a2a96
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/52f34c4a-08af-436c-8f1c-111d038a2a96/1774452173509-0-001.jpg"]'::jsonb WHERE id = '52f34c4a-08af-436c-8f1c-111d038a2a96';

-- Motel ID: 4e4ca3ef-5346-4223-b400-d847ae08be2a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4e4ca3ef-5346-4223-b400-d847ae08be2a/1774462038954-0-003.jpg"]'::jsonb WHERE id = '4e4ca3ef-5346-4223-b400-d847ae08be2a';

-- Motel ID: 2f6f06e7-dc4b-4233-89be-ce0843ac402f
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2f6f06e7-dc4b-4233-89be-ce0843ac402f/1774459446363-0-006.jpg"]'::jsonb WHERE id = '2f6f06e7-dc4b-4233-89be-ce0843ac402f';

-- Motel ID: b4407364-5492-4f88-92d6-a57b5a5ae38d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b4407364-5492-4f88-92d6-a57b5a5ae38d/1774461133175-0-001.jpg"]'::jsonb WHERE id = 'b4407364-5492-4f88-92d6-a57b5a5ae38d';

-- Motel ID: 4519d760-a200-4521-ba30-92779b07cb7d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4519d760-a200-4521-ba30-92779b07cb7d/1774464001976-0-001.png"]'::jsonb WHERE id = '4519d760-a200-4521-ba30-92779b07cb7d';

-- Motel ID: 1256931f-0ac1-4738-bc8b-4aa95d1d7d6d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/1256931f-0ac1-4738-bc8b-4aa95d1d7d6d/1774464642757-0-001.jpg"]'::jsonb WHERE id = '1256931f-0ac1-4738-bc8b-4aa95d1d7d6d';

-- Motel ID: b1a148d6-babb-47ab-96a2-5b95894b0e48
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b1a148d6-babb-47ab-96a2-5b95894b0e48/1774465170476-0-foto5.jpg"]'::jsonb WHERE id = 'b1a148d6-babb-47ab-96a2-5b95894b0e48';

-- Motel ID: 65754cc8-22c4-40cd-a89c-ec962e58258e
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/65754cc8-22c4-40cd-a89c-ec962e58258e/1774534588800-0-001.jpg"]'::jsonb WHERE id = '65754cc8-22c4-40cd-a89c-ec962e58258e';

-- Motel ID: 568796e5-a796-4ee7-9a46-58d1d8c2a349
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/568796e5-a796-4ee7-9a46-58d1d8c2a349/1774535120087-0-002.jpg"]'::jsonb WHERE id = '568796e5-a796-4ee7-9a46-58d1d8c2a349';

-- Motel ID: ee0ed192-4125-4e8e-9ab6-0fe40fd3f446
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ee0ed192-4125-4e8e-9ab6-0fe40fd3f446/1774535597119-0-001.jpg"]'::jsonb WHERE id = 'ee0ed192-4125-4e8e-9ab6-0fe40fd3f446';

-- Motel ID: f1967ed7-401e-45da-9efc-a50e45696ee4
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f1967ed7-401e-45da-9efc-a50e45696ee4/1774536045752-0-001.png"]'::jsonb WHERE id = 'f1967ed7-401e-45da-9efc-a50e45696ee4';

-- Motel ID: ad7ce2cb-f495-470c-9af5-a8862c27885a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ad7ce2cb-f495-470c-9af5-a8862c27885a/1774536661821-0-001.jpg"]'::jsonb WHERE id = 'ad7ce2cb-f495-470c-9af5-a8862c27885a';

-- Motel ID: 3cb74add-7b7f-4839-b5bf-f767ed740b42
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3cb74add-7b7f-4839-b5bf-f767ed740b42/1774537247055-0-001.webp"]'::jsonb WHERE id = '3cb74add-7b7f-4839-b5bf-f767ed740b42';

-- Motel ID: 9839f776-ec46-4821-ac00-94b52d3d213f
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9839f776-ec46-4821-ac00-94b52d3d213f/1774539016118-0-001.png"]'::jsonb WHERE id = '9839f776-ec46-4821-ac00-94b52d3d213f';

-- Motel ID: ffd97d32-f1c1-4ea7-9c08-730ecc827e1c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ffd97d32-f1c1-4ea7-9c08-730ecc827e1c/1774539425138-0-002.jpg"]'::jsonb WHERE id = 'ffd97d32-f1c1-4ea7-9c08-730ecc827e1c';

-- Motel ID: b63f1532-9bdc-4af2-94ab-8f46d349af4a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b63f1532-9bdc-4af2-94ab-8f46d349af4a/1774540132964-0-001.jpg"]'::jsonb WHERE id = 'b63f1532-9bdc-4af2-94ab-8f46d349af4a';

-- Motel ID: 7f00cb7f-5ae9-40af-a96a-8eb272779067
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/7f00cb7f-5ae9-40af-a96a-8eb272779067/1774541234226-0-001.jpg"]'::jsonb WHERE id = '7f00cb7f-5ae9-40af-a96a-8eb272779067';

-- Motel ID: 89aa99aa-de34-48ca-b923-b4c8aa576f52
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/89aa99aa-de34-48ca-b923-b4c8aa576f52/1774542273183-0-01.jpg"]'::jsonb WHERE id = '89aa99aa-de34-48ca-b923-b4c8aa576f52';

-- Motel ID: 1198b7a3-9850-436e-91db-2305d79f1707
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/1198b7a3-9850-436e-91db-2305d79f1707/1774543035537-0-001.jpeg"]'::jsonb WHERE id = '1198b7a3-9850-436e-91db-2305d79f1707';

-- Motel ID: 3f056d8e-3f9f-442f-a634-29916066a2c7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/3f056d8e-3f9f-442f-a634-29916066a2c7/1774544190559-0-01.jpg"]'::jsonb WHERE id = '3f056d8e-3f9f-442f-a634-29916066a2c7';

-- Motel ID: 705b9ada-59d3-45bb-9ecf-dec5d3fa47e5
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/705b9ada-59d3-45bb-9ecf-dec5d3fa47e5/1774552801432-0-001.jpg"]'::jsonb WHERE id = '705b9ada-59d3-45bb-9ecf-dec5d3fa47e5';

-- Motel ID: 663b9362-0577-4275-b004-884bc8aadc42
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/663b9362-0577-4275-b004-884bc8aadc42/1774616362409-0-001.jpg"]'::jsonb WHERE id = '663b9362-0577-4275-b004-884bc8aadc42';

-- Motel ID: b9521fa1-8515-4212-a932-7e35a866b6ff
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b9521fa1-8515-4212-a932-7e35a866b6ff/1774615547080-0-1.jpg"]'::jsonb WHERE id = 'b9521fa1-8515-4212-a932-7e35a866b6ff';

-- Motel ID: 85b463bd-87c3-49c0-a810-7080b48b09a9
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/85b463bd-87c3-49c0-a810-7080b48b09a9/1774617817360-0-001.jpg"]'::jsonb WHERE id = '85b463bd-87c3-49c0-a810-7080b48b09a9';

-- Motel ID: c8769a99-7b50-4b17-9a6a-9df226b8bc53
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c8769a99-7b50-4b17-9a6a-9df226b8bc53/1774618174744-0-01.jpg"]'::jsonb WHERE id = 'c8769a99-7b50-4b17-9a6a-9df226b8bc53';

-- Motel ID: 42b2ac70-91dd-4395-affe-7214ac4e319c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/42b2ac70-91dd-4395-affe-7214ac4e319c/1774711201800-0-001.jpg"]'::jsonb WHERE id = '42b2ac70-91dd-4395-affe-7214ac4e319c';

-- Motel ID: 96ebbc47-bbf6-4b74-a6c5-a96f7c99f2e0
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/96ebbc47-bbf6-4b74-a6c5-a96f7c99f2e0/1774974879920-0-001.jpg"]'::jsonb WHERE id = '96ebbc47-bbf6-4b74-a6c5-a96f7c99f2e0';

-- Motel ID: 7a6caf9a-f2ca-4574-86c5-0df2f0e36ac6
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/7a6caf9a-f2ca-4574-86c5-0df2f0e36ac6/1774618609849-0-007.jpg"]'::jsonb WHERE id = '7a6caf9a-f2ca-4574-86c5-0df2f0e36ac6';

-- Motel ID: c3755b13-ec9d-4ce8-824a-870e87c1d4a0
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c3755b13-ec9d-4ce8-824a-870e87c1d4a0/1774620436930-0-001.jpg"]'::jsonb WHERE id = 'c3755b13-ec9d-4ce8-824a-870e87c1d4a0';

-- Motel ID: 61d1f780-830e-4a42-bcaf-4889993ff63d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/61d1f780-830e-4a42-bcaf-4889993ff63d/1774704344826-0-002.avif"]'::jsonb WHERE id = '61d1f780-830e-4a42-bcaf-4889993ff63d';

-- Motel ID: 5dc917b7-5efd-445a-8e47-b6cc5a02fb3f
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5dc917b7-5efd-445a-8e47-b6cc5a02fb3f/1774621817735-0-001.avif"]'::jsonb WHERE id = '5dc917b7-5efd-445a-8e47-b6cc5a02fb3f';

-- Motel ID: 7bf49a65-e7c1-4ae1-8ced-978a642c9cd7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/7bf49a65-e7c1-4ae1-8ced-978a642c9cd7/1774704824078-0-001.jpg"]'::jsonb WHERE id = '7bf49a65-e7c1-4ae1-8ced-978a642c9cd7';

-- Motel ID: 470adc8e-3a7a-47af-a024-3a2d1b616fd7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/470adc8e-3a7a-47af-a024-3a2d1b616fd7/1774706870432-0-001.jpg"]'::jsonb WHERE id = '470adc8e-3a7a-47af-a024-3a2d1b616fd7';

-- Motel ID: 70a9e7e2-6144-4165-b957-9fc5269c7a8c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/70a9e7e2-6144-4165-b957-9fc5269c7a8c/1774707495869-0-001.avif"]'::jsonb WHERE id = '70a9e7e2-6144-4165-b957-9fc5269c7a8c';

-- Motel ID: 0e677140-293f-491c-abd2-48f73b103ea7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0e677140-293f-491c-abd2-48f73b103ea7/1774707947368-0-001.jpg"]'::jsonb WHERE id = '0e677140-293f-491c-abd2-48f73b103ea7';

-- Motel ID: 024b203d-4325-4087-94bd-f5b8fc762022
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/024b203d-4325-4087-94bd-f5b8fc762022/1774709728001-0-001.jpg"]'::jsonb WHERE id = '024b203d-4325-4087-94bd-f5b8fc762022';

-- Motel ID: d63bae77-6eeb-400a-9e61-33ed41230a87
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d63bae77-6eeb-400a-9e61-33ed41230a87/1774983877317-0-001.jpg"]'::jsonb WHERE id = 'd63bae77-6eeb-400a-9e61-33ed41230a87';

-- Motel ID: 4799387d-ed5a-45c2-9565-e98229bb7e43
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4799387d-ed5a-45c2-9565-e98229bb7e43/1774711553658-0-001.jpg"]'::jsonb WHERE id = '4799387d-ed5a-45c2-9565-e98229bb7e43';

-- Motel ID: e3272934-8251-42bf-b39b-3c54a0180cb4
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e3272934-8251-42bf-b39b-3c54a0180cb4/1774711979332-0-001.jpg"]'::jsonb WHERE id = 'e3272934-8251-42bf-b39b-3c54a0180cb4';

-- Motel ID: 2ef78243-7643-439d-8bc3-465bf9a46a34
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2ef78243-7643-439d-8bc3-465bf9a46a34/1774712349344-0-001.jpg"]'::jsonb WHERE id = '2ef78243-7643-439d-8bc3-465bf9a46a34';

-- Motel ID: 6b77538f-ae9b-44f5-b306-fe7b8a6a37ca
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/6b77538f-ae9b-44f5-b306-fe7b8a6a37ca/1774712850025-0-001.avif"]'::jsonb WHERE id = '6b77538f-ae9b-44f5-b306-fe7b8a6a37ca';

-- Motel ID: f5ad3b02-cee9-42cb-8b7d-9074a09b2253
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f5ad3b02-cee9-42cb-8b7d-9074a09b2253/1774787871476-0-001.gif"]'::jsonb WHERE id = 'f5ad3b02-cee9-42cb-8b7d-9074a09b2253';

-- Motel ID: 9df9338f-254b-4da5-bb2c-6a19c8ed8adf
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9df9338f-254b-4da5-bb2c-6a19c8ed8adf/1774788177835-0-001.jpg"]'::jsonb WHERE id = '9df9338f-254b-4da5-bb2c-6a19c8ed8adf';

-- Motel ID: fde1f573-d52f-49e1-aa42-c46ef3e44d53
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/fde1f573-d52f-49e1-aa42-c46ef3e44d53/1774885018983-0-001.jpg"]'::jsonb WHERE id = 'fde1f573-d52f-49e1-aa42-c46ef3e44d53';

-- Motel ID: ea228299-cd80-48b6-b888-ecc4b802a5c3
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ea228299-cd80-48b6-b888-ecc4b802a5c3/1774885313621-0-001.png"]'::jsonb WHERE id = 'ea228299-cd80-48b6-b888-ecc4b802a5c3';

-- Motel ID: acbaf22d-d073-4bba-84a7-13010f89ceb4
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/acbaf22d-d073-4bba-84a7-13010f89ceb4/1774790204512-0-001.jpg"]'::jsonb WHERE id = 'acbaf22d-d073-4bba-84a7-13010f89ceb4';

-- Motel ID: 726887c3-3825-4c24-9e20-bcb5c2f53902
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/726887c3-3825-4c24-9e20-bcb5c2f53902/1774789033130-0-001.jpg"]'::jsonb WHERE id = '726887c3-3825-4c24-9e20-bcb5c2f53902';

-- Motel ID: 49f8334c-1eb2-4cec-b917-5823596c744e
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/49f8334c-1eb2-4cec-b917-5823596c744e/1774789463476-0-001.jpg"]'::jsonb WHERE id = '49f8334c-1eb2-4cec-b917-5823596c744e';

-- Motel ID: 237eda4c-93da-4ddb-98a4-1bcc735cb44c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/237eda4c-93da-4ddb-98a4-1bcc735cb44c/1774789836098-0-001.jpg"]'::jsonb WHERE id = '237eda4c-93da-4ddb-98a4-1bcc735cb44c';

-- Motel ID: 1833700e-948f-47cd-811a-5454ac1ac2a7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/1833700e-948f-47cd-811a-5454ac1ac2a7/1774796089678-0-001.webp"]'::jsonb WHERE id = '1833700e-948f-47cd-811a-5454ac1ac2a7';

-- Motel ID: ebd7aa7a-1975-44b0-af91-01d07f3401a8
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ebd7aa7a-1975-44b0-af91-01d07f3401a8/1774796485953-0-001.jpeg"]'::jsonb WHERE id = 'ebd7aa7a-1975-44b0-af91-01d07f3401a8';

-- Motel ID: 66d5b930-d4b2-4c00-9ff9-552731a75ddf
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/66d5b930-d4b2-4c00-9ff9-552731a75ddf/1774796913723-0-001.jpg"]'::jsonb WHERE id = '66d5b930-d4b2-4c00-9ff9-552731a75ddf';

-- Motel ID: 4dd438ec-be43-4f84-bd9f-333f202a731a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4dd438ec-be43-4f84-bd9f-333f202a731a/1774797210709-0-001.jpg"]'::jsonb WHERE id = '4dd438ec-be43-4f84-bd9f-333f202a731a';

-- Motel ID: d2a0b123-d582-4d6e-b142-27a514f2f06a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d2a0b123-d582-4d6e-b142-27a514f2f06a/1774797650545-0-001.jpg"]'::jsonb WHERE id = 'd2a0b123-d582-4d6e-b142-27a514f2f06a';

-- Motel ID: f8e8af46-e632-4309-b81a-8650f77f89ab
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f8e8af46-e632-4309-b81a-8650f77f89ab/1774885994337-0-001.jpg"]'::jsonb WHERE id = 'f8e8af46-e632-4309-b81a-8650f77f89ab';

-- Motel ID: fc475616-e9db-4234-b98b-ce249b9c2f75
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/fc475616-e9db-4234-b98b-ce249b9c2f75/1774798058728-0-001.jpg"]'::jsonb WHERE id = 'fc475616-e9db-4234-b98b-ce249b9c2f75';

-- Motel ID: 654b7bc4-b3b1-4372-bc85-d967701dd27a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/654b7bc4-b3b1-4372-bc85-d967701dd27a/1774798379100-0-001.jpg"]'::jsonb WHERE id = '654b7bc4-b3b1-4372-bc85-d967701dd27a';

-- Motel ID: 2acb5f07-776a-4c63-bad5-6cda317b12a2
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2acb5f07-776a-4c63-bad5-6cda317b12a2/1774874523626-0-001.jpg"]'::jsonb WHERE id = '2acb5f07-776a-4c63-bad5-6cda317b12a2';

-- Motel ID: 1318acfb-d730-4298-9c0b-b063b85e7eba
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/1318acfb-d730-4298-9c0b-b063b85e7eba/1774799857680-0-001.png"]'::jsonb WHERE id = '1318acfb-d730-4298-9c0b-b063b85e7eba';

-- Motel ID: 613d3ff9-9936-4fcd-97d4-434c09c41ec3
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/613d3ff9-9936-4fcd-97d4-434c09c41ec3/1774800943534-0-001.jpeg"]'::jsonb WHERE id = '613d3ff9-9936-4fcd-97d4-434c09c41ec3';

-- Motel ID: 553b2114-084f-4114-85bf-322b001c0095
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/553b2114-084f-4114-85bf-322b001c0095/1774801458323-0-001.jpg"]'::jsonb WHERE id = '553b2114-084f-4114-85bf-322b001c0095';

-- Motel ID: 9388a97f-25af-4db9-8e58-6081990fefa7
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/9388a97f-25af-4db9-8e58-6081990fefa7/1774877716893-0-001.webp"]'::jsonb WHERE id = '9388a97f-25af-4db9-8e58-6081990fefa7';

-- Motel ID: e66085d3-3eb7-417a-a814-b4aa605c5285
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/e66085d3-3eb7-417a-a814-b4aa605c5285/1774879544727-0-001.avif"]'::jsonb WHERE id = 'e66085d3-3eb7-417a-a814-b4aa605c5285';

-- Motel ID: ef85393a-4fcc-4890-9582-b7d5c0e9de45
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/ef85393a-4fcc-4890-9582-b7d5c0e9de45/1774884667141-0-001.jpg"]'::jsonb WHERE id = 'ef85393a-4fcc-4890-9582-b7d5c0e9de45';

-- Motel ID: 2ea54d25-88ad-4296-b547-a34c23e6d585
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2ea54d25-88ad-4296-b547-a34c23e6d585/1774885633254-0-001.jpg"]'::jsonb WHERE id = '2ea54d25-88ad-4296-b547-a34c23e6d585';

-- Motel ID: 286de31d-6dee-4cb1-8a01-5223c31aa256
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/286de31d-6dee-4cb1-8a01-5223c31aa256/1774886463371-0-001.jpg"]'::jsonb WHERE id = '286de31d-6dee-4cb1-8a01-5223c31aa256';

-- Motel ID: f3f5ddb8-f295-4703-940e-030e5f3626f5
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f3f5ddb8-f295-4703-940e-030e5f3626f5/1774889464989-0-001.jpg"]'::jsonb WHERE id = 'f3f5ddb8-f295-4703-940e-030e5f3626f5';

-- Motel ID: cf73a2ce-32d4-482d-b5d6-b3f19da7cae8
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/cf73a2ce-32d4-482d-b5d6-b3f19da7cae8/1774890330425-0-001.jpg"]'::jsonb WHERE id = 'cf73a2ce-32d4-482d-b5d6-b3f19da7cae8';

-- Motel ID: 96ab3688-bf2e-4262-84c6-8b3c50383703
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/96ab3688-bf2e-4262-84c6-8b3c50383703/1774890817088-0-001.webp"]'::jsonb WHERE id = '96ab3688-bf2e-4262-84c6-8b3c50383703';

-- Motel ID: 65964576-aeef-4173-b602-627e81d6baff
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/65964576-aeef-4173-b602-627e81d6baff/1774892260241-0-001.jpg"]'::jsonb WHERE id = '65964576-aeef-4173-b602-627e81d6baff';

-- Motel ID: 15a5721f-3504-4d7d-be78-22a3b319585b
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/15a5721f-3504-4d7d-be78-22a3b319585b/1774894107746-0-001.jpg"]'::jsonb WHERE id = '15a5721f-3504-4d7d-be78-22a3b319585b';

-- Motel ID: c7ffc78b-e04b-4c86-be99-fb001aa2a9f2
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c7ffc78b-e04b-4c86-be99-fb001aa2a9f2/1774894717080-0-001.jpg"]'::jsonb WHERE id = 'c7ffc78b-e04b-4c86-be99-fb001aa2a9f2';

-- Motel ID: 31747a20-478c-4b57-8b1b-bf81931fb26f
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/31747a20-478c-4b57-8b1b-bf81931fb26f/1774901140800-0-001.jpg"]'::jsonb WHERE id = '31747a20-478c-4b57-8b1b-bf81931fb26f';

-- Motel ID: 37890442-f295-4c87-8bd6-0c4e8a55291b
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/37890442-f295-4c87-8bd6-0c4e8a55291b/1774982904460-0-001.webp"]'::jsonb WHERE id = '37890442-f295-4c87-8bd6-0c4e8a55291b';

-- Motel ID: a73f5803-34e0-478d-a7aa-9ce0da320a16
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/a73f5803-34e0-478d-a7aa-9ce0da320a16/1774895324518-0-001.jpg"]'::jsonb WHERE id = 'a73f5803-34e0-478d-a7aa-9ce0da320a16';

-- Motel ID: 814b79de-0b36-4ada-abb9-268c7f2da42c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/814b79de-0b36-4ada-abb9-268c7f2da42c/1774895758460-0-001.jpg"]'::jsonb WHERE id = '814b79de-0b36-4ada-abb9-268c7f2da42c';

-- Motel ID: 77dbdfd9-cc2a-4be1-b12c-7205a16932b5
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/77dbdfd9-cc2a-4be1-b12c-7205a16932b5/1774896274042-0-001.jpg"]'::jsonb WHERE id = '77dbdfd9-cc2a-4be1-b12c-7205a16932b5';

-- Motel ID: 40ad6e4f-dca6-4982-8800-056d3e5785a0
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/40ad6e4f-dca6-4982-8800-056d3e5785a0/1774897257848-0-001.jpg"]'::jsonb WHERE id = '40ad6e4f-dca6-4982-8800-056d3e5785a0';

-- Motel ID: c6115f6a-6a40-46f2-9b8b-45fffc5a49aa
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c6115f6a-6a40-46f2-9b8b-45fffc5a49aa/1774898264529-0-001.jpg"]'::jsonb WHERE id = 'c6115f6a-6a40-46f2-9b8b-45fffc5a49aa';

-- Motel ID: 0a944111-faac-4e27-af97-face7d062132
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0a944111-faac-4e27-af97-face7d062132/1774898679408-0-001.jpg"]'::jsonb WHERE id = '0a944111-faac-4e27-af97-face7d062132';

-- Motel ID: b496364a-4c2e-41d8-9941-a818e9fe448d
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/b496364a-4c2e-41d8-9941-a818e9fe448d/1774898973361-0-001.jpg"]'::jsonb WHERE id = 'b496364a-4c2e-41d8-9941-a818e9fe448d';

-- Motel ID: 0c40a51c-5088-4144-8062-d223e3334b85
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/0c40a51c-5088-4144-8062-d223e3334b85/1774899527930-0-001.jpg"]'::jsonb WHERE id = '0c40a51c-5088-4144-8062-d223e3334b85';

-- Motel ID: 784c5fc8-87d3-4c94-9e3f-cc5a3efe5d74
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/784c5fc8-87d3-4c94-9e3f-cc5a3efe5d74/1774902501322-0-001.jpg"]'::jsonb WHERE id = '784c5fc8-87d3-4c94-9e3f-cc5a3efe5d74';

-- Motel ID: f611e15f-874d-4fdc-91dc-05e7712b048a
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f611e15f-874d-4fdc-91dc-05e7712b048a/1774903388329-0-001.jpg"]'::jsonb WHERE id = 'f611e15f-874d-4fdc-91dc-05e7712b048a';

-- Motel ID: eda2eb0e-cb39-4ee8-aa00-6f23a0bd4fcc
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/eda2eb0e-cb39-4ee8-aa00-6f23a0bd4fcc/1774904099942-0-001.jpg"]'::jsonb WHERE id = 'eda2eb0e-cb39-4ee8-aa00-6f23a0bd4fcc';

-- Motel ID: 39c26ca4-1848-4fb8-9efc-ce3ccd0cef99
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/39c26ca4-1848-4fb8-9efc-ce3ccd0cef99/1774906104185-0-001.jpg"]'::jsonb WHERE id = '39c26ca4-1848-4fb8-9efc-ce3ccd0cef99';

-- Motel ID: 79476f5f-d0ab-4b82-9873-06d02cf4a344
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/79476f5f-d0ab-4b82-9873-06d02cf4a344/1774968184747-0-001.jpg"]'::jsonb WHERE id = '79476f5f-d0ab-4b82-9873-06d02cf4a344';

-- Motel ID: 017d9893-fb0c-48b3-95fc-90023ccac015
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/017d9893-fb0c-48b3-95fc-90023ccac015/1774971307781-0-001.jpg"]'::jsonb WHERE id = '017d9893-fb0c-48b3-95fc-90023ccac015';

-- Motel ID: d6e43523-6bd8-4d3d-863f-031952b37ccc
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d6e43523-6bd8-4d3d-863f-031952b37ccc/1774971785350-0-001.webp"]'::jsonb WHERE id = 'd6e43523-6bd8-4d3d-863f-031952b37ccc';

-- Motel ID: 4fa57d3a-a099-4833-ac65-c551982f783c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/4fa57d3a-a099-4833-ac65-c551982f783c/1774972146808-0-001.jpg"]'::jsonb WHERE id = '4fa57d3a-a099-4833-ac65-c551982f783c';

-- Motel ID: a0997657-c162-41a7-adb2-c53e1277f2cf
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/a0997657-c162-41a7-adb2-c53e1277f2cf/1774972505419-0-001.jpg"]'::jsonb WHERE id = 'a0997657-c162-41a7-adb2-c53e1277f2cf';

-- Motel ID: 87a3e100-d8ce-40a0-b207-aabb5a730ab4
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/87a3e100-d8ce-40a0-b207-aabb5a730ab4/1774975312566-0-001.jpg"]'::jsonb WHERE id = '87a3e100-d8ce-40a0-b207-aabb5a730ab4';

-- Motel ID: 58a8614e-6fb1-473b-9c91-e9b0ba865777
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/58a8614e-6fb1-473b-9c91-e9b0ba865777/1774975849860-0-001.jpg"]'::jsonb WHERE id = '58a8614e-6fb1-473b-9c91-e9b0ba865777';

-- Motel ID: 5a67c147-34ba-4fdb-a887-95b9a51749cc
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/5a67c147-34ba-4fdb-a887-95b9a51749cc/1774976197955-0-001.jpg"]'::jsonb WHERE id = '5a67c147-34ba-4fdb-a887-95b9a51749cc';

-- Motel ID: c771bd78-08c4-4913-aad2-d5c0d3cb0dcd
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/c771bd78-08c4-4913-aad2-d5c0d3cb0dcd/1774976600263-0-001.jpg"]'::jsonb WHERE id = 'c771bd78-08c4-4913-aad2-d5c0d3cb0dcd';

-- Motel ID: f05949fc-c9e4-4ab4-b469-074748f8e236
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f05949fc-c9e4-4ab4-b469-074748f8e236/1774982433381-0-001.webp"]'::jsonb WHERE id = 'f05949fc-c9e4-4ab4-b469-074748f8e236';

-- Motel ID: af0aa6a3-13e2-43cf-8638-320f0bbffa84
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/af0aa6a3-13e2-43cf-8638-320f0bbffa84/1774983572597-0-001.jpg"]'::jsonb WHERE id = 'af0aa6a3-13e2-43cf-8638-320f0bbffa84';

-- Motel ID: 62f281a0-ad72-4413-a19c-a1323e6a8842
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/62f281a0-ad72-4413-a19c-a1323e6a8842/1774984679862-0-001.webp"]'::jsonb WHERE id = '62f281a0-ad72-4413-a19c-a1323e6a8842';

-- Motel ID: cd439b8c-0df3-41e2-b7d8-b260dd5f05e1
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/cd439b8c-0df3-41e2-b7d8-b260dd5f05e1/1775235304878-0-001.jpg"]'::jsonb WHERE id = 'cd439b8c-0df3-41e2-b7d8-b260dd5f05e1';

-- Motel ID: f4ab7821-17f7-41e9-91ca-d6bb8b2f8c4c
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/f4ab7821-17f7-41e9-91ca-d6bb8b2f8c4c/1774976904365-0-001.jpg"]'::jsonb WHERE id = 'f4ab7821-17f7-41e9-91ca-d6bb8b2f8c4c';

-- Motel ID: 735126ad-5050-4b19-8765-b1e4b79bdee1
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/735126ad-5050-4b19-8765-b1e4b79bdee1/1774977336674-0-001.jpg"]'::jsonb WHERE id = '735126ad-5050-4b19-8765-b1e4b79bdee1';

-- Motel ID: d9d80ea2-a753-4f46-8527-1cf95450b251
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d9d80ea2-a753-4f46-8527-1cf95450b251/1774979264162-0-001.jpg"]'::jsonb WHERE id = 'd9d80ea2-a753-4f46-8527-1cf95450b251';

-- Motel ID: 2f01d7e3-888d-4fa6-a6c9-59d863b70900
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/2f01d7e3-888d-4fa6-a6c9-59d863b70900/1774979603786-0-001.jpg"]'::jsonb WHERE id = '2f01d7e3-888d-4fa6-a6c9-59d863b70900';

-- Motel ID: 30b8d187-7b8b-4d6a-99eb-27689c531b89
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/30b8d187-7b8b-4d6a-99eb-27689c531b89/1774980001854-0-001.jpg"]'::jsonb WHERE id = '30b8d187-7b8b-4d6a-99eb-27689c531b89';

-- Motel ID: 7277bba0-ef26-44eb-ab99-628715fb0027
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/7277bba0-ef26-44eb-ab99-628715fb0027/1774980376965-0-001.jpg"]'::jsonb WHERE id = '7277bba0-ef26-44eb-ab99-628715fb0027';

-- Motel ID: 525a2904-a51b-4e49-97f1-7cf914a8d850
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/525a2904-a51b-4e49-97f1-7cf914a8d850/1774980920924-0-001.png"]'::jsonb WHERE id = '525a2904-a51b-4e49-97f1-7cf914a8d850';

-- Motel ID: a17c3ec5-0702-4af1-b1f0-911968629a88
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/a17c3ec5-0702-4af1-b1f0-911968629a88/1774981408263-0-001.jpg"]'::jsonb WHERE id = 'a17c3ec5-0702-4af1-b1f0-911968629a88';

-- Motel ID: 13a5c4ea-584e-4317-9957-6b04bfd19044
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/13a5c4ea-584e-4317-9957-6b04bfd19044/1774981736560-0-001.jpg"]'::jsonb WHERE id = '13a5c4ea-584e-4317-9957-6b04bfd19044';

-- Motel ID: d1fa2d03-efa6-407c-b690-a35f5ac2b544
UPDATE motels SET photos = '["https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/d1fa2d03-efa6-407c-b690-a35f5ac2b544/1774982095887-0-001.webp"]'::jsonb WHERE id = 'd1fa2d03-efa6-407c-b690-a35f5ac2b544';

