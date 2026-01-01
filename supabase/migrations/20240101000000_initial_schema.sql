-- Rankings table
CREATE TABLE rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  question TEXT NOT NULL,
  description TEXT,
  verdict_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (reusable across rankings)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ranking Products junction table (mandatory, includes scores and rank)
CREATE TABLE ranking_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_id UUID NOT NULL REFERENCES rankings(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  score DECIMAL(10, 2) NOT NULL,
  rank_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ranking_id, product_id),
  UNIQUE(ranking_id, rank_position)
);

-- Criteria table (ranking-specific criteria)
CREATE TABLE criteria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_id UUID NOT NULL REFERENCES rankings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  weight DECIMAL(5, 2) DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criterion Scores table (scores for each product on each criterion)
CREATE TABLE criterion_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_product_id UUID NOT NULL REFERENCES ranking_products(id) ON DELETE CASCADE,
  criterion_id UUID NOT NULL REFERENCES criteria(id) ON DELETE CASCADE,
  score DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ranking_product_id, criterion_id)
);

-- Specifications table (product specifications)
CREATE TABLE specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  unit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sentiments table (pros, cons, comments)
CREATE TABLE sentiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_product_id UUID NOT NULL REFERENCES ranking_products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('pro', 'con', 'comment')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_rankings_slug ON rankings(slug);
CREATE INDEX idx_ranking_products_ranking_id ON ranking_products(ranking_id);
CREATE INDEX idx_ranking_products_product_id ON ranking_products(product_id);
CREATE INDEX idx_ranking_products_rank ON ranking_products(ranking_id, rank_position);
CREATE INDEX idx_criteria_ranking_id ON criteria(ranking_id);
CREATE INDEX idx_criterion_scores_ranking_product_id ON criterion_scores(ranking_product_id);
CREATE INDEX idx_specifications_product_id ON specifications(product_id);
CREATE INDEX idx_sentiments_ranking_product_id ON sentiments(ranking_product_id);
CREATE INDEX idx_sentiments_type ON sentiments(ranking_product_id, type);

-- Enable Row Level Security
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranking_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE criterion_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiments ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public SELECT only
CREATE POLICY "Public can view rankings" ON rankings
  FOR SELECT USING (true);

CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public can view ranking_products" ON ranking_products
  FOR SELECT USING (true);

CREATE POLICY "Public can view criteria" ON criteria
  FOR SELECT USING (true);

CREATE POLICY "Public can view criterion_scores" ON criterion_scores
  FOR SELECT USING (true);

CREATE POLICY "Public can view specifications" ON specifications
  FOR SELECT USING (true);

CREATE POLICY "Public can view sentiments" ON sentiments
  FOR SELECT USING (true);

