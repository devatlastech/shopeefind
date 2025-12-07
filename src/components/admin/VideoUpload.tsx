import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Video, X, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadProps {
  videoUrl: string;
  onVideoChange: (url: string) => void;
}

export function VideoUpload({ videoUrl, onVideoChange }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error("Por favor, selecione um arquivo de vídeo válido");
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 52428800) {
      toast.error("O vídeo deve ter no máximo 50MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-videos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-videos')
        .getPublicUrl(filePath);

      onVideoChange(publicUrl);
      toast.success("Vídeo enviado com sucesso!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erro ao enviar vídeo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeVideo = () => {
    onVideoChange("");
  };

  const isUploadedVideo = videoUrl && !videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be');

  return (
    <div className="space-y-3">
      {isUploadedVideo && (
        <div className="relative group">
          <video
            src={videoUrl}
            controls
            className="w-full h-40 object-cover rounded-lg border bg-muted"
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
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
              Enviando vídeo...
            </>
          ) : (
            <>
              <Video className="mr-2 h-4 w-4" />
              {isUploadedVideo ? "Trocar Vídeo" : "Anexar Vídeo"}
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-1 text-center">
          Máximo 50MB • MP4, WebM, MOV
        </p>
      </div>
    </div>
  );
}
