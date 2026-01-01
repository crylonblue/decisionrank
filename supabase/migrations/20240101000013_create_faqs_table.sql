-- Create FAQs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_id UUID NOT NULL REFERENCES rankings(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_faqs_ranking_id ON faqs(ranking_id);
CREATE INDEX idx_faqs_display_order ON faqs(ranking_id, display_order);

-- Enable Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public SELECT only
CREATE POLICY "Public can view faqs" ON faqs
  FOR SELECT USING (true);

