-- Add more products to the travel backpack ranking
-- This migration adds 7 more products (total 10) and additional specifications

-- Insert additional products
INSERT INTO products (id, name, description, image_url, link) VALUES
  ('660e8400-e29b-41d4-a716-446655440004', 'Tortuga Setout 35L', 
   'A minimalist travel backpack designed for urban travelers and digital nomads.',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
   'https://www.tortugabackpacks.com/products/setout-backpack'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Aer Travel Pack 3', 
   'A premium travel backpack with exceptional organization and sleek urban design.',
   'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop',
   'https://www.aersf.com/travel-pack-3'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Nomatic Travel Pack 40L', 
   'A versatile travel backpack with innovative features and expandable capacity.',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
   'https://www.nomatic.com/products/travel-pack-40l'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Patagonia Black Hole Pack 32L', 
   'A durable, weather-resistant backpack made from recycled materials.',
   'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop',
   'https://www.patagonia.com/product/black-hole-pack-32l'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Cotopaxi Allpa 35L', 
   'A colorful, sustainable travel backpack with excellent organization.',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
   'https://www.cotopaxi.com/products/allpa-35l-travel-pack'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Tom Bihn Synik 30L', 
   'A thoughtfully designed travel backpack with exceptional build quality.',
   'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop',
   'https://www.tombihn.com/products/synik-30'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Eagle Creek Wayfinder 40L', 
   'A reliable travel backpack with good organization and value pricing.',
   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
   'https://www.eaglecreek.com/products/wayfinder-40l')
ON CONFLICT (id) DO NOTHING;

-- Insert ranking_products for the new products
INSERT INTO ranking_products (id, ranking_id, product_id, score, rank_position) VALUES
  ('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440004', 85.5, 4),
  ('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440005', 87.0, 5),
  ('770e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440006', 84.0, 6),
  ('770e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440007', 81.5, 7),
  ('770e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440008', 83.5, 8),
  ('770e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440009', 86.0, 9),
  ('770e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440010', 79.5, 10)
ON CONFLICT (id) DO NOTHING;

-- Add more specifications to existing products (to demonstrate more columns)
-- Osprey Farpoint 40 - Additional specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Material', 'Nylon 210D', NULL),
  ('660e8400-e29b-41d4-a716-446655440001', 'Laptop Compartment', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440001', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440001', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440001', 'Price', '160', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Color Options', '4', NULL),
  ('660e8400-e29b-41d4-a716-446655440001', 'Pockets', '8', NULL);

-- Peak Design Travel Backpack 45L - Additional specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440002', 'Material', '400D Nylon', NULL),
  ('660e8400-e29b-41d4-a716-446655440002', 'Laptop Compartment', 'Yes (up to 16")', NULL),
  ('660e8400-e29b-41d4-a716-446655440002', 'Water Resistance', 'Weatherproof', NULL),
  ('660e8400-e29b-41d4-a716-446655440002', 'Warranty', '5 years', NULL),
  ('660e8400-e29b-41d4-a716-446655440002', 'Price', '300', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Color Options', '2', NULL),
  ('660e8400-e29b-41d4-a716-446655440002', 'Pockets', '12', NULL);

-- REI Co-op Ruckpack 40 - Additional specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440003', 'Material', 'Nylon 210D', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', 'Laptop Compartment', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', 'Warranty', '1 year', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', 'Price', '100', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Color Options', '3', NULL),
  ('660e8400-e29b-41d4-a716-446655440003', 'Pockets', '6', NULL);

-- Tortuga Setout 35L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440004', 'Volume', '35', 'L'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Weight', '1.5', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Dimensions', '53 x 33 x 20', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Material', 'Nylon 400D', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Laptop Compartment', 'Yes (up to 15")', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Price', '199', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Color Options', '2', NULL),
  ('660e8400-e29b-41d4-a716-446655440004', 'Pockets', '7', NULL);

-- Aer Travel Pack 3 - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440005', 'Volume', '35', 'L'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Weight', '1.6', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Dimensions', '55 x 33 x 20', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Material', '1680D Ballistic Nylon', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Laptop Compartment', 'Yes (up to 16")', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Water Resistance', 'Weatherproof', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Price', '280', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Color Options', '3', NULL),
  ('660e8400-e29b-41d4-a716-446655440005', 'Pockets', '10', NULL);

-- Nomatic Travel Pack 40L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440006', 'Volume', '40', 'L'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Weight', '1.7', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Dimensions', '56 x 35 x 22', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Carry-on Compliant', 'Yes (expandable)', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Material', 'Nylon 400D', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Laptop Compartment', 'Yes (up to 16")', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Price', '250', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Color Options', '2', NULL),
  ('660e8400-e29b-41d4-a716-446655440006', 'Pockets', '9', NULL);

-- Patagonia Black Hole Pack 32L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440007', 'Volume', '32', 'L'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Weight', '1.2', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Dimensions', '50 x 32 x 18', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Material', 'Recycled Nylon', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Laptop Compartment', 'No', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Water Resistance', 'Weatherproof', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Price', '149', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Color Options', '5', NULL),
  ('660e8400-e29b-41d4-a716-446655440007', 'Pockets', '5', NULL);

-- Cotopaxi Allpa 35L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440008', 'Volume', '35', 'L'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Weight', '1.4', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Dimensions', '54 x 34 x 21', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Material', '1000D TPU-coated Nylon', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Laptop Compartment', 'Yes (up to 15")', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Water Resistance', 'Weatherproof', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Warranty', '61 years', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Price', '200', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Color Options', '8', NULL),
  ('660e8400-e29b-41d4-a716-446655440008', 'Pockets', '8', NULL);

-- Tom Bihn Synik 30L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440009', 'Volume', '30', 'L'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Weight', '1.3', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Dimensions', '48 x 33 x 20', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Material', '525D Ballistic Nylon', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Laptop Compartment', 'Yes (up to 15")', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Warranty', 'Lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Price', '330', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Color Options', '10+', NULL),
  ('660e8400-e29b-41d4-a716-446655440009', 'Pockets', '11', NULL);

-- Eagle Creek Wayfinder 40L - All specs
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440010', 'Volume', '40', 'L'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Weight', '1.5', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Dimensions', '54 x 35 x 23', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Carry-on Compliant', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Material', 'Nylon 210D', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Laptop Compartment', 'Yes', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Water Resistance', 'Water-resistant', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Warranty', 'Limited lifetime', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Price', '120', 'USD'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Color Options', '3', NULL),
  ('660e8400-e29b-41d4-a716-446655440010', 'Pockets', '7', NULL);






