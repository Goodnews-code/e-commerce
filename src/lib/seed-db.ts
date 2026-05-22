import { query } from './db';
import productsData from '@/data/products.json';
import bcrypt from 'bcryptjs';

const categoryMap: Record<string, string> = {
  'Accessories': 'electronics',
  'Home & Office': 'home-garden',
  'Electronics': 'electronics',
  'Clothing': 'clothing',
  'Sports': 'sports',
};

async function seed() {
  console.log('Seeding database...');

  for (const product of productsData) {
    const categorySlug = categoryMap[product.category] || 'electronics';
    const catResult = query('SELECT id FROM categories WHERE slug = ?', [categorySlug]);

    if (!catResult.rows || catResult.rows.length === 0) continue;

    query(
      `INSERT OR IGNORE INTO products (name, description, price, image_url, category_id, rating, reviews, tags, in_stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.description,
        product.price,
        product.image,
        catResult.rows[0].id,
        product.rating,
        product.reviews,
        JSON.stringify(product.tags || []),
        product.inStock !== false ? 1 : 0
      ]
    );
  }

  // Seed default user
  const hashedPassword = bcrypt.hashSync('password123', 10);
  query(
    'INSERT OR IGNORE INTO users (username, password_hash, email) VALUES (?, ?, ?)',
    ['demo', hashedPassword, 'demo@aura.com']
  );

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
