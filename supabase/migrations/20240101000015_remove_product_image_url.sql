-- Remove image_url column from products table
-- Images are now handled through the assets table
ALTER TABLE products
  DROP COLUMN IF EXISTS image_url;

