-- Seed data for decisionrank
-- Example ranking: "What is the best travel backpack?"

-- Insert ranking
INSERT INTO rankings (id, slug, question, description, verdict_summary) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'best-travel-backpack', 
   'What is the best travel backpack?', 
   'A comprehensive comparison of the top travel backpacks for 2024, evaluating comfort, durability, organization, and value.',
   'After extensive testing, the Osprey Farpoint 40 emerges as the top choice for most travelers, offering the best balance of features, comfort, and value.');

-- Insert products
INSERT INTO products (id, name) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Osprey Farpoint 40'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Peak Design Travel Backpack 45L'),
  ('660e8400-e29b-41d4-a716-446655440003', 'REI Co-op Ruckpack 40');

-- Insert ranking_products (with scores and rank positions)
INSERT INTO ranking_products (id, ranking_id, product_id, score, rank_position) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440001', 92.5, 1),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440002', 88.0, 2),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 
   '660e8400-e29b-41d4-a716-446655440003', 82.5, 3);

-- Insert criteria
INSERT INTO criteria (id, ranking_id, name, weight) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Comfort', 1.0),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Durability', 1.0),
  ('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Organization', 0.8),
  ('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Value', 0.9);

-- Insert criterion_scores (example scores for each product on each criterion)
-- Osprey Farpoint 40
INSERT INTO criterion_scores (ranking_product_id, criterion_id, score) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 95.0), -- Comfort
  ('770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440002', 90.0), -- Durability
  ('770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440003', 92.0), -- Organization
  ('770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440004', 93.0); -- Value

-- Peak Design Travel Backpack 45L
INSERT INTO criterion_scores (ranking_product_id, criterion_id, score) VALUES
  ('770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 85.0), -- Comfort
  ('770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 92.0), -- Durability
  ('770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440003', 95.0), -- Organization
  ('770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440004', 80.0); -- Value

-- REI Co-op Ruckpack 40
INSERT INTO criterion_scores (ranking_product_id, criterion_id, score) VALUES
  ('770e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', 80.0), -- Comfort
  ('770e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002', 85.0), -- Durability
  ('770e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 82.0), -- Organization
  ('770e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440004', 83.0); -- Value

-- Insert specifications
-- Osprey Farpoint 40
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Volume', '40', 'L'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Weight', '1.4', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Dimensions', '55 x 35 x 23', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Carry-on Compliant', 'Yes', NULL);

-- Peak Design Travel Backpack 45L
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440002', 'Volume', '45', 'L'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Weight', '1.8', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Dimensions', '55 x 36 x 20', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Carry-on Compliant', 'Yes (expandable)', NULL);

-- REI Co-op Ruckpack 40
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('660e8400-e29b-41d4-a716-446655440003', 'Volume', '40', 'L'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Weight', '1.3', 'kg'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Dimensions', '53 x 35 x 22', 'cm'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Carry-on Compliant', 'Yes', NULL);

-- Insert sentiments (pros and cons)
-- Osprey Farpoint 40 - Pros
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'pro', 'Excellent comfort with well-padded straps and back panel'),
  ('770e8400-e29b-41d4-a716-446655440001', 'pro', 'Perfect size for carry-on compliance'),
  ('770e8400-e29b-41d4-a716-446655440001', 'pro', 'Great organization with multiple compartments'),
  ('770e8400-e29b-41d4-a716-446655440001', 'pro', 'Durable construction with lifetime warranty');

-- Osprey Farpoint 40 - Cons
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'con', 'Slightly heavier than some competitors'),
  ('770e8400-e29b-41d4-a716-446655440001', 'con', 'Aesthetic design is functional but not particularly stylish');

-- Peak Design Travel Backpack 45L - Pros
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440002', 'pro', 'Outstanding organization with innovative packing system'),
  ('770e8400-e29b-41d4-a716-446655440002', 'pro', 'Sleek, modern design'),
  ('770e8400-e29b-41d4-a716-446655440002', 'pro', 'High-quality materials and construction'),
  ('770e8400-e29b-41d4-a716-446655440002', 'pro', 'Expandable capacity for flexibility');

-- Peak Design Travel Backpack 45L - Cons
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440002', 'con', 'Premium price point'),
  ('770e8400-e29b-41d4-a716-446655440002', 'con', 'Comfort could be better for extended wear'),
  ('770e8400-e29b-41d4-a716-446655440002', 'con', 'Heavier than other options');

-- REI Co-op Ruckpack 40 - Pros
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440003', 'pro', 'Excellent value for money'),
  ('770e8400-e29b-41d4-a716-446655440003', 'pro', 'Lightweight design'),
  ('770e8400-e29b-41d4-a716-446655440003', 'pro', 'Solid build quality for the price'),
  ('770e8400-e29b-41d4-a716-446655440003', 'pro', 'Good basic organization features');

-- REI Co-op Ruckpack 40 - Cons
INSERT INTO sentiments (ranking_product_id, type, content) VALUES
  ('770e8400-e29b-41d4-a716-446655440003', 'con', 'Padding is less substantial than premium options'),
  ('770e8400-e29b-41d4-a716-446655440003', 'con', 'Fewer advanced features compared to competitors'),
  ('770e8400-e29b-41d4-a716-446655440003', 'con', 'Organization system is basic');

