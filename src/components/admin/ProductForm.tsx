import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { VideoUpload } from "@/components/admin/VideoUpload";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: {
    id: string;
    title: string;
    description?: string | null;
    original_price: number;
    discount_price: number;
    affiliate_link?: string;
    images?: string[] | null;
    video_url?: string | null;
    category_id?: string | null;
    tags?: string[] | null;
    status?: string | null;
  } | null;
  onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    original_price: "",
    discount_price: "",
    affiliate_link: "",
    video_url: "",
    category_id: "",
    tags: "",
    status: "active",
    images: [] as string[],
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      return data || [];
    }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        original_price: product.original_price?.toString() || "",
        discount_price: product.discount_price?.toString() || "",
        affiliate_link: product.affiliate_link || "",
        video_url: product.video_url || "",
        category_id: product.category_id || "",
        tags: product.tags?.join(", ") || "",
        status: product.status || "active",
        images: product.images || [],
      });
    }
  }, [product]);

  const calculateDiscountPercentage = () => {
    const original = parseFloat(formData.original_price);
    const discount = parseFloat(formData.discount_price);
    if (original && discount && original > discount) {
      return Math.round(((original - discount) / original) * 100);
    }
    return 0;
  };

  const sendToN8n = async (productData: Record<string, unknown>) => {
    try {
      await fetch("https://n8nalex-n8n.zn6b4j.easypanel.host/webhook/521cd494-e386-4ee9-bbb3-edd15f773ee4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      console.log("Produto enviado para n8n com sucesso");
    } catch (error) {
      console.error("Erro ao enviar para n8n:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const productData = {
        title: data.title,
        description: data.description || null,
        original_price: parseFloat(data.original_price),
        discount_price: parseFloat(data.discount_price),
        affiliate_link: data.affiliate_link,
        video_url: data.video_url || null,
        category_id: data.category_id || null,
        tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        status: data.status,
        images: data.images,
      };

      if (product?.id) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        if (error) throw error;
      } else {
        const { data: newProduct, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();
        if (error) throw error;
        
        // Envia dados do novo produto para n8n
        await sendToN8n({
          ...newProduct,
          discount_percentage: calculateDiscountPercentage(),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(product ? "Produto atualizado!" : "Produto criado!");
      onSuccess();
    },
    onError: (error) => {
      console.error("Error saving product:", error);
      toast.error("Erro ao salvar produto");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.original_price || !formData.discount_price || !formData.affiliate_link) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);
    await mutation.mutateAsync(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Nome do produto"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descrição do produto"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="original_price">Preço Original *</Label>
            <Input
              id="original_price"
              type="number"
              step="0.01"
              value={formData.original_price}
              onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="discount_price">Preço com Desconto *</Label>
            <Input
              id="discount_price"
              type="number"
              step="0.01"
              value={formData.discount_price}
              onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
              placeholder="0.00"
            />
          </div>
        </div>

        {formData.original_price && formData.discount_price && (
          <p className="text-sm text-primary font-medium">
            Desconto: {calculateDiscountPercentage()}%
          </p>
        )}

        <div>
          <Label htmlFor="affiliate_link">Link de Afiliado Shopee *</Label>
          <Input
            id="affiliate_link"
            value={formData.affiliate_link}
            onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
            placeholder="https://shope.ee/..."
          />
        </div>

        <div className="space-y-4">
          <Label>Vídeo do Produto</Label>
          
          <div className="space-y-2">
            <Label htmlFor="video_url" className="text-sm font-normal text-muted-foreground">
              URL do YouTube (opcional)
            </Label>
            <Input
              id="video_url"
              value={formData.video_url.includes('youtube.com') || formData.video_url.includes('youtu.be') ? formData.video_url : ''}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              disabled={formData.video_url && !formData.video_url.includes('youtube') && !formData.video_url.includes('youtu.be')}
            />
          </div>
          
          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-normal text-muted-foreground">
              Enviar vídeo do dispositivo
            </Label>
            <VideoUpload
              videoUrl={formData.video_url}
              onVideoChange={(url) => setFormData({ ...formData, video_url: url })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="featured">Destaque</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="oferta, promoção, black friday"
          />
        </div>

        <div>
          <Label>Imagens</Label>
          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => setFormData({ ...formData, images })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Salvar Alterações" : "Criar Produto"}
        </Button>
      </div>
    </form>
  );
}
