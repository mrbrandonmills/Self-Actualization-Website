/**
 * Upload large assets to Vercel Blob Storage
 * Run: node scripts/upload-assets.js
 *
 * Requires: BLOB_READ_WRITE_TOKEN env var from Vercel dashboard
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadAssets() {
  const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

  if (!BLOB_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable not set');
    console.log('💡 Get it from: Vercel Dashboard → Storage → Create Blob Store → Copy token');
    process.exit(1);
  }

  const assetPath = path.join(__dirname, '../public/assets/laboratory-in-the-swamp/source/scene.glb');

  console.log('📦 Uploading laboratory model to Vercel Blob Storage...');
  console.log(`   File: ${assetPath}`);
  console.log(`   Size: ${(fs.statSync(assetPath).size / 1024 / 1024).toFixed(2)} MB`);

  try {
    const fileBuffer = fs.readFileSync(assetPath);

    const blob = await put('laboratory-in-the-swamp/source/scene.glb', fileBuffer, {
      access: 'public',
      token: BLOB_TOKEN,
    });

    console.log('✅ Upload successful!');
    console.log(`   URL: ${blob.url}`);
    console.log('');
    console.log('🔧 Next steps:');
    console.log(`   1. Add to .env.local:`);
    console.log(`      NEXT_PUBLIC_ASSETS_CDN=${blob.url.replace('/laboratory-in-the-swamp/source/scene.glb', '')}`);
    console.log(`   2. Add same variable to Vercel project environment variables`);
    console.log('   3. Deploy!');

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

uploadAssets();
