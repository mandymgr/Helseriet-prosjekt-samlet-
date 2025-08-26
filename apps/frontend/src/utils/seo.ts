/**
 * SEO utilities for dynamic meta tag management
 */

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

/**
 * Updates document title and meta tags dynamically
 */
export function updateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}: SEOData) {
  // Update document title
  if (title) {
    document.title = title.includes('Helseriet') ? title : `${title} - Helseriet`;
  }

  // Helper function to update or create meta tag
  const updateMeta = (name: string, content: string, property?: boolean) => {
    const attribute = property ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Update basic meta tags
  if (description) {
    updateMeta('description', description);
  }
  
  if (keywords) {
    updateMeta('keywords', keywords);
  }

  // Update Open Graph tags
  if (title) {
    updateMeta('og:title', title, true);
  }
  
  if (description) {
    updateMeta('og:description', description, true);
  }
  
  if (image) {
    updateMeta('og:image', image, true);
  }
  
  if (url) {
    updateMeta('og:url', url, true);
  }
  
  updateMeta('og:type', type, true);

  // Update Twitter tags
  if (title) {
    updateMeta('twitter:title', title);
  }
  
  if (description) {
    updateMeta('twitter:description', description);
  }
  
  if (image) {
    updateMeta('twitter:image', image);
  }
  
  if (url) {
    updateMeta('twitter:url', url);
  }
}

/**
 * Generates structured data for products
 */
export function generateProductStructuredData(product: any) {
  const structuredData: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images?.[0]?.url || '',
    "brand": {
      "@type": "Brand",
      "name": "Helseriet"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://helseriet.no/produkt/${product.id}`,
      "priceCurrency": "NOK",
      "price": product.price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Helseriet"
      }
    }
  };

  // Add rating if available
  if (product.avgRating && product.reviewCount) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.avgRating,
      "reviewCount": product.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  return structuredData;
}

/**
 * Inserts structured data JSON-LD script
 */
export function insertStructuredData(data: any) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Create new structured data script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}

/**
 * Common SEO configurations for different page types
 */
export const seoConfigs = {
  home: {
    title: 'Helseriet - Premium Helse og Kosttilskudd',
    description: 'Oppdage premium kosttilskudd, yoga og wellness produkter fra Helseriet. Norsk nettbutikk med høykvalitets helseprodukter og ekspertråd.',
    keywords: 'kosttilskudd, helse, wellness, yoga, magnesium, omega-3, vitaminer, helseriet, norge'
  },
  products: {
    title: 'Alle Produkter - Helseriet',
    description: 'Utforsk vårt komplette utvalg av kosttilskudd, yoga og wellness produkter. Premium kvalitet og ekspertråd.',
    keywords: 'kosttilskudd, produkter, vitaminer, mineraler, omega-3, magnesium, helse'
  },
  kosttilskudd: {
    title: 'Kosttilskudd - Premium Vitaminer og Mineraler - Helseriet',
    description: 'Høykvalitets kosttilskudd fra SYNERGY og ORGANIXX. Vitaminer, mineraler og omega-3 for optimal helse.',
    keywords: 'kosttilskudd, vitaminer, mineraler, omega-3, magnesium, vitamin d, synergy, organixx'
  },
  yogaWellness: {
    title: 'Yoga & Wellness - SHAKTI Produkter - Helseriet',
    description: 'SHAKTI yoga og wellness produkter: akupressurmatter, puter og tilbehør for din velvære-rutine.',
    keywords: 'yoga, wellness, akupressur, matte, pute, shakti, avslapning, velvære'
  }
};

/**
 * Hook for using SEO in React components
 */
export function useSEO(config: SEOData) {
  const currentUrl = window.location.href;
  
  updateSEO({
    ...config,
    url: config.url || currentUrl
  });
}