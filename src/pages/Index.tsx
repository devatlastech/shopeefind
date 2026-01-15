import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters, FilterValues } from "@/components/filters/ProductFilters";
import { useFeaturedProducts, useBestDiscounts, useProducts } from "@/hooks/useProducts";
import { TrendingDown, Star } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { generateWebSiteSchema, generateOrganizationSchema } from "@/lib/structuredData";

export default function Index() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [searchQuery, setSearchQuery] = useState("");

  const { data: featuredProducts, isLoading: loadingFeatured } = useFeaturedProducts(8);
  const { data: bestDiscounts, isLoading: loadingDiscounts } = useBestDiscounts(8);
  const { data: allProducts, isLoading: loadingAll } = useProducts({
    ...filters,
    search: searchQuery || undefined,
    limit: 12,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
    ],
  };

  return (
    <>
      <SEOHead
        title="ShopFind - As Melhores Ofertas e Descontos da Shopee"
        description="Encontre as melhores ofertas e descontos da Shopee em um só lugar. Produtos com até 70% de desconto, atualizados diariamente. Eletrônicos, moda, casa e muito mais!"
        canonicalUrl="/"
        keywords={["achados shopee", "ofertas do dia", "promoção shopee", "melhores preços"]}
        structuredData={combinedStructuredData}
      />

      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />

        <main className="flex-1">
          {/* Hero */}
          <HeroSection />

          {/* Categories */}
          <CategorySection />

          {/* Featured Products */}
          {!searchQuery && !filters.categoryId && (
            <section className="py-12">
              <div className="container">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                      <Star className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Produtos em Destaque</h2>
                  </div>
                </div>
                <ProductGrid products={featuredProducts} loading={loadingFeatured} />
              </div>
            </section>
          )}

          {/* Best Discounts */}
          {!searchQuery && !filters.categoryId && (
            <section className="py-12 bg-secondary/30">
              <div className="container">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Maiores Descontos</h2>
                  </div>
                </div>
                <ProductGrid products={bestDiscounts} loading={loadingDiscounts} />
              </div>
            </section>
          )}

          {/* All Products with Filters */}
          <section id="produtos" className="py-12">
            <div className="container">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : "Todos os Produtos"}
                </h2>
                <ProductFilters filters={filters} onFiltersChange={setFilters} />
              </div>

              <div className="flex gap-8">
                {/* Desktop Filters Sidebar */}
                <div className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-24">
                    <ProductFilters filters={filters} onFiltersChange={setFilters} />
                  </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                  <ProductGrid
                    products={allProducts}
                    loading={loadingAll}
                    emptyMessage={
                      searchQuery
                        ? "Nenhum produto encontrado para sua busca"
                        : "Nenhum produto disponível com os filtros selecionados"
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <NewsletterSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
