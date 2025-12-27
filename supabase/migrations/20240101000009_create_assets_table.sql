-- Create assets table for product images and YouTube embeds
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'youtube')),
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_assets_product_id ON assets(product_id);
CREATE INDEX idx_assets_display_order ON assets(product_id, display_order);

-- Enable Row Level Security
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public can view assets
CREATE POLICY "Public can view assets" ON assets
  FOR SELECT USING (true);

