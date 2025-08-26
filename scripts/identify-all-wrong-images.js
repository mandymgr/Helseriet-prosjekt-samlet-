#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const synergyImagesPath = '/Users/mandymarigjervikrygg/Desktop/helseriet-projekt/helseriet-frontend/public/images/brands/synergy';

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
      return path.basename(exactFile);
    }
    
    // Try pattern matching
    try {
      const files = fs.readdirSync(productDir);
      for (const file of files) {
        if (file.toLowerCase().includes(pattern.toLowerCase().replace('.jpg', '').replace('.png', ''))) {
          return file;
        }
      }
    } catch (e) {
      // Directory doesn't exist
      return null;
    }
  }
  
  return null;
}

function analyzeAllProducts() {
  console.log('🔍 Analyzing all SYNERGY products for potential image issues...\n');
  
  try {
    const productDirs = fs.readdirSync(synergyImagesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();
    
    console.log(`📦 Found ${productDirs.length} product directories\n`);
    
    const potentialIssues = [];
    
    productDirs.forEach((productName, index) => {
      const productDir = path.join(synergyImagesPath, productName);
      const files = fs.readdirSync(productDir);
      
      console.log(`${index + 1}. ${productName}`);
      console.log(`   📁 Files: ${files.join(', ')}`);
      
      // Check what we would find for each image type
      const imageAnalysis = {};
      ['FRONT', 'SIDE', 'BACK', 'INGREDIENTS'].forEach(imageType => {
        const found = findImageFile(productDir, imageType);
        imageAnalysis[imageType] = found;
        console.log(`   ${imageType}: ${found || 'NOT FOUND'}`);
      });
      
      // Check for potential issues
      const issues = [];
      if (!imageAnalysis.FRONT) issues.push('Missing FRONT');
      if (!imageAnalysis.SIDE) issues.push('Missing SIDE');
      if (!imageAnalysis.BACK) issues.push('Missing BACK');
      if (!imageAnalysis.INGREDIENTS) issues.push('Missing INGREDIENTS');
      
      // Check for unusual file patterns that might indicate wrong uploads
      const unusualFiles = files.filter(file => 
        !file.includes('PDP') && 
        !file.includes('LP') && 
        !file.includes('RP') && 
        !file.includes('Facts') &&
        !file.includes('_PDP') &&
        !file.includes('_LP') &&
        !file.includes('_RP') &&
        !file.includes('_Facts')
      );
      
      if (unusualFiles.length > 0) {
        issues.push(`Unusual files: ${unusualFiles.join(', ')}`);
      }
      
      if (issues.length > 0) {
        console.log(`   ⚠️  Issues: ${issues.join(', ')}`);
        potentialIssues.push({
          product: productName,
          issues: issues,
          analysis: imageAnalysis
        });
      } else {
        console.log('   ✅ Looks good');
      }
      
      console.log('');
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Products without issues: ${productDirs.length - potentialIssues.length}`);
    console.log(`⚠️  Products with potential issues: ${potentialIssues.length}`);
    
    if (potentialIssues.length > 0) {
      console.log(`\n🚨 Products that may need fixing:`);
      potentialIssues.forEach(item => {
        console.log(`   - ${item.product}: ${item.issues.join(', ')}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error analyzing products:', error.message);
  }
}

analyzeAllProducts();