import React from 'react';
import { HiOutlinePhoto, HiOutlineCloudArrowUp, HiCircleStack, HiOutlineCheckCircle } from 'react-icons/hi2';

interface CloudinaryManagementProps {
  isDarkTheme: boolean;
  selectedLanguage: string;
}

const CloudinaryManagement: React.FC<CloudinaryManagementProps> = () => {
  return (
    <section id="cloudinary-management" className="py-16 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <HiOutlinePhoto className="w-8 h-8 text-sage" />
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-2">
              Cloudinary Image Management
            </h2>
            <p className="text-gray-600">
              Systematic approach to fixing product image display issues
            </p>
          </div>
        </div>

        {/* Problem & Solution Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
              <HiOutlineCloudArrowUp className="w-5 h-5" />
              Common Problem
            </h3>
            <p className="text-red-700 mb-4">
              Products showing wrong FRONT images due to incorrect Cloudinary upload order or database URL mismatches.
            </p>
            <ul className="text-sm text-red-600 space-y-2">
              <li>• FRONT images showing ingredients panels</li>
              <li>• Database URLs pointing to old/cached versions</li>
              <li>• Image upload order not matching intended structure</li>
              <li>• Timestamp mismatches between uploads and database</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <HiOutlineCheckCircle className="w-5 h-5" />
              Proven Solution
            </h3>
            <p className="text-green-700 mb-4">
              Two-step approach: Upload correct images, then update database URLs to match.
            </p>
            <ul className="text-sm text-green-600 space-y-2">
              <li>• ✅ Focus on FRONT images first (most visible issue)</li>
              <li>• ✅ Use hardcoded folder mappings for accuracy</li>
              <li>• ✅ Update database URLs after upload</li>
              <li>• ✅ Remove timestamps for auto-latest serving</li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="bg-warm_white rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-charcoal mb-6 flex items-center gap-2">
            <HiCircleStack className="w-6 h-6 text-sage" />
            Proven Fix Process
          </h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-sage pl-6">
              <h4 className="text-xl font-semibold text-charcoal mb-3">
                Step 1: Upload Correct FRONT Images
              </h4>
              <p className="text-gray-700 mb-4">
                Create a targeted script that uploads only PDP files as <code className="bg-gray-200 px-2 py-1 rounded">image_1</code> 
                to existing Cloudinary folders.
              </p>
              <div className="bg-gray-100 rounded p-4 mb-4">
                <h5 className="font-semibold mb-2">Script: fix-front-images-only.js</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hardcode exact folder mappings (no guessing)</li>
                  <li>• Find PDP files using pattern matching</li>
                  <li>• Upload as <code>image_1</code> with overwrite: true</li>
                  <li>• Apply consistent transformations</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-terracotta pl-6">
              <h4 className="text-xl font-semibold text-charcoal mb-3">
                Step 2: Update Database URLs
              </h4>
              <p className="text-gray-700 mb-4">
                Update database to point to new images by removing timestamps, 
                allowing Cloudinary to serve latest versions automatically.
              </p>
              <div className="bg-gray-100 rounded p-4 mb-4">
                <h5 className="font-semibold mb-2">Script: update-database-urls.js</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Remove version timestamps from URLs</li>
                  <li>• Update only FRONT image records (sortOrder: 0)</li>
                  <li>• Preserve folder structure exactly</li>
                  <li>• Let Cloudinary handle auto-versioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Learnings */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            🎯 Key Learnings & Best Practices
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">What Works:</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Simple, focused scripts (one task = one script)</li>
                <li>• Hardcoded mappings over dynamic generation</li>
                <li>• Two-phase approach: upload, then update DB</li>
                <li>• Remove timestamps for future-proof URLs</li>
                <li>• Test with single product first</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">What Doesn't:</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Complex scripts trying to do everything</li>
                <li>• Guessing folder names with slug functions</li>
                <li>• Assuming database updates automatically</li>
                <li>• Relying on browser cache clearing</li>
                <li>• Uploading all images when only FRONT matters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Structure */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-charcoal mb-4">
            📁 Image Structure Reference
          </h3>
          
          <div className="bg-white rounded border p-4 font-mono text-sm">
            <div className="text-gray-600 mb-2">SYNERGY Product Images:</div>
            <div className="space-y-1 ml-4">
              <div><span className="text-green-600">image_1.webp</span> = FRONT (PDP files) - Product front panel</div>
              <div><span className="text-blue-600">image_2.webp</span> = SIDE (LP files) - Left panel/side view</div>
              <div><span className="text-orange-600">image_3.webp</span> = BACK (RP files) - Right panel/back view</div>
              <div><span className="text-purple-600">image_4.webp</span> = INGREDIENTS (Facts files) - Facts panel</div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">41/41</div>
            <div className="text-green-800 font-medium">Products Fixed</div>
            <div className="text-sm text-green-600 mt-1">100% Success Rate</div>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">2-3 min</div>
            <div className="text-blue-800 font-medium">Script Duration</div>
            <div className="text-sm text-blue-600 mt-1">Fast & Efficient</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">2 scripts</div>
            <div className="text-purple-800 font-medium">Simple Solution</div>
            <div className="text-sm text-purple-600 mt-1">Focused Approach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudinaryManagement;