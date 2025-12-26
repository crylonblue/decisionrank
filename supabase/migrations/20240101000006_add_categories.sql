-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add category_id column to rankings table
ALTER TABLE rankings
  ADD COLUMN category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX idx_rankings_category_id ON rankings(category_id);
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable Row Level Security for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public SELECT only
CREATE POLICY "Public can view categories" ON categories
  FOR SELECT USING (true);

