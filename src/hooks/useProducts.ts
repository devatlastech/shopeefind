import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category } from "@/types/database";

export function useProducts(options?: {
  categoryId?: string;
  status?: string;
  search?: string;
  minDiscount?: number;
  maxPrice?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*, category:categories(*)")
        .order("created_at", { ascending: false });

      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }

      if (options?.status) {
        query = query.eq("status", options.status);
      }

      if (options?.search) {
        query = query.ilike("title", `%${options.search}%`);
      }

      if (options?.minDiscount) {
        query = query.gte("discount_percentage", options.minDiscount);
      }

      if (options?.maxPrice) {
        query = query.lte("discount_price", options.maxPrice);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as (Product & { category: Category | null })[];
    },
  });
}

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .eq("status", "featured")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as (Product & { category: Category | null })[];
    },
  });
}

export function useBestDiscounts(limit = 8) {
  return useQuery({
    queryKey: ["products", "best-discounts", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .in("status", ["active", "featured"])
        .order("discount_percentage", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as (Product & { category: Category | null })[];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as (Product & { category: Category | null }) | null;
    },
    enabled: !!id,
  });
}
