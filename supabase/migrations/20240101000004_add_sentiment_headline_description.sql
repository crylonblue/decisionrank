-- Add headline and description to sentiments table
ALTER TABLE sentiments
  ADD COLUMN headline TEXT,
  ADD COLUMN description TEXT;

-- Update existing sentiments: move content to headline, set description to NULL
-- (We'll update these properly in the seed data migration)
UPDATE sentiments SET headline = content, description = NULL WHERE headline IS NULL;

-- Make headline required going forward (but keep existing data)
-- We'll handle this in application logic for now






















