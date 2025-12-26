-- Add categories and assign them to rankings
-- First, insert categories
INSERT INTO categories (id, name, slug, description) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Travel Gear', 'travel-gear', 'Reviews and comparisons of travel gear including backpacks, luggage, and accessories'),
  ('990e8400-e29b-41d4-a716-446655440002', 'Electronics', 'electronics', 'Product rankings for electronics including phones, laptops, and gadgets'),
  ('990e8400-e29b-41d4-a716-446655440003', 'Home & Kitchen', 'home-kitchen', 'Reviews of home and kitchen products including appliances and cookware')
ON CONFLICT (id) DO NOTHING;

-- Update the existing ranking to have a category
UPDATE rankings 
SET category_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE slug = 'best-travel-backpack';

