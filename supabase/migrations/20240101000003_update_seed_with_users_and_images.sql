-- Add users
INSERT INTO users (id, name, profile_picture_url) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Sarah Chen', 'https://i.pravatar.cc/150?img=1'),
  ('990e8400-e29b-41d4-a716-446655440002', 'Marcus Johnson', 'https://i.pravatar.cc/150?img=12'),
  ('990e8400-e29b-41d4-a716-446655440003', 'Emily Rodriguez', 'https://i.pravatar.cc/150?img=47'),
  ('990e8400-e29b-41d4-a716-446655440004', 'David Kim', 'https://i.pravatar.cc/150?img=33');

-- Update products with image_url and link
UPDATE products SET
  image_url = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
  link = 'https://www.osprey.com/us/en/product/farpoint-40-FARPNT40.html'
WHERE id = '660e8400-e29b-41d4-a716-446655440001';

UPDATE products SET
  image_url = 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop',
  link = 'https://www.peakdesign.com/products/travel-backpack'
WHERE id = '660e8400-e29b-41d4-a716-446655440002';

UPDATE products SET
  image_url = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
  link = 'https://www.rei.com/product/123456/rei-co-op-ruckpack-40-travel-pack'
WHERE id = '660e8400-e29b-41d4-a716-446655440003';

-- Update sentiments with user_id
-- Osprey Farpoint 40 - Pros
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Excellent comfort with well-padded straps and back panel';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Perfect size for carry-on compliance';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440002'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Great organization with multiple compartments';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440002'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Durable construction with lifetime warranty';

-- Osprey Farpoint 40 - Cons
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440003'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'con' 
  AND content = 'Slightly heavier than some competitors';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440003'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'con' 
  AND content = 'Aesthetic design is functional but not particularly stylish';

-- Peak Design Travel Backpack 45L - Pros
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Outstanding organization with innovative packing system';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440004'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Sleek, modern design';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440004'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'High-quality materials and construction';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Expandable capacity for flexibility';

-- Peak Design Travel Backpack 45L - Cons
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440002'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Premium price point';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440003'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Comfort could be better for extended wear';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440003'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Heavier than other options';

-- REI Co-op Ruckpack 40 - Pros
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440004'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Excellent value for money';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Lightweight design';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440002'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Solid build quality for the price';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440002'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Good basic organization features';

-- REI Co-op Ruckpack 40 - Cons
UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440003'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Padding is less substantial than premium options';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440004'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Fewer advanced features compared to competitors';

UPDATE sentiments SET user_id = '990e8400-e29b-41d4-a716-446655440001'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Organization system is basic';












