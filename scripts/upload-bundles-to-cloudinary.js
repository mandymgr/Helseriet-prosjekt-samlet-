#!/usr/bin/env node

require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Bundle directory path
const bundlesDir = path.join(__dirname, '../helseriet-frontend/public/images/bundles');

// Bundle image files
const bundleFiles = [
  'Beginner-Pack_Bundle_TSC.webp',
  'BrainPower_Bundle_TSC.webp', 
  'Get-Well-Soon-Bundle_TSC.webp',
  'Longevity-Bundle.webp',
  'Menopause-Support-Bundle_TSC.webp',
  'Mood-Stress_Bundle_TSC.webp',
  'Radiant-Skin_Bundle_TSC.webp',
  'Working-Man-Support-Bundle_TSC.webp',
  'You-Glow-Girl-Bundle_TSC_2.webp'
];

// Function to clean filename for folder name
function cleanFilename(filename) {
  return filename
    .replace(/_Bundle_TSC.*\.webp$/, '') // Remove _Bundle_TSC.webp
    .replace(/-Bundle.*\.webp$/, '') // Remove -Bundle.webp  
    .replace(/_TSC_2\.webp$/, '') // Remove _TSC_2.webp
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Function to generate bundle name from filename
function generateBundleName(filename) {
  return filename
    .replace(/_Bundle_TSC.*\.webp$/, '')
    .replace(/-Bundle.*\.webp$/, '')
    .replace(/_TSC_2\.webp$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word
}

async function uploadBundleImage(filename) {
  const filePath = path.join(bundlesDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return null;
  }

  const cleanName = cleanFilename(filename);
  const bundleName = generateBundleName(filename);
  
  console.log(`📤 Uploading: ${filename}`);
  console.log(`   📁 Folder: helseriet/bundles/${cleanName}`);
  console.log(`   🏷️  Name: ${bundleName}`);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `helseriet/bundles/${cleanName}`,
      public_id: 'bundle_main',
      resource_type: 'image',
      overwrite: true,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 800, height: 600, crop: 'fill' }
      ]
    });

    console.log(`✅ Success: ${result.secure_url}`);
    console.log('');
    
    return {
      filename,
      bundleName,
      cleanName,
      cloudinaryUrl: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function uploadAllBundles() {
  console.log('🎁 Starting bundle image upload to Cloudinary...\n');
  
  // Check Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Cloudinary configuration missing. Please check your .env file.');
    process.exit(1);
  }

  const results = [];
  
  for (const filename of bundleFiles) {
    const result = await uploadBundleImage(filename);
    if (result) {
      results.push(result);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('📋 Upload Summary:');
  console.log(`✅ Successful uploads: ${results.length}`);
  console.log(`❌ Failed uploads: ${bundleFiles.length - results.length}\n`);
  
  if (results.length > 0) {
    console.log('🔗 Cloudinary URLs:');
    results.forEach(result => {
      console.log(`${result.bundleName}: ${result.cloudinaryUrl}`);
    });
    
    // Save results to JSON file for database seeding
    const outputPath = path.join(__dirname, '../helseriet-backend/bundle-images.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${outputPath}`);
  }
}

// Run the upload
uploadAllBundles().catch(console.error);