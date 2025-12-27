-- Seed assets table with images and YouTube embeds
-- Migrate existing image_url from products to assets, then add additional assets

-- Osprey Farpoint 40 - Multiple images + YouTube embed
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'image', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 0),
  ('660e8400-e29b-41d4-a716-446655440001', 'image', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop', 1),
  ('660e8400-e29b-41d4-a716-446655440001', 'youtube', 'dQw4w9WgXcQ', 2),
  ('660e8400-e29b-41d4-a716-446655440001', 'image', 'https://images.unsplash.com/photo-1622560480604-dfce36e2134e?w=800&h=600&fit=crop', 3)
ON CONFLICT DO NOTHING;

-- Peak Design Travel Backpack 45L - Multiple images + YouTube embed
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440002', 'image', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop', 0),
  ('660e8400-e29b-41d4-a716-446655440002', 'image', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 1),
  ('660e8400-e29b-41d4-a716-446655440002', 'youtube', 'jNQXAC9IVRw', 2),
  ('660e8400-e29b-41d4-a716-446655440002', 'image', 'https://images.unsplash.com/photo-1622560480604-dfce36e2134e?w=800&h=600&fit=crop', 3)
ON CONFLICT DO NOTHING;

-- REI Co-op Ruckpack 40 - Multiple images
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440003', 'image', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 0),
  ('660e8400-e29b-41d4-a716-446655440003', 'image', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop', 1),
  ('660e8400-e29b-41d4-a716-446655440003', 'image', 'https://images.unsplash.com/photo-1622560480604-dfce36e2134e?w=800&h=600&fit=crop', 2)
ON CONFLICT DO NOTHING;

-- Tortuga Setout 35L - Single image (to test fallback behavior)
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440004', 'image', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 0)
ON CONFLICT DO NOTHING;

-- Aer Travel Pack 3 - Multiple images + YouTube embed
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('660e8400-e29b-41d4-a716-446655440005', 'image', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&h=600&fit=crop', 0),
  ('660e8400-e29b-41d4-a716-446655440005', 'youtube', 'dQw4w9WgXcQ', 1),
  ('660e8400-e29b-41d4-a716-446655440005', 'image', 'https://images.unsplash.com/photo-1622560480604-dfce36e2134e?w=800&h=600&fit=crop', 2)
ON CONFLICT DO NOTHING;

-- Note: Some products (like Nomatic Travel Pack 40L, Patagonia Black Hole Pack 32L, etc.)
-- will have no assets to test fallback behavior

