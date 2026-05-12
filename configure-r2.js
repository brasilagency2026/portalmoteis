const { S3Client, PutBucketCorsCommand, PutBucketPublicAccessBlockCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function configureR2CORS() {
  console.log('🔧 Configuration CORS et accès public R2...\n');

  try {
    // Configure CORS
    const corsConfig = {
      CORSRules: [
        {
          AllowedMethods: ['GET', 'HEAD'],
          AllowedOrigins: ['*'],
          AllowedHeaders: ['*'],
          MaxAgeSeconds: 3000,
        },
      ],
    };

    const corsCommand = new PutBucketCorsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      CORSConfiguration: corsConfig,
    });

    await s3Client.send(corsCommand);
    console.log('✅ CORS configuré avec succès');

    // Disable block public access
    const publicAccessCommand = new PutBucketPublicAccessBlockCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
    });

    await s3Client.send(publicAccessCommand);
    console.log('✅ Accès public configuré avec succès');

    console.log('\n✅ Configuration R2 terminée!');
    console.log(`📝 Les images devraient maintenant être accessibles à: ${process.env.R2_PUBLIC_URL}/*`);
  } catch (error) {
    console.error('❌ Erreur configuration R2:', error.message);
  }
}

configureR2CORS();
