import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShareButtons } from "@/components/products/ShareButtons";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || "");
  const { data: relatedProducts } = useProducts({
    categoryId: product?.category_id || undefined,
    limit: 4,
  });
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorite = product ? isFavorite(product.id) : false;

  const handleBuyClick = async () => {
    if (!product) return;

    await supabase.from("product_clicks").insert({
      product_id: product.id,
      referrer: document.referrer || null,
      device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
    });

    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16 text-center">
          <span className="text-6xl mb-4 block">😕</span>
          <h1 className="text-2xl font-bold mb-2">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredRelated = relatedProducts?.filter((p) => p.id !== product.id);

  return (
    <>
      <Helmet>
        <title>{product.title} - ShopeeFind</title>
        <meta
          name="description"
          content={`${product.title} com ${product.discount_percentage}% de desconto. De ${formatPrice(product.original_price)} por ${formatPrice(product.discount_price)}`}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-6 md:py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
              <span>/</span>
              {product.category && (
                <>
                  <Link
                    to={`/categoria/${product.category.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {product.category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground truncate max-w-[200px]">
                {product.title}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
                  {product.images?.[currentImageIndex] ? (
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-8xl">📦</span>
                    </div>
                  )}

                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  {/* Discount Badge */}
                  {product.discount_percentage > 0 && (
                    <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground text-base px-3 py-1">
                      -{Math.round(product.discount_percentage)}%
                    </Badge>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all",
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.title} - Imagem ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category */}
                {product.category && (
                  <Link
                    to={`/categoria/${product.category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product.category.name}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

                {/* Price */}
                <div className="space-y-1">
                  {product.discount_percentage > 0 && (
                    <p className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.original_price)}
                    </p>
                  )}
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {formatPrice(product.discount_price)}
                  </p>
                  {product.discount_percentage > 0 && (
                    <p className="text-sm text-success font-medium">
                      Você economiza{" "}
                      {formatPrice(product.original_price - product.discount_price)}
                    </p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="flex-1 gap-2 text-base"
                      onClick={handleBuyClick}
                    >
                      <ExternalLink className="h-5 w-5" />
                      Comprar na Shopee
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn("gap-2", favorite && "text-primary border-primary")}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
                      {favorite ? "Favoritado" : "Favoritar"}
                    </Button>
                  </div>
                  
                  {/* Share Buttons */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Compartilhar</p>
                    <ShareButtons
                      productId={product.id}
                      productTitle={product.title}
                      discountPercentage={product.discount_percentage}
                      inline
                    />
                  </div>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            {filteredRelated && filteredRelated.length > 0 && (
              <section className="mt-16">
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  Produtos Relacionados
                </h2>
                <ProductGrid products={filteredRelated} />
              </section>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
