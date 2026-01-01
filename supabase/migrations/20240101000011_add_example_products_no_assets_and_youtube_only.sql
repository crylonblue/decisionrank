-- Add example products for testing edge cases:
-- 1. Product with no assets (will use placeholder.svg fallback)
-- 2. Product with only YouTube video asset

-- Insert products
INSERT INTO products (id, name, image_url, link) VALUES
  ('660e8400-e29b-41d4-a716-446655440011', 'Minimalist Travel Pack', 
   NULL,
   'https://example.com/minimalist-pack'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Video Showcase Backpack', 
   NULL,
   'https://example.com/video-showcase-pack')
ON CONFLICT (id) DO NOTHING;

-- Insert ranking_products
INSERT INTO ranking_products (id, ranking_id, product_id, score, rank_position) VALUES
  ('770e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440011', 75.0, 11),
  ('770e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440012', 78.5, 12)
ON CONFLICT (id) DO NOTHING;

-- Product with NO assets (will use placeholder.svg from image_url as fallback)
-- No INSERT INTO assets for product 660e8400-e29b-41d4-a716-446655440011

-- Product with ONLY YouTube video asset
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440012', 'youtube', 'dQw4w9WgXcQ', 0)
ON CONFLICT DO NOTHING;

-- Add some basic specifications for these products
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440011', 'Volume', '35', 'L'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Weight', '1.2', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Dimensions', '52 x 32 x 20', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440012', 'Volume', '38', 'L'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Weight', '1.4', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Dimensions', '54 x 34 x 21', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Carry-on Compliant', 'Yes', NULL)
ON CONFLICT DO NOTHING;

-- Add some sentiments with user assignments
INSERT INTO sentiments (ranking_product_id, type, content, headline, user_id) VALUES
  ('770e8400-e29b-41d4-a716-446655440011', 'pro', 'Lightweight and minimalist design', 'Ultra Lightweight', '990e8400-e29b-41d4-a716-446655440001'), -- CoffeeOverflow
  ('770e8400-e29b-41d4-a716-446655440011', 'con', 'Limited organization features', 'Basic Organization', '990e8400-e29b-41d4-a716-446655440002'), -- LaggingIRL
  ('770e8400-e29b-41d4-a716-446655440012', 'pro', 'Excellent video demonstrations available', 'Great Video Content', '990e8400-e29b-41d4-a716-446655440003'), -- NotAIButClose
  ('770e8400-e29b-41d4-a716-446655440012', 'con', 'No static images available', 'No Image Gallery', '990e8400-e29b-41d4-a716-446655440004') -- ProbablyAFK
ON CONFLICT DO NOTHING;
