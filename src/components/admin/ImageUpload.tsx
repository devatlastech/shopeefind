import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  coverIndex?: number;
  onCoverChange?: (index: number) => void;
}

export function ImageUpload({ images, onImagesChange, coverIndex = 0, onCoverChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        newImages.push(publicUrl);
      }

      onImagesChange([...images, ...newImages]);
      toast.success(`${newImages.length} imagem(ns) enviada(s)!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
    
    // Adjust cover index if needed
    if (onCoverChange) {
      if (index === coverIndex) {
        onCoverChange(0);
      } else if (index < coverIndex) {
        onCoverChange(coverIndex - 1);
      }
    }
  };

  const setCoverImage = (index: number) => {
    if (onCoverChange) {
      onCoverChange(index);
      toast.success("Imagem de capa definida!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div 
            key={index} 
            className={cn(
              "relative group cursor-pointer",
              index === coverIndex && "ring-2 ring-primary ring-offset-2 rounded-lg"
            )}
            onClick={() => setCoverImage(index)}
          >
            <img
              src={url}
              alt={`Imagem ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border"
            />
            {index === coverIndex && (
              <div className="absolute top-1 left-1 p-1 bg-primary text-primary-foreground rounded-full">
                <Star className="h-3 w-3 fill-current" />
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(index);
              }}
              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
            {index !== coverIndex && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="text-xs text-white font-medium">Definir como capa</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Clique em uma imagem para definir como capa. A imagem com ⭐ é a capa atual.
        </p>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Adicionar Imagens
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
