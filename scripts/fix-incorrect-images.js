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

const synergyImagesPath = '/Users/mandymarigjervikrygg/Desktop/helseriet-projekt/helseriet-frontend/public/images/brands/synergy';

// Products that need fixing (identified as having wrong images)
const problematicProducts = [
  'Zinc Complex',
  'Berry Power'
];

// Map image types to file patterns
const imagePatterns = {
  'FRONT': ['PDP.jpg', 'PDP.png', '_PDP.jpg'],
  'SIDE': ['LP.jpg', 'LP.png', '_LP.jpg'],  
  'BACK': ['RP.jpg', 'RP.png', '_RP.jpg'],
  'INGREDIENTS': ['Facts.jpg', 'Facts.png', '_Facts.jpg']
};

// Function to find image file in product directory
function findImageFile(productDir, imageType) {
  const patterns = imagePatterns[imageType];
  
  for (const pattern of patterns) {
    // Try exact match first
    const exactFile = path.join(productDir, pattern);
    if (fs.existsSync(exactFile)) {
      return exactFile;
    }
    
    // Try pattern matching
    const files = fs.readdirSync(productDir);
    for (const file of files) {
      if (file.toLowerCase().includes(pattern.toLowerCase().replace('.jpg', '').replace('.png', ''))) {
        return path.join(productDir, file);
      }
    }
  }
  
  return null;
}

// Function to create slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function uploadImageToCloudinary(filePath, productSlug, imageType, sortOrder) {
  try {
    console.log(`  📤 Re-uploading ${imageType}: ${path.basename(filePath)}`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `helseriet/synergy/synergy-${productSlug}`,
      public_id: `image_${sortOrder + 1}`,
      resource_type: 'image',
      overwrite: true, // IMPORTANT: Overwrite existing wrong images
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 800, height: 800, crop: 'pad', background: 'white' }
      ]
    });

    console.log(`  ✅ ${imageType} re-uploaded successfully to ${result.public_id}`);
    return result.secure_url;
  } catch (error) {
    console.error(`  ❌ Error re-uploading ${imageType}:`, error.message);
    return null;
  }
}

async function fixProductImages(productName) {
  const productSlug = createSlug(productName);
  
  console.log(`\\n🔄 Fixing images for: ${productName}`);
  console.log(`📁 Looking in: ${productName}`);
  console.log(`🏷️  Cloudinary folder: helseriet/synergy/synergy-${productSlug}`);
  
  // Find product directory
  const productDir = path.join(synergyImagesPath, productName);
  
  if (!fs.existsSync(productDir)) {
    console.log(`   ❌ Directory not found: ${productDir}`);
    return;
  }

  console.log(`📂 Files in directory:`, fs.readdirSync(productDir));
  
  const imageTypes = ['FRONT', 'SIDE', 'BACK', 'INGREDIENTS'];
  let fixedCount = 0;
  
  for (let i = 0; i < imageTypes.length; i++) {
    const imageType = imageTypes[i];
    const sortOrder = i;
    
    // Find original image file
    const imageFile = findImageFile(productDir, imageType);
    
    if (!imageFile) {
      console.log(`   ⚠️  ${imageType} image not found`);
      continue;
    }
    
    console.log(`   🔍 Found ${imageType}: ${path.basename(imageFile)}`);
    
    // Upload to Cloudinary (overwrite existing)
    const cloudinaryUrl = await uploadImageToCloudinary(imageFile, productSlug, imageType, sortOrder);
    
    if (cloudinaryUrl) {
      fixedCount++;
      console.log(`   ✅ ${imageType} fixed (sortOrder: ${sortOrder} -> image_${sortOrder + 1})`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`   📊 Fixed ${fixedCount} images for ${productName}`);
  return fixedCount;
}

async function fixAllProblematicImages() {
  try {
    console.log('🚀 Starting fix for problematic SYNERGY images...\\n');
    console.log('🎯 Products to fix:', problematicProducts.join(', '));
    
    let totalFixed = 0;
    
    for (const productName of problematicProducts) {
      const fixed = await fixProductImages(productName);
      totalFixed += fixed || 0;
      
      // Longer delay between products
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`\\n🎉 Fix complete!`);
    console.log(`📊 Total images fixed: ${totalFixed}`);
    console.log(`\\n⚠️  Note: Database entries remain unchanged - only Cloudinary images were overwritten.`);
    console.log(`The database still points to the same URLs, but now they show the correct images.`);
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllProblematicImages();