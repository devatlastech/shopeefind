import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Watch,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Watch,
  BookOpen,
};

export function CategorySection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                <div className="h-14 w-14 rounded-full bg-muted" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-b">
      <div className="container">
        <h2 className="text-xl font-semibold text-center mb-8">
          Navegue por Categorias
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories?.map((category, index) => {
            const Icon = iconMap[category.icon || ""] || Sparkles;
            return (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary transition-colors group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-center line-clamp-1">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
