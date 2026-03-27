
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schemaData?: any;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  canonical,
  schemaData
}: SEOProps) {
  const siteTitle = "VisaPlatform";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Expert-led visa guides, eligibility checks, and immigration support for 16+ countries. Trusted by 70,000+ applicants.";
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteTitle,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": defaultDescription,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-000-000-0000",
      "contactType": "customer service"
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      {keywords && <meta name='keywords' content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={currentUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* AI & Search Engine Specifics */}
      <meta name="author" content={siteTitle} />
      <meta name="application-name" content={siteTitle} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
}
