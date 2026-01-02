-- Update sentiments with headline and description
-- Osprey Farpoint 40 - Pros
UPDATE sentiments SET 
  headline = 'Excellent comfort',
  description = 'Well-padded straps and back panel provide superior comfort during extended wear.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Excellent comfort with well-padded straps and back panel';

UPDATE sentiments SET 
  headline = 'Carry-on compliant',
  description = 'Perfect size for most airline carry-on requirements, making travel hassle-free.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Perfect size for carry-on compliance';

UPDATE sentiments SET 
  headline = 'Great organization',
  description = 'Multiple compartments and pockets help keep your belongings organized and accessible.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Great organization with multiple compartments';

UPDATE sentiments SET 
  headline = 'Lifetime warranty',
  description = 'Durable construction backed by Osprey''s lifetime warranty for peace of mind.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'pro' 
  AND content = 'Durable construction with lifetime warranty';

-- Osprey Farpoint 40 - Cons
UPDATE sentiments SET 
  headline = 'Heavier than competitors',
  description = 'Slightly heavier than some competing models, which may matter for weight-conscious travelers.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'con' 
  AND content = 'Slightly heavier than some competitors';

UPDATE sentiments SET 
  headline = 'Functional but plain design',
  description = 'Aesthetic design is functional but not particularly stylish compared to premium alternatives.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440001' 
  AND type = 'con' 
  AND content = 'Aesthetic design is functional but not particularly stylish';

-- Peak Design Travel Backpack 45L - Pros
UPDATE sentiments SET 
  headline = 'Innovative organization system',
  description = 'Outstanding organization with an innovative packing system that maximizes space efficiency.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Outstanding organization with innovative packing system';

UPDATE sentiments SET 
  headline = 'Sleek modern design',
  description = 'Contemporary aesthetic that looks professional and stylish in any setting.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Sleek, modern design';

UPDATE sentiments SET 
  headline = 'Premium materials',
  description = 'High-quality materials and construction ensure long-lasting durability and performance.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'High-quality materials and construction';

UPDATE sentiments SET 
  headline = 'Expandable capacity',
  description = 'Flexible expandable design allows you to adjust capacity based on your travel needs.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'pro' 
  AND content = 'Expandable capacity for flexibility';

-- Peak Design Travel Backpack 45L - Cons
UPDATE sentiments SET 
  headline = 'Premium pricing',
  description = 'Higher price point compared to other options in the market.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Premium price point';

UPDATE sentiments SET 
  headline = 'Comfort could be better',
  description = 'Comfort could be improved for extended wear periods, especially with heavy loads.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Comfort could be better for extended wear';

UPDATE sentiments SET 
  headline = 'Heavier weight',
  description = 'Heavier than other options, which may be a concern for some travelers.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440002' 
  AND type = 'con' 
  AND content = 'Heavier than other options';

-- REI Co-op Ruckpack 40 - Pros
UPDATE sentiments SET 
  headline = 'Excellent value',
  description = 'Outstanding value for money, offering solid features at an affordable price point.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Excellent value for money';

UPDATE sentiments SET 
  headline = 'Lightweight design',
  description = 'Lightweight construction makes it easy to carry, even when fully loaded.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Lightweight design';

UPDATE sentiments SET 
  headline = 'Solid build quality',
  description = 'Well-constructed with good materials for the price, offering reliable performance.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Solid build quality for the price';

UPDATE sentiments SET 
  headline = 'Basic organization',
  description = 'Good basic organization features that cover essential needs without complexity.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'pro' 
  AND content = 'Good basic organization features';

-- REI Co-op Ruckpack 40 - Cons
UPDATE sentiments SET 
  headline = 'Less padding',
  description = 'Padding is less substantial than premium options, which may affect comfort during long trips.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Padding is less substantial than premium options';

UPDATE sentiments SET 
  headline = 'Fewer advanced features',
  description = 'Lacks some of the advanced features found in higher-end competing models.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Fewer advanced features compared to competitors';

UPDATE sentiments SET 
  headline = 'Basic organization system',
  description = 'Organization system is functional but basic compared to more feature-rich alternatives.'
WHERE ranking_product_id = '770e8400-e29b-41d4-a716-446655440003' 
  AND type = 'con' 
  AND content = 'Organization system is basic';






















