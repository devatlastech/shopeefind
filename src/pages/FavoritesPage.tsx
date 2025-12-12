import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import type { Product, Category } from "@/types/database";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const { data: products, isLoading } = useQuery({
    queryKey: ["favorites", favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];

      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .in("id", favorites);

      if (error) throw error;
      return data as (Product & { category: Category | null })[];
    },
    enabled: favorites.length > 0,
  });

  return (
    <>
      <SEOHead
        title="Meus Favoritos"
        description="Veja seus produtos favoritos salvos no ShopeeFind. Acesse rapidamente suas ofertas preferidas."
        canonicalUrl="/favoritos"
        noIndex={true}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Meus Favoritos</h1>
                  <p className="text-sm text-muted-foreground">
                    {favorites.length} {favorites.length === 1 ? "produto" : "produtos"} salvos
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                  <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Nenhum favorito ainda
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Clique no coração dos produtos que você gosta para salvá-los aqui
                  e acessá-los facilmente depois.
                </p>
                <Button asChild>
                  <Link to="/">Explorar Produtos</Link>
                </Button>
              </div>
            ) : (
              <ProductGrid products={products} loading={isLoading} />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
