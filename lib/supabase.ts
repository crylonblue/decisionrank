import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
// These environment variables should be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database schema
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

export type Criterion = {
  id: string;
  ranking_id: string;
  name: string;
  weight: number;
  created_at: string;
  updated_at: string;
};

export type CriterionScore = {
  id: string;
  ranking_product_id: string;
  criterion_id: string;
  score: number;
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
  content: string; // Kept for backward compatibility
  headline: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

// Extended types for queries with joins
export type RankingWithProducts = Ranking & {
  ranking_products: (RankingProduct & {
    product: Product;
    sentiments: Sentiment[];
  })[];
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

