export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Ranking = {
  id: string;
  slug: string;
  question: string;
  description: string | null;
  verdict_summary: string | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  link: string | null;
  created_at: string;
  updated_at: string;
};

export type Asset = {
  id: string;
  product_id: string;
  type: 'image' | 'youtube';
  url: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  name: string;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
};

export type RankingProduct = {
  id: string;
  ranking_id: string;
  product_id: string;
  score: number;
  rank_position: number;
  created_at: string;
  updated_at: string;
};

export type Specification = {
  id: string;
  product_id: string;
  name: string;
  value: string;
  unit: string | null;
  created_at: string;
  updated_at: string;
};

export type Sentiment = {
  id: string;
  ranking_product_id: string;
  user_id: string | null;
  type: 'pro' | 'con' | 'comment';
  content: string;
  headline: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type SentimentWithUser = Sentiment & {
  user: User | null;
};

export type FAQ = {
  id: string;
  ranking_id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type RankingProductWithDetails = RankingProduct & {
  product: Product & {
    assets?: Asset[];
  };
  sentiments: SentimentWithUser[];
  specifications: Specification[];
};
