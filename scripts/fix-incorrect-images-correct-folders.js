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

// Products that need fixing with their correct Cloudinary folder names
const problematicProducts = [
  { name: 'Zinc Complex', cloudinaryFolder: 'synergy-zinc-complex' },
  { name: 'Berry Power', cloudinaryFolder: 'synergy-berry-power' }
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

async function uploadImageToCloudinary(filePath, cloudinaryFolder, imageType, sortOrder) {
  try {
    console.log(`  📤 Re-uploading ${imageType}: ${path.basename(filePath)}`);
    console.log(`  📁 Target: helseriet/synergy/${cloudinaryFolder}/image_${sortOrder + 1}`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `helseriet/synergy/${cloudinaryFolder}`,
      public_id: `image_${sortOrder + 1}`,
      resource_type: 'image',
      overwrite: true, // IMPORTANT: Overwrite existing wrong images
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 800, height: 800, crop: 'pad', background: 'white' }
      ]
    });

    console.log(`  ✅ ${imageType} re-uploaded successfully`);
    console.log(`  🔗 New URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`  ❌ Error re-uploading ${imageType}:`, error.message);
    return null;
  }
}

async function fixProductImages(productInfo) {
  const { name: productName, cloudinaryFolder } = productInfo;
  
  console.log(`\\n🔄 Fixing images for: ${productName}`);
  console.log(`📁 Looking in local folder: ${productName}`);
  console.log(`☁️  Cloudinary target: helseriet/synergy/${cloudinaryFolder}`);
  
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
    
    // Upload to Cloudinary (overwrite existing in correct folder)
    const cloudinaryUrl = await uploadImageToCloudinary(imageFile, cloudinaryFolder, imageType, sortOrder);
    
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
    console.log('🚀 Starting fix for problematic SYNERGY images (CORRECT FOLDERS)...\\n');
    console.log('🎯 Products to fix:');
    problematicProducts.forEach(p => {
      console.log(`   - ${p.name} -> helseriet/synergy/${p.cloudinaryFolder}`);
    });
    
    let totalFixed = 0;
    
    for (const productInfo of problematicProducts) {
      const fixed = await fixProductImages(productInfo);
      totalFixed += fixed || 0;
      
      // Longer delay between products
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`\\n🎉 Fix complete!`);
    console.log(`📊 Total images fixed: ${totalFixed}`);
    console.log(`\\n✅ Database URLs now point to the corrected Cloudinary images!`);
    console.log(`The exact same URLs in database now show the correct images.`);
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllProblematicImages();