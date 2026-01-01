-- Remove description column from products table
ALTER TABLE products
  DROP COLUMN IF EXISTS description;

