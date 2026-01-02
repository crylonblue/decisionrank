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
- **Products**: `link` (Amazon with affiliate tag preferred, or official website)
- **Products**: **2-3 YouTube video `assets` per product** (REQUIRED - use YouTube Data API)
- **Specifications**: At least 2-3 key specs per product (for comparison table)
- **Sentiments**: At least 2-3 pros and 1-2 cons per product
- **Criteria**: 3-5 evaluation criteria with corresponding `criterion_scores`

### Optional (Enhance User Experience)

- **Ranking**: `verdict_summary` (but highly recommended)
- **Products**: `link` (Amazon with `tag=decisionrank-20` preferred, official website as fallback)
- **Assets**: Third YouTube video (if 2 videos found, aim for 3)
- **FAQs**: 3-5 frequently asked questions
- **Sentiments**: `headline` and `description` (more detailed than just `content`)
- **Sentiments**: `user_id` - Randomly assign a user from the database for each sentiment

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

**Before creating a new category, check existing categories in the database:**

```sql
-- First, check all existing categories to see if one matches
SELECT id, name, slug, description FROM categories ORDER BY name;

-- Check if a specific category exists by slug
SELECT id FROM categories WHERE slug = 'your-category-slug';

-- Check if a similar category exists by name (fuzzy match)
SELECT id, name, slug FROM categories WHERE LOWER(name) LIKE '%keyword%';
```

**Category Matching Strategy**:
1. **Search existing categories** - Review all categories in the database
2. **Check for similar categories** - Look for categories that might match your ranking topic
   - Example: If creating "Best Laptops", check for "Electronics", "Computers", "Tech", etc.
3. **Reuse existing category** - If a suitable category exists, use its `id` instead of creating a new one
4. **Create new category only if needed** - Only create if no existing category is appropriate

**If no matching category exists, create it**:
```sql
INSERT INTO categories (name, slug, description)
VALUES ('Category Name', 'category-slug', 'Category description')
RETURNING id;  -- Save this category_id for Step 2
```

**Important**: 
- **Always check existing categories first** - Avoid creating duplicate or similar categories
- Slug must be URL-friendly (lowercase, hyphens, no spaces)
- Name and slug must be unique
- Reuse existing categories when possible to maintain consistency

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

**Product Link Strategy**:
1. **First Priority**: Search for product on Amazon
   - If found, use Amazon URL with affiliate tag: `https://www.amazon.com/dp/PRODUCT_ID?tag=decisionrank-20`
   - Or add tag parameter to existing Amazon URL: `https://www.amazon.com/...?tag=decisionrank-20`
   - Ensure the `tag=decisionrank-20` query parameter is present
2. **Fallback**: If not found on Amazon, use official product website URL
3. **Last Resort**: If neither available, set `link` to NULL

```sql
-- Check if product exists (by name)
SELECT id FROM products WHERE name = 'Product Name';

-- If not exists, create it
INSERT INTO products (name, link)
VALUES (
  'Product Name',
  'https://www.amazon.com/dp/B08XYZ123?tag=decisionrank-20'  -- Amazon link with affiliate tag, or official website, or NULL
)
RETURNING id;  -- Save product_id
```

**Important**:
- Products can be reused across multiple rankings
- Check for existing products to avoid duplicates
- `name` must be unique and descriptive
- **Link Priority**: Amazon (with `tag=decisionrank-20`) > Official Website > NULL
- Product images are handled through the `assets` table (see Step 9)

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

**Before adding sentiments, get a random user from the database:**

```sql
-- Get all users from the database
SELECT id FROM users;

-- Or get a random user
SELECT id FROM users ORDER BY RANDOM() LIMIT 1;
```

**For each sentiment, randomly select a user and assign it:**

For each product:

```sql
-- First, get a random user ID (do this for each sentiment or batch)
-- Example: SELECT id FROM users ORDER BY RANDOM() LIMIT 1; → returns 'user-uuid-1'

-- Pros (each with a randomly selected user)
INSERT INTO sentiments (ranking_product_id, type, content, headline, description, user_id)
VALUES 
  ('ranking-product-uuid', 'pro', 'Short summary', 'Excellent sound quality', 'Detailed description of sound quality...', 'user-uuid-1'),
  ('ranking-product-uuid', 'pro', 'Short summary', 'Long battery life', 'Detailed description...', 'user-uuid-2');

-- Cons (each with a randomly selected user)
INSERT INTO sentiments (ranking_product_id, type, content, headline, description, user_id)
VALUES 
  ('ranking-product-uuid', 'con', 'Short summary', 'Premium price', 'Detailed description of pricing...', 'user-uuid-3');
```

**Important**:
- `type` must be: 'pro', 'con', or 'comment'
- Include 2-4 pros and 1-3 cons per product
- `headline` and `description` are optional but recommended
- **REQUIRED**: Assign a random `user_id` from the database for each sentiment
- Query users table and randomly select a user ID for each sentiment
- Different sentiments can have the same user (it's random)
- **Writing Style**: 
  - Write sentiments with a **comment-like feeling** - conversational and personal, as if written by a real user
  - Keep language **easy to understand** - avoid technical jargon, use clear and simple language
  - Make it feel authentic and relatable, not overly formal or marketing-like
  - Examples:
    - Good: "Love how comfortable these are for long listening sessions!"
    - Bad: "The ergonomic design provides optimal comfort during extended usage periods"

#### Step 9: Add Product Assets (YouTube Videos - Required)

For each product, use the **YouTube Data API** to find product review/unboxing videos and add **2-3 videos per product**.

**Required: Add 2-3 YouTube videos per product**:
```sql
-- YouTube videos only (use video ID only, not full URL)
-- REQUIRED: Add 2-3 videos per product
INSERT INTO assets (product_id, type, url, display_order)
VALUES 
  ('product-uuid', 'youtube', 'dQw4w9WgXcQ', 0),  -- First video (best/most relevant)
  ('product-uuid', 'youtube', 'abc123xyz', 1),   -- Second video
  ('product-uuid', 'youtube', 'xyz789abc', 2);   -- Third video (if available)
```

**Important**:
- **REQUIRED**: Add 2-3 YouTube videos per product (minimum 2)
- Use YouTube Data API to search for product reviews/unboxings
- **First Version**: Only use YouTube videos (`type='youtube'`), no images
- For YouTube: use only the video ID (e.g., `dQw4w9WgXcQ`), not full URL
- `display_order` determines order (0 = first, 1 = second, 2 = third)
- Prioritize quality: recent, relevant videos from reputable channels
- Minimum 2 videos per product (aim for 3)

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

4. **Product Links**:
   - **Priority 1**: Amazon URL with `tag=decisionrank-20` parameter
     - Format: `https://www.amazon.com/dp/PRODUCT_ID?tag=decisionrank-20`
     - Or add to existing URL: `?tag=decisionrank-20` or `&tag=decisionrank-20`
   - **Priority 2**: Official product website URL
   - **Priority 3**: NULL if neither available
   - Always verify links are valid and accessible

5. **Assets (YouTube Videos)**:
   - **REQUIRED**: 2-3 YouTube videos per product (minimum 2)
   - Use YouTube Data API to find product review/unboxing videos
   - Extract video ID only (e.g., `dQw4w9WgXcQ`), not full URL
   - Prioritize recent, relevant videos from reputable channels
   - Minimum 2 videos per product (aim for 3)

6. **Specifications**:
   - Use consistent names across products for comparison
   - Examples: "Battery Life", "Weight", "Dimensions", "Price"
   - Include units where applicable

---

## Example Workflow

### Complete Example: "Best Wireless Earbuds 2024"

```sql
-- Step 1: Check Existing Categories, Then Create/Get Category
-- First, check all existing categories
SELECT id, name, slug FROM categories ORDER BY name;

-- Check if "Electronics" or similar category exists
SELECT id FROM categories WHERE LOWER(name) LIKE '%electronic%' OR slug = 'electronics';

-- If no match found, create new category
-- If match found, use existing category_id instead
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
-- Search Amazon first, add tag=decisionrank-20, fallback to official website
INSERT INTO products (name, link) VALUES
  ('Sony WF-1000XM5', 'https://www.amazon.com/dp/B0C7HZMZ5K?tag=decisionrank-20'),  -- Amazon with affiliate tag
  ('Apple AirPods Pro 2', 'https://www.amazon.com/dp/B0BDHB9Y8H?tag=decisionrank-20'),  -- Amazon with affiliate tag
  ('Bose QuietComfort Earbuds II', 'https://www.bose.com/products/headphones/quietcomfort-earbuds-ii.html')  -- Official website (if not on Amazon)
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
-- First, get random users: SELECT id FROM users ORDER BY RANDOM() LIMIT 3;
INSERT INTO sentiments (ranking_product_id, type, content, headline, description, user_id) VALUES
  ('ranking-product-uuid-1', 'pro', 'Excellent sound quality', 'Superior audio performance', 'The WF-1000XM5 delivers exceptional sound quality...', 'random-user-uuid-1'),
  ('ranking-product-uuid-1', 'pro', 'Great noise cancellation', 'Industry-leading ANC', 'The active noise cancellation is among the best...', 'random-user-uuid-2');
-- Add cons with random users and repeat for other products

-- Step 9: Add Assets (YouTube videos - REQUIRED: 2-3 per product)
-- Use YouTube Data API to find product review/unboxing videos
INSERT INTO assets (product_id, type, url, display_order) VALUES
  ('product-uuid-1', 'youtube', 'dQw4w9WgXcQ', 0),  -- First video (best/most relevant)
  ('product-uuid-1', 'youtube', 'abc123xyz', 1),    -- Second video (REQUIRED)
  ('product-uuid-1', 'youtube', 'xyz789abc', 2);     -- Third video (if available, aim for 3)
-- Repeat for all products - minimum 2 videos per product required

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
- [ ] Each sentiment has a randomly assigned `user_id` from the database
- [ ] Product links: Amazon URLs include `tag=decisionrank-20` parameter, or official website used
- [ ] Assets: 2-3 YouTube videos per product added using YouTube Data API
- [ ] YouTube video IDs are correct (just the ID, not full URL)
- [ ] Category checked against existing categories before creating new one
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
6. **YouTube URL Format**: Use only video ID, not full URL (e.g., `dQw4w9WgXcQ` not `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
7. **Score-Rank Mismatch**: Rank 1 should have highest score
8. **Missing Amazon Affiliate Tag**: Amazon URLs must include `tag=decisionrank-20` parameter
9. **Insufficient Videos**: Must add 2-3 YouTube videos per product (minimum 2)
10. **Creating Duplicate Categories**: Always check existing categories before creating new ones
11. **Using Images**: First version only supports YouTube videos (`type='youtube'`), not images
12. **Invalid Product Links**: Always verify Amazon and official website links are accessible

---

## Notes for AI Agent Implementation

1. **Transaction Safety**: Consider wrapping operations in a transaction to ensure atomicity
2. **Error Handling**: Check for existing records before inserting (use `ON CONFLICT` where appropriate)
3. **Data Validation**: Validate all inputs before database operations
4. **Slug Generation**: Convert question/title to slug format (lowercase, hyphens)
5. **Score Calculation**: Ensure scores are consistent and justify rank positions
6. **Research Quality**: Gather accurate, up-to-date product information
7. **Content Quality**: Write clear, informative descriptions and verdicts
8. **Product Link Research**:
   - Search Amazon first using product name
   - If found, construct URL with `tag=decisionrank-20` parameter
   - Verify link is accessible and points to correct product
   - Fallback to official product website if not on Amazon
   - Set to NULL only if neither available
9. **Category Research**:
   - **Before creating a category**: Query database for all existing categories
   - Check if any existing category matches your ranking topic
   - Reuse existing categories when appropriate to maintain consistency
   - Only create new categories if no suitable match exists
10. **YouTube Asset Research**:
   - Use YouTube Data API to find product review/unboxing videos
   - **REQUIRED**: Add 2-3 videos per product (minimum 2)
   - Extract video ID from API response (not full URL)
   - Prioritize recent, relevant videos from reputable channels
11. **Asset Type**: First version only supports `type='youtube'` - do not use `type='image'`
