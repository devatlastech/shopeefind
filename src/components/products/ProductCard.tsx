import { Heart, ExternalLink, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category } from "@/types/database";
import { cn } from "@/lib/utils";
import { ShareButtons } from "./ShareButtons";

interface ProductCardProps {
  product: Product & { category: Category | null };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleBuyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Register click
    await supabase.from("product_clicks").insert({
      product_id: product.id,
      referrer: document.referrer || null,
      device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
    });

    // Open affiliate link
    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Link
      to={`/produto/${product.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover-lift",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={`${product.title} - ${product.category?.name || 'Produto'} com ${Math.round(product.discount_percentage)}% de desconto`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width="300"
            height="300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl text-muted-foreground">📦</span>
          </div>
        )}

        {/* Discount Badge */}
        {product.discount_percentage > 0 && (
          <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
            -{Math.round(product.discount_percentage)}%
          </Badge>
        )}

        {/* Featured Badge */}
        {product.status === "featured" && (
          <Badge className="absolute right-2 top-2 bg-warning text-warning-foreground">
            Destaque
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute right-2 bottom-2 flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background"
                onClick={(e) => e.preventDefault()}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <ShareButtons
                productId={product.id}
                productTitle={product.title}
                discountPercentage={product.discount_percentage}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-all",
              favorite && "text-primary"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs font-medium text-muted-foreground mb-1">
            {product.category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Prices */}
        <div className="mt-auto space-y-1">
          {product.discount_percentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.discount_price)}
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <Button
          size="sm"
          className="mt-3 w-full gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 whitespace-normal text-center"
          onClick={handleBuyClick}
        >
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="leading-snug">Comprar na Shopee</span>
        </Button>
      </div>
    </Link>
  );
}
