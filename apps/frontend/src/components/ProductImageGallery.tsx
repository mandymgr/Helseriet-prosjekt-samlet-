import React, { useState } from 'react';

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  images, 
  productName 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle keyboard navigation
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else if (event.key === 'ArrowRight' && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else if (event.key === 'Escape') {
      setIsZoomed(false);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    // Fallback for products without images
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-sage/10 p-8 mb-6 backdrop-blur-sm">
        <div className="aspect-square bg-gradient-to-br from-sage/5 to-sage_light/10 rounded-2xl flex items-center justify-center">
          <div className="text-sage text-8xl">📦</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="bg-white rounded-3xl shadow-lg border border-sage/10 p-8 mb-6 backdrop-blur-sm relative">
        <div className="aspect-square bg-gradient-to-br from-sage/5 to-sage_light/10 rounded-2xl p-6 flex items-center justify-center relative">
          <img 
            src={images[selectedImage]?.url} 
            alt={images[selectedImage]?.altText || `${productName} - Bilde ${selectedImage + 1}`}
            className="w-full h-full object-cover rounded-2xl cursor-zoom-in transition-transform duration-300 hover:scale-105"
            onClick={() => setIsZoomed(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<div class="text-sage text-8xl">📦</div>';
            }}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          />
          
          {/* Navigation arrows for main image */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Forrige bilde"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Neste bilde"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className={`grid gap-3 ${
          images.length <= 2 ? 'grid-cols-2' :
          images.length <= 3 ? 'grid-cols-3' :
          'grid-cols-4'
        }`}>
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(index)}
              className={`bg-white rounded-2xl shadow-md border p-3 hover:shadow-lg transition-all duration-250 micro-interaction ${
                selectedImage === index 
                  ? 'border-sage ring-2 ring-sage/20 scale-105' 
                  : 'border-sage/10 hover:border-sage/30'
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-sage/5 to-sage_light/10 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.altText || `${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="text-sage text-xl">📦</div>';
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setIsZoomed(false)}
          onKeyDown={handleKeyPress}
          tabIndex={-1}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={images[selectedImage]?.url} 
              alt={images[selectedImage]?.altText || `${productName} - Bilde ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-charcoal p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Lukk zoom"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Navigation in zoom mode */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Forrige bilde"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-3 rounded-full shadow-lg transition-all duration-200"
                  aria-label="Neste bilde"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}

            {/* Image counter in zoom mode */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;