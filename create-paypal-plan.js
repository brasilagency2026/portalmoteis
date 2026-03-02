/**
 * Script pour créer automatiquement un Product et Plan PayPal
 * Usage: node create-paypal-plan.js
 */

const https = require('https');

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_ENV = process.env.PAYPAL_ENV || 'sandbox';

const BASE_URL = PAYPAL_ENV === 'live' 
  ? 'api-m.paypal.com' 
  : 'api-m.sandbox.paypal.com';

// Obtenir le token d'accès
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const options = {
      hostname: BASE_URL,
      path: '/v1/oauth2/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write('grant_type=client_credentials');
    req.end();
  });
}

// Créer un Product
function createProduct(accessToken) {
  return new Promise((resolve, reject) => {
    const productData = JSON.stringify({
      name: 'Premium BDSM Motels',
      description: 'Assinatura Premium mensal',
      type: 'DIGITAL',
      category: 'ENTERTAINMENT',
      image_url: 'https://via.placeholder.com/150',
      home_url: 'https://bdsmbrazil.com.br',
    });

    const options = {
      hostname: BASE_URL,
      path: '/v1/catalogs/products',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': productData.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const product = JSON.parse(data);
          console.log('✅ Product créé:', product.id);
          resolve(product.id);
        } else {
          reject(new Error(`Product error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(productData);
    req.end();
  });
}

// Créer un Product
function createProduct(accessToken) {
  return new Promise((resolve, reject) => {
    const productData = JSON.stringify({
      name: 'Premium Motels',
      type: 'SERVICE',
    });

    const options = {
      hostname: BASE_URL,
      path: '/v1/catalogs/products',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': productData.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const product = JSON.parse(data);
          console.log('✅ Product créé:', product.id);
          resolve(product.id);
        } else {
          reject(new Error(`Product error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(productData);
    req.end();
  });
}

// Créer un Plan (version minimale)
function createPlan(accessToken, productId) {
  return new Promise((resolve, reject) => {
    const planData = JSON.stringify({
      product_id: productId,
      name: 'Premium Monthly - BDSM Motels',
      description: 'Plano Premium mensal R$199',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: '199.00',
              currency_code: 'BRL',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
      },
    });

    const options = {
      hostname: BASE_URL,
      path: '/v1/billing/plans',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': planData.length,
        'Prefer': 'return=representation',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const plan = JSON.parse(data);
          console.log('✅ Plan créé:', plan.id);
          console.log('\n🎯 COPIEZ CE PLAN ID DANS .env.local:');
          console.log(`NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID=${plan.id}`);
          resolve(plan.id);
        } else {
          reject(new Error(`Plan error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(planData);
    req.end();
  });
}

// Main
async function main() {
  try {
    console.log('🔄 Connexion à PayPal...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu\n');

    console.log('🔄 Création du Product...');
    const productId = await createProduct(accessToken);
    console.log('');

    console.log('🔄 Création du Plan...');
    await createPlan(accessToken, productId);
    console.log('\n✅ Terminé! Copiez le PLAN ID ci-dessus dans votre .env.local');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();
