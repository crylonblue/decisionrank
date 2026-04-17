import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function processFile(relativePath, useAllCategories) {
  const fullPath = join(projectRoot, relativePath);
  let s = readFileSync(fullPath, 'utf8');

  // 1. Add import if missing
  if (!s.includes('getRelatedCategorySlugs')) {
    s = s.replace(
      /import { CategoryLinks } from ['"]@\/components\/category-links['"];?/,
      `import { CategoryLinks } from '@/components/category-links';\nimport { getRelatedCategorySlugs } from '@/lib/category-relations';`
    );
  }

  // 2. Insert computation block before "  return ("
  const block = `\n  // Compute related categories based on adjacency mapping\n  const relatedSlugs = getRelatedCategorySlugs(categorySlug);\n  const relatedCategories = ${useAllCategories ? 'allCategories' : 'categories'}.filter(\n    c => relatedSlugs.includes(c.slug) && c.slug !== categorySlug\n  );\n  const displayCategories =\n    relatedCategories.length > 0\n      ? relatedCategories\n      : ${useAllCategories ? 'allCategories' : 'categories'}.filter(c => c.slug !== categorySlug).slice(0, 4);\n`;
  s = s.replace(/^  return \(/gm, block + '  return (');

  // 3. Replace categories prop
  const propPattern = new RegExp(`categories=\\{${useAllCategories ? 'allCategories' : 'categories'}\\.filter\\(c => c\\.slug !== categorySlug\\)\\.slice\\(0, 4\\)\\}`);
  s = s.replace(propPattern, 'categories={displayCategories}');

  writeFileSync(fullPath, s, 'utf8');
  console.log(`✅ Patched ${relativePath}`);
}

processFile('app/[category]/page.tsx', false);
processFile('app/[category]/[slug]/page.tsx', true);
