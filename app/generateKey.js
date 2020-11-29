const fs = require('fs');
const { V2 } = require('paseto');

async function generateKey() {
  const key = await V2.generateKey('public');
  const exported = key.export({ format: 'pem', type: 'pkcs8' }).toString('hex');
  console.log(exported);
  fs.writeFileSync('./paseto_private.key', exported);
  console.log('[INFO] Private key generated');
}

generateKey();
