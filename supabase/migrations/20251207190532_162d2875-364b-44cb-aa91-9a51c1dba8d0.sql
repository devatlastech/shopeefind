-- Create table for tracking product shares
CREATE TABLE public.product_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  shared_at TIMESTAMPTZ DEFAULT now(),
  device_type TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.product_shares ENABLE ROW LEVEL SECURITY;

-- Anyone can register shares
CREATE POLICY "Anyone can register shares" 
ON public.product_shares 
FOR INSERT 
WITH CHECK (true);

-- Admins can view shares
CREATE POLICY "Admins can view shares" 
ON public.product_shares 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better performance
CREATE INDEX idx_product_shares_product_id ON public.product_shares(product_id);
CREATE INDEX idx_product_shares_platform ON public.product_shares(platform);