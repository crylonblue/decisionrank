-- Add users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  profile_picture_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add image_url and link to products table
ALTER TABLE products
  ADD COLUMN image_url TEXT,
  ADD COLUMN link TEXT;

-- Add user_id to sentiments table
ALTER TABLE sentiments
  ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX idx_sentiments_user_id ON sentiments(user_id);

-- Enable Row Level Security for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public can view users
CREATE POLICY "Public can view users" ON users
  FOR SELECT USING (true);











