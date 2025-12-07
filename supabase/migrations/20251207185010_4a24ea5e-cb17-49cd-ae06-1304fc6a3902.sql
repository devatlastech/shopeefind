-- Create storage bucket for product videos
INSERT INTO storage.buckets (id, name, public, file_size_limit) 
VALUES ('product-videos', 'product-videos', true, 52428800)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to videos
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their videos
CREATE POLICY "Authenticated users can delete videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-videos' AND auth.role() = 'authenticated');