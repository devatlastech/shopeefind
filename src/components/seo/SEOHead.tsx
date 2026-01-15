import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string[];
  noIndex?: boolean;
  structuredData?: object;
}

const SITE_NAME = "ShopFind";
const DEFAULT_OG_IMAGE = "https://shopfind.com.br/og-image.png";
const SITE_URL = "https://shopfind.com.br";

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords = [],
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;
  const fullCanonicalUrl = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;

  const defaultKeywords = [
    "shopee",
    "descontos",
    "ofertas",
    "promoções",
    "cupom",
    "desconto shopee",
    "melhores ofertas",
    "compras online",
    "produtos baratos",
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={truncatedDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}