import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategories } from "@/hooks/useCategories";

export interface FilterValues {
  categoryId?: string;
  minDiscount?: number;
  maxPrice?: number;
}

interface ProductFiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const { data: categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      categoryId: checked ? categoryId : undefined,
    });
  };

  const handleDiscountChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minDiscount: value[0] > 0 ? value[0] : undefined,
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      maxPrice: value[0] < 1000 ? value[0] : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.categoryId || filters.minDiscount || filters.maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Categorias
          <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categoryId === category.id}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Discount Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Desconto Mínimo
          <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <Slider
            value={[filters.minDiscount || 0]}
            min={0}
            max={80}
            step={10}
            onValueChange={handleDiscountChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span className="font-medium text-foreground">
              {filters.minDiscount || 0}%+
            </span>
            <span>80%</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Preço Máximo
          <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <Slider
            value={[filters.maxPrice || 1000]}
            min={10}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>R$ 10</span>
            <span className="font-medium text-foreground">
              R$ {filters.maxPrice || 1000}
            </span>
            <span>R$ 1000+</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-xl border bg-card p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </h3>
          <FilterContent />
        </div>
      </div>
    </>
  );
}
