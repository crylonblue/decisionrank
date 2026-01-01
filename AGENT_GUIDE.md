# Agent Guide: Posting New Product Rankings to DecisionRank

This guide outlines the complete process for an AI agent to research and post new product rankings to the DecisionRank Supabase database.

## Table of Contents
1. [Database Structure Overview](#database-structure-overview)
2. [Table Relationships & Dependencies](#table-relationships--dependencies)
3. [Required vs Optional Fields](#required-vs-optional-fields)
4. [Step-by-Step Process](#step-by-step-process)
5. [Important Constraints & Validations](#important-constraints--validations)
6. [Example Workflow](#example-workflow)

---

## Database Structure Overview

The DecisionRank database consists of the following tables:

### Core Tables

1. **`categories`** - Product categories (e.g., "Travel Gear", "Electronics")
   - `id` (UUID, Primary Key)
   - `name` (TEXT, UNIQUE, REQUIRED)
   - `slug` (TEXT, UNIQUE, REQUIRED) - URL-friendly version of name
   - `description` (TEXT, OPTIONAL)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

2. **`rankings`** - The main ranking question/comparison
   - `id` (UUID, Primary Key)
   - `slug` (TEXT, UNIQUE, REQUIRED) - URL-friendly identifier
   - `question` (TEXT, REQUIRED) - e.g., "What is the best travel backpack?"
   - `description` (TEXT, OPTIONAL) - Detailed description of the ranking
   - `verdict_summary` (TEXT, OPTIONAL) - Overall conclusion/verdict
   - `category_id` (UUID, Foreign Key → categories.id, REQUIRED)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

3. **`products`** - Reusable product catalog (products can appear in multiple rankings)
   - `id` (UUID, Primary Key)
   - `name` (TEXT, REQUIRED) - Product name
   - `image_url` (TEXT, OPTIONAL) - Main product image URL
   - `link` (TEXT, OPTIONAL) - Product purchase/review link
   - `created_at`, `updated_at` (TIMESTAMPTZ)

4. **`ranking_products`** - Junction table linking products to rankings with scores
   - `id` (UUID, Primary Key)
   - `ranking_id` (UUID, Foreign Key → rankings.id, REQUIRED)
   - `product_id` (UUID, Foreign Key → products.id, REQUIRED)
   - `score` (DECIMAL(10,2), REQUIRED) - Overall score (0-100 typically)
   - `rank_position` (INTEGER, REQUIRED) - Position in ranking (1 = best)
   - Constraints: UNIQUE(ranking_id, product_id), UNIQUE(ranking_id, rank_position)

### Supporting Tables

5. **`criteria`** - Evaluation criteria for a ranking (e.g., "Comfort", "Durability")
   - `id` (UUID, Primary Key)
   - `ranking_id` (UUID, Foreign Key → rankings.id, REQUIRED)
   - `name` (TEXT, REQUIRED) - Criterion name
   - `weight` (DECIMAL(5,2), DEFAULT 1.0) - Weight for scoring (optional)

6. **`criterion_scores`** - Scores for each product on each criterion
   - `id` (UUID, Primary Key)
   - `ranking_product_id` (UUID, Foreign Key → ranking_products.id, REQUIRED)
   - `criterion_id` (UUID, Foreign Key → criteria.id, REQUIRED)
   - `score` (DECIMAL(10,2), REQUIRED) - Score for this criterion
   - Constraint: UNIQUE(ranking_product_id, criterion_id)

7. **`specifications`** - Product specifications (e.g., "Volume: 40L", "Weight: 1.4kg")
   - `id` (UUID, Primary Key)
   - `product_id` (UUID, Foreign Key → products.id, REQUIRED)
   - `name` (TEXT, REQUIRED) - Spec name (e.g., "Volume", "Weight")
   - `value` (TEXT, REQUIRED) - Spec value (e.g., "40", "1.4")
   - `unit` (TEXT, OPTIONAL) - Unit (e.g., "L", "kg")

8. **`sentiments`** - Pros, cons, and comments for products in a ranking
   - `id` (UUID, Primary Key)
   - `ranking_product_id` (UUID, Foreign Key → ranking_products.id, REQUIRED)
   - `type` (TEXT, REQUIRED) - Must be one of: 'pro', 'con', 'comment'
   - `content` (TEXT, REQUIRED) - Legacy field, kept for compatibility
   - `headline` (TEXT, OPTIONAL) - Short headline/title
   - `description` (TEXT, OPTIONAL) - Detailed description
   - `user_id` (UUID, Foreign Key → users.id, OPTIONAL) - If attributed to a user

9. **`assets`** - Product images and YouTube videos
   - `id` (UUID, Primary Key)
   - `product_id` (UUID, Foreign Key → products.id, REQUIRED)
   - `type` (TEXT, REQUIRED) - Must be one of: 'image', 'youtube'
   - `url` (TEXT, REQUIRED) - Image URL or YouTube video ID
   - `display_order` (INTEGER, DEFAULT 0) - Order for display

10. **`faqs`** - Frequently asked questions for a ranking
    - `id` (UUID, Primary Key)
    - `ranking_id` (UUID, Foreign Key → rankings.id, REQUIRED)
    - `question` (TEXT, REQUIRED)
    - `answer` (TEXT, REQUIRED)
    - `display_order` (INTEGER, DEFAULT 0) - Order for display

11. **`users`** - User accounts (for attributing sentiments)
    - `id` (UUID, Primary Key)
    - `name` (TEXT, REQUIRED)
    - `profile_picture_url` (TEXT, OPTIONAL)
    - `created_at`, `updated_at` (TIMESTAMPTZ)

---

## Table Relationships & Dependencies

### Dependency Order (Insert Order)

When creating a new ranking, follow this order to respect foreign key constraints:

1. **`categories`** (if category doesn't exist)
2. **`rankings`** (requires category_id)
3. **`products`** (can be reused across rankings)
4. **`ranking_products`** (requires ranking_id and product_id)
5. **`criteria`** (requires ranking_id)
6. **`criterion_scores`** (requires ranking_product_id and criterion_id)
7. **`specifications`** (requires product_id)
8. **`sentiments`** (requires ranking_product_id)
9. **`assets`** (requires product_id)
10. **`faqs`** (requires ranking_id)

### Key Relationships

```
categories (1) ──< (many) rankings
rankings (1) ──< (many) ranking_products ──> (many) products
rankings (1) ──< (many) criteria
rankings (1) ──< (many) faqs
ranking_products (1) ──< (many) criterion_scores ──> (many) criteria
ranking_products (1) ──< (many) sentiments
products (1) ──< (many) specifications
products (1) ──< (many) assets
users (1) ──< (many) sentiments (optional)
```

---

## Required vs Optional Fields

### Critical (Required for Ranking to Display Properly)

- **Category**: Must exist or be created
- **Ranking**: `slug`, `question`, `category_id`
- **Ranking Products**: At least 2 products with `score` and `rank_position`
- **Products**: `name` (at minimum)

### Highly Recommended

- **Ranking**: `description`, `verdict_summary`
- **Products**: `image_url` or at least one `asset` (for visual display)
- **Specifications**: At least 2-3 key specs per product (for comparison table)
- **Sentiments**: At least 2-3 pros and 1-2 cons per product
- **Criteria**: 3-5 evaluation criteria with corresponding `criterion_scores`

### Optional (Enhance User Experience)

- **Ranking**: `verdict_summary` (but highly recommended)
- **Products**: `link` (purchase/review link)
- **Assets**: Multiple images, YouTube videos
- **FAQs**: 3-5 frequently asked questions
- **Sentiments**: `headline` and `description` (more detailed than just `content`)
- **Users**: Attribution for sentiments (usually not needed for agent-generated content)

---

## Step-by-Step Process

### Phase 1: Research & Preparation

1. **Research the Topic**
   - Identify the ranking question (e.g., "What is the best wireless earbuds?")
   - Research 3-10 products to compare
   - Gather product specifications, pros/cons, images
   - Identify key evaluation criteria
   - Prepare a verdict/summary

2. **Prepare Data Structure**
   - Organize products with their data
   - Calculate scores (overall and per criterion)
   - Determine rank positions (1 = best)
   - Prepare pros/cons for each product
   - Draft FAQs if relevant

### Phase 2: Database Operations

#### Step 1: Handle Category

```sql
-- Check if category exists
SELECT id FROM categories WHERE slug = 'your-category-slug';

-- If not exists, create it
INSERT INTO categories (name, slug, description)
VALUES ('Category Name', 'category-slug', 'Category description');
```

**Important**: 
- Slug must be URL-friendly (lowercase, hyphens, no spaces)
- Name and slug must be unique

#### Step 2: Create Ranking

```sql
INSERT INTO rankings (slug, question, description, verdict_summary, category_id)
VALUES (
  'best-wireless-earbuds-2024',  -- URL-friendly slug
  'What is the best wireless earbuds?',  -- The ranking question
  'A comprehensive comparison of top wireless earbuds...',  -- Description
  'After extensive testing, Product X emerges as the top choice...',  -- Verdict
  'category-uuid-here'  -- Category ID from Step 1
)
RETURNING id;  -- Save this ranking_id for subsequent steps
```

**Important**:
- Slug must be unique across all rankings
- Category must exist
- Question should be clear and specific

#### Step 3: Create or Reuse Products

For each product:

```sql
-- Check if product exists (by name)
SELECT id FROM products WHERE name = 'Product Name';

-- If not exists, create it
INSERT INTO products (name, image_url, link)
VALUES (
  'Product Name',
  'https://example.com/image.jpg',  -- Optional but recommended
  'https://example.com/product-link'  -- Optional
)
RETURNING id;  -- Save product_id
```

**Important**:
- Products can be reused across multiple rankings
- Check for existing products to avoid duplicates
- `name` must be unique and descriptive

#### Step 4: Link Products to Ranking (ranking_products)

For each product in the ranking:

```sql
INSERT INTO ranking_products (ranking_id, product_id, score, rank_position)
VALUES (
  'ranking-uuid',      -- From Step 2
  'product-uuid',     -- From Step 3
  92.5,               -- Overall score (0-100)
  1                   -- Rank position (1 = best, 2 = second, etc.)
)
RETURNING id;  -- Save ranking_product_id for sentiments and criterion_scores
```

**Critical Constraints**:
- `rank_position` must be unique per ranking (1, 2, 3, ...)
- `score` should reflect overall quality (higher = better)
- At least 2 products required, typically 3-10

#### Step 5: Create Evaluation Criteria

```sql
INSERT INTO criteria (ranking_id, name, weight)
VALUES 
  ('ranking-uuid', 'Sound Quality', 1.0),
  ('ranking-uuid', 'Battery Life', 0.9),
  ('ranking-uuid', 'Comfort', 0.8),
  ('ranking-uuid', 'Value', 0.9)
RETURNING id;  -- Save criterion_id for criterion_scores
```

**Important**:
- Criteria are ranking-specific
- Weight defaults to 1.0 (can adjust for importance)
- Typically 3-5 criteria per ranking

#### Step 6: Add Criterion Scores

For each product × criterion combination:

```sql
INSERT INTO criterion_scores (ranking_product_id, criterion_id, score)
VALUES 
  ('ranking-product-uuid-1', 'criterion-uuid-1', 95.0),  -- Product 1, Criterion 1
  ('ranking-product-uuid-1', 'criterion-uuid-2', 90.0),  -- Product 1, Criterion 2
  ('ranking-product-uuid-2', 'criterion-uuid-1', 88.0),  -- Product 2, Criterion 1
  -- ... continue for all combinations
```

**Important**:
- Every product should have scores for all criteria
- Scores typically 0-100
- UNIQUE constraint: one score per product-criterion pair

#### Step 7: Add Product Specifications

For each product:

```sql
INSERT INTO specifications (product_id, name, value, unit)
VALUES 
  ('product-uuid', 'Battery Life', '8', 'hours'),
  ('product-uuid', 'Weight', '5.4', 'g'),
  ('product-uuid', 'Noise Cancellation', 'Yes', NULL),
  ('product-uuid', 'Water Resistance', 'IPX4', NULL)
```

**Important**:
- Use consistent spec names across products for comparison
- `unit` is optional (use NULL for boolean/text specs)
- Include 3-8 key specifications per product

#### Step 8: Add Pros and Cons (Sentiments)

For each product:

```sql
-- Pros
INSERT INTO sentiments (ranking_product_id, type, content, headline, description)
VALUES 
  ('ranking-product-uuid', 'pro', 'Short summary', 'Excellent sound quality', 'Detailed description of sound quality...'),
  ('ranking-product-uuid', 'pro', 'Short summary', 'Long battery life', 'Detailed description...');

-- Cons
INSERT INTO sentiments (ranking_product_id, type, content, headline, description)
VALUES 
  ('ranking-product-uuid', 'con', 'Short summary', 'Premium price', 'Detailed description of pricing...');
```

**Important**:
- `type` must be: 'pro', 'con', or 'comment'
- Include 2-4 pros and 1-3 cons per product
- `headline` and `description` are optional but recommended
- `user_id` is optional (usually NULL for agent-generated content)

#### Step 9: Add Product Assets (Images/Videos)

For each product:

```sql
-- Images
INSERT INTO assets (product_id, type, url, display_order)
VALUES 
  ('product-uuid', 'image', 'https://example.com/product-image-1.jpg', 0),
  ('product-uuid', 'image', 'https://example.com/product-image-2.jpg', 1);

-- YouTube videos (use video ID only, not full URL)
INSERT INTO assets (product_id, type, url, display_order)
VALUES 
  ('product-uuid', 'youtube', 'dQw4w9WgXcQ', 2);  -- Just the video ID
```

**Important**:
- `type` must be: 'image' or 'youtube'
- For YouTube: use only the video ID (e.g., `dQw4w9WgXcQ`), not full URL
- `display_order` determines order (0 = first, 1 = second, etc.)
- At least one image per product recommended

#### Step 10: Add FAQs (Optional but Recommended)

```sql
INSERT INTO faqs (ranking_id, question, answer, display_order)
VALUES 
  ('ranking-uuid', 'What is the battery life?', 'Most models offer 6-8 hours...', 0),
  ('ranking-uuid', 'Are they waterproof?', 'Most models have IPX4 rating...', 1),
  ('ranking-uuid', 'What is the price range?', 'Prices range from $50 to $300...', 2);
```

**Important**:
- FAQs are ranking-specific, not product-specific
- `display_order` determines order (0 = first)
- Include 3-5 FAQs addressing common questions

---

## Important Constraints & Validations

### Uniqueness Constraints

1. **Categories**: `name` and `slug` must be unique
2. **Rankings**: `slug` must be unique
3. **Ranking Products**: 
   - `(ranking_id, product_id)` must be unique (product can't appear twice in same ranking)
   - `(ranking_id, rank_position)` must be unique (no duplicate positions)
4. **Criterion Scores**: `(ranking_product_id, criterion_id)` must be unique

### Required Relationships

1. **Ranking → Category**: Every ranking MUST have a `category_id`
2. **Ranking Products**: Must reference valid `ranking_id` and `product_id`
3. **Criterion Scores**: Must reference valid `ranking_product_id` and `criterion_id`
4. **Sentiments**: Must reference valid `ranking_product_id`
5. **Specifications**: Must reference valid `product_id`
6. **Assets**: Must reference valid `product_id`
7. **FAQs**: Must reference valid `ranking_id`

### Data Quality Guidelines

1. **Slugs**: 
   - Lowercase, URL-friendly
   - Use hyphens, not underscores or spaces
   - Examples: `best-wireless-earbuds`, `top-laptops-2024`

2. **Scores**:
   - Overall scores: Typically 0-100 (higher = better)
   - Criterion scores: Typically 0-100
   - Ensure scores align with rank positions (rank 1 should have highest score)

3. **Rank Positions**:
   - Must be sequential integers starting from 1
   - No gaps (1, 2, 3, not 1, 3, 5)
   - Lower number = better rank

4. **Specifications**:
   - Use consistent names across products for comparison
   - Examples: "Battery Life", "Weight", "Dimensions", "Price"
   - Include units where applicable

---

## Example Workflow

### Complete Example: "Best Wireless Earbuds 2024"

```sql
-- Step 1: Create/Get Category
INSERT INTO categories (name, slug, description)
VALUES ('Electronics', 'electronics', 'Electronic devices and accessories')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
RETURNING id;  -- Save as category_id

-- Step 2: Create Ranking
INSERT INTO rankings (slug, question, description, verdict_summary, category_id)
VALUES (
  'best-wireless-earbuds-2024',
  'What is the best wireless earbuds?',
  'A comprehensive comparison of the top wireless earbuds for 2024...',
  'After extensive testing, the Sony WF-1000XM5 emerges as the top choice...',
  'category-uuid'
)
RETURNING id;  -- Save as ranking_id

-- Step 3: Create Products
INSERT INTO products (name, image_url, link) VALUES
  ('Sony WF-1000XM5', 'https://example.com/sony.jpg', 'https://example.com/sony-link'),
  ('Apple AirPods Pro 2', 'https://example.com/apple.jpg', 'https://example.com/apple-link'),
  ('Bose QuietComfort Earbuds II', 'https://example.com/bose.jpg', 'https://example.com/bose-link')
RETURNING id;  -- Save product_ids

-- Step 4: Link Products to Ranking
INSERT INTO ranking_products (ranking_id, product_id, score, rank_position) VALUES
  ('ranking-uuid', 'product-uuid-1', 95.0, 1),
  ('ranking-uuid', 'product-uuid-2', 92.0, 2),
  ('ranking-uuid', 'product-uuid-3', 88.0, 3)
RETURNING id;  -- Save ranking_product_ids

-- Step 5: Create Criteria
INSERT INTO criteria (ranking_id, name, weight) VALUES
  ('ranking-uuid', 'Sound Quality', 1.0),
  ('ranking-uuid', 'Noise Cancellation', 0.9),
  ('ranking-uuid', 'Battery Life', 0.8),
  ('ranking-uuid', 'Comfort', 0.9)
RETURNING id;  -- Save criterion_ids

-- Step 6: Add Criterion Scores (for Product 1)
INSERT INTO criterion_scores (ranking_product_id, criterion_id, score) VALUES
  ('ranking-product-uuid-1', 'criterion-uuid-1', 98.0),  -- Sound Quality
  ('ranking-product-uuid-1', 'criterion-uuid-2', 96.0),  -- Noise Cancellation
  ('ranking-product-uuid-1', 'criterion-uuid-3', 90.0),  -- Battery Life
  ('ranking-product-uuid-1', 'criterion-uuid-4', 92.0); -- Comfort
-- Repeat for Products 2 and 3

-- Step 7: Add Specifications (for Product 1)
INSERT INTO specifications (product_id, name, value, unit) VALUES
  ('product-uuid-1', 'Battery Life', '8', 'hours'),
  ('product-uuid-1', 'Weight', '5.9', 'g'),
  ('product-uuid-1', 'Noise Cancellation', 'Yes', NULL),
  ('product-uuid-1', 'Water Resistance', 'IPX4', NULL);
-- Repeat for Products 2 and 3

-- Step 8: Add Sentiments (Pros for Product 1)
INSERT INTO sentiments (ranking_product_id, type, content, headline, description) VALUES
  ('ranking-product-uuid-1', 'pro', 'Excellent sound quality', 'Superior audio performance', 'The WF-1000XM5 delivers exceptional sound quality...'),
  ('ranking-product-uuid-1', 'pro', 'Great noise cancellation', 'Industry-leading ANC', 'The active noise cancellation is among the best...');
-- Add cons and repeat for other products

-- Step 9: Add Assets (for Product 1)
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('product-uuid-1', 'image', 'https://example.com/sony-front.jpg', 0),
  ('product-uuid-1', 'image', 'https://example.com/sony-side.jpg', 1),
  ('product-uuid-1', 'youtube', 'dQw4w9WgXcQ', 2);
-- Repeat for other products

-- Step 10: Add FAQs
INSERT INTO faqs (ranking_id, question, answer, display_order) VALUES
  ('ranking-uuid', 'What is the battery life?', 'Most wireless earbuds offer 6-8 hours of playback...', 0),
  ('ranking-uuid', 'Are they waterproof?', 'Most models have IPX4 rating for sweat resistance...', 1),
  ('ranking-uuid', 'What is the price range?', 'Prices range from $150 to $300...', 2);
```

---

## Checklist for Agent

Before submitting a ranking, verify:

- [ ] Category exists or has been created
- [ ] Ranking slug is unique and URL-friendly
- [ ] Ranking has a valid `category_id`
- [ ] At least 2 products are included (typically 3-10)
- [ ] All products have unique `rank_position` values (1, 2, 3, ...)
- [ ] Overall scores align with rank positions (rank 1 has highest score)
- [ ] At least 3-5 evaluation criteria are defined
- [ ] All products have scores for all criteria
- [ ] Each product has 2-4 pros and 1-3 cons
- [ ] Each product has at least one image asset
- [ ] Specifications use consistent names across products
- [ ] FAQs are relevant and well-written (if included)
- [ ] All foreign key relationships are valid
- [ ] No duplicate entries violate uniqueness constraints

---

## Common Pitfalls to Avoid

1. **Duplicate Slugs**: Always check if slug exists before creating ranking
2. **Missing Category**: Ranking will fail without valid `category_id`
3. **Duplicate Rank Positions**: Ensure each product has unique position (1, 2, 3...)
4. **Incomplete Criterion Scores**: Every product needs scores for all criteria
5. **Inconsistent Spec Names**: Use same names across products (e.g., "Battery Life" not "Battery" and "Battery Life")
6. **YouTube URL Format**: Use only video ID, not full URL
7. **Score-Rank Mismatch**: Rank 1 should have highest score
8. **Missing Assets**: Products without images won't display well

---

## Notes for AI Agent Implementation

1. **Transaction Safety**: Consider wrapping operations in a transaction to ensure atomicity
2. **Error Handling**: Check for existing records before inserting (use `ON CONFLICT` where appropriate)
3. **Data Validation**: Validate all inputs before database operations
4. **Slug Generation**: Convert question/title to slug format (lowercase, hyphens)
5. **Score Calculation**: Ensure scores are consistent and justify rank positions
6. **Research Quality**: Gather accurate, up-to-date product information
7. **Content Quality**: Write clear, informative descriptions and verdicts

---

## Additional Resources

- Database schema: See `supabase/migrations/` directory
- TypeScript types: See `lib/supabase.ts`
- Data fetching examples: See `lib/data.ts`
- Seed data examples: See `supabase/migrations/20240101000001_seed_data.sql`

