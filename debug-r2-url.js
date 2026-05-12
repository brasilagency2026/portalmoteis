const https = require('https');
const url = 'https://f7cb805f413f00bc777b0ad8ca5c8b37.r2.cloudflarestorage.com/355858ec-3065-4df9-a50e-b993ea71e6fe/1772660452033-0-001.jpg';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('status', res.statusCode);
  const data = [];
  res.on('data', c => data.push(c));
  res.on('end', () => {
    console.log('headers', res.headers);
    console.log('body', Buffer.concat(data).toString('utf8'));
  });
}).on('error', (e) => {
  console.error('err', e.message);
});
