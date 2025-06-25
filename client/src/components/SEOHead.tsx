import React from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  schema?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = "construction, builders, real estate, apartments, villas, Madurai, Tamil Nadu, residential projects",
  ogImage = "/figmaAssets/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  schema
}) => {
  const fullTitle = `${title} | Smart Builders & Developers - Premier Construction Company in Madurai`;
  const baseUrl = "https://smartbuilders.replit.app";
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'Smart Builders & Developers');
    updateMeta('robots', 'index, follow');
    updateMeta('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', imageUrl, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:site_name', 'Smart Builders & Developers', true);
    updateMeta('og:locale', 'en_IN', true);
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', imageUrl);
    updateMeta('twitter:site', '@smartbuilders');
    
    // Additional SEO meta tags
    updateMeta('theme-color', '#b48b2f');
    updateMeta('msapplication-TileColor', '#b48b2f');
    updateMeta('apple-mobile-web-app-title', 'Smart Builders');
    updateMeta('application-name', 'Smart Builders');
    
    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
    
    // Structured data (JSON-LD)
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, schema]);

  return null; // This component doesn't render anything visible
};

// Schema.org structured data templates
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Smart Builders & Developers",
  "alternateName": "Smart Builders",
  "url": "https://smartbuilders.replit.app",
  "logo": "https://smartbuilders.replit.app/logo.png",
  "description": "Premier construction company in Madurai specializing in residential projects, apartments, villas, and land development with 22+ years of experience under M Rajan's leadership.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Construction Lane",
    "addressLocality": "Madurai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "625001",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "availableLanguage": ["English", "Tamil"]
  },
  "sameAs": [
    "https://facebook.com/smartbuilders",
    "https://twitter.com/smartbuilders",
    "https://instagram.com/smartbuilders",
    "https://linkedin.com/company/smartbuilders"
  ],
  "foundingDate": "2002",
  "numberOfEmployees": "50-100",
  "areaServed": {
    "@type": "Place",
    "name": "Tamil Nadu, India"
  }
});

export const getRealEstateSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Smart Builders & Developers",
  "description": "Leading real estate developer and construction company in Madurai",
  "url": "https://smartbuilders.replit.app",
  "priceRange": "₹18L - ₹2.5Cr",
  "areaServed": "Madurai, Tamil Nadu",
  "serviceType": ["Residential Construction", "Apartment Development", "Villa Construction", "Land Development"]
});