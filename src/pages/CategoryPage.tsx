import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters, FilterValues } from "@/components/filters/ProductFilters";
import { useCategory } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { SEOHead } from "@/components/seo/SEOHead";
import { generateCategorySchema, generateBreadcrumbSchema } from "@/lib/structuredData";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, isLoading: loadingCategory } = useCategory(slug || "");
  const [filters, setFilters] = useState<FilterValues>({});

  const { data: products, isLoading: loadingProducts } = useProducts({
    categoryId: category?.id,
    minDiscount: filters.minDiscount,
    maxPrice: filters.maxPrice,
  });

  if (loadingCategory) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container py-16 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-2xl font-bold mb-2">Categoria não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            A categoria que você está procurando não existe.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Voltar ao Início
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Início", url: "/" },
    { name: category.name, url: `/categoria/${category.slug}` },
  ];

  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateCategorySchema(category, products?.length || 0),
      generateBreadcrumbSchema(breadcrumbItems),
    ],
  };

  return (
    <>
      <SEOHead
        title={`${category.name} - Ofertas e Descontos`}
        description={`Encontre os melhores produtos de ${category.name} com descontos de até 70%. ${products?.length || 0} ofertas atualizadas diariamente na Shopee.`}
        canonicalUrl={`/categoria/${category.slug}`}
        keywords={[category.name.toLowerCase(), `${category.name.toLowerCase()} shopee`, `desconto ${category.name.toLowerCase()}`]}
        structuredData={combinedStructuredData}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-foreground">{category.name}</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-muted-foreground">
                {products?.length || 0} produtos encontrados
              </p>
            </div>

            {/* Filters + Products */}
            <div className="flex gap-8">
              {/* Desktop Filters */}
              <div className="hidden lg:block w-64 shrink-0">
                <ProductFilters
                  filters={{ ...filters, categoryId: category.id }}
                  onFiltersChange={(newFilters) =>
                    setFilters({
                      minDiscount: newFilters.minDiscount,
                      maxPrice: newFilters.maxPrice,
                    })
                  }
                />
              </div>

              {/* Products */}
              <div className="flex-1">
                <div className="mb-4 lg:hidden">
                  <ProductFilters
                    filters={{ ...filters, categoryId: category.id }}
                    onFiltersChange={(newFilters) =>
                      setFilters({
                        minDiscount: newFilters.minDiscount,
                        maxPrice: newFilters.maxPrice,
                      })
                    }
                  />
                </div>
                <ProductGrid
                  products={products}
                  loading={loadingProducts}
                  emptyMessage="Nenhum produto encontrado nesta categoria"
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
