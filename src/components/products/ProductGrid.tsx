import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import type { Product, Category } from "@/types/database";

interface ProductGridProps {
  products?: (Product & { category: Category | null })[];
  loading?: boolean;
  emptyMessage?: string;
  priorityCount?: number; // Number of products to load with priority (above-the-fold)
}

export function ProductGrid({
  products,
  loading,
  emptyMessage = "Nenhum produto encontrado",
  priorityCount = 4, // First 4 products get priority loading
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-6xl mb-4">🔍</span>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} priority={index < priorityCount} />
        </div>
      ))}
    </div>
  );
}
