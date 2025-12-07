import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <Skeleton className="aspect-square w-full skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/3 skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
        <div className="pt-2 space-y-2">
          <Skeleton className="h-3 w-1/4 skeleton-shimmer" />
          <Skeleton className="h-6 w-1/2 skeleton-shimmer" />
        </div>
        <Skeleton className="h-9 w-full skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
