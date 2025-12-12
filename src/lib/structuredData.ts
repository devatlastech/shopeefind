import type { Product, Category } from "@/types/database";

const SITE_NAME = "ShopeeFind";
const SITE_URL = "https://shopeefind.com.br";
const LOGO_URL = "https://shopeefind.com.br/logo.png";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: "ShopeeFind - Encontre as melhores ofertas e descontos da Shopee em um só lugar.",
    sameAs: [
      "https://whatsapp.com/channel/0029Vb78IgsDDmFcchlIOP0K",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductSchema(product: Product & { category: Category | null }) {
  const formatPrice = (price: number) => price.toFixed(2);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} com desconto especial na Shopee`,
    image: product.images?.[0] || undefined,
    brand: {
      "@type": "Brand",
      name: "Shopee",
    },
    category: product.category?.name || "Produtos",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produto/${product.id}`,
      priceCurrency: "BRL",
      price: formatPrice(product.discount_price),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Shopee",
      },
    },
    ...(product.discount_percentage > 0 && {
      priceSpecification: {
        "@type": "PriceSpecification",
        price: formatPrice(product.discount_price),
        priceCurrency: "BRL",
        valueAddedTaxIncluded: true,
      },
    }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateCategorySchema(category: Category, productCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: `Encontre os melhores produtos de ${category.name} com descontos incríveis na Shopee.`,
    url: `${SITE_URL}/categoria/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: productCount,
      itemListElement: {
        "@type": "Thing",
        name: category.name,
      },
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
