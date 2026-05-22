import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'aura.db');
const db = new Database(dbPath);

export const query = (text: string, params: any[] = []): any => {
  const stmt = db.prepare(text);
  if (stmt.reader) {
    return { rows: stmt.all(...params) };
  }
  const result = stmt.run(...params);
  return {
    rows: [{ id: result.lastInsertRowid }],
    rowCount: result.changes,
  };
};

export const queryOne = (text: string, params: any[] = []): any => {
  return db.prepare(text).get(...params);
};

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image_url TEXT,
      category_id INTEGER REFERENCES categories(id),
      rating REAL DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      tags TEXT,
      in_stock INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);

  const existing = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
  if (existing.count === 0) {
    const insertCat = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
    insertCat.run('Electronics', 'electronics');
    insertCat.run('Clothing', 'clothing');
    insertCat.run('Home & Garden', 'home-garden');
    insertCat.run('Sports', 'sports');
  }
}

export function beginTransaction() {
  db.exec('BEGIN TRANSACTION');
}

export function commitTransaction() {
  db.exec('COMMIT');
}

export function rollbackTransaction() {
  db.exec('ROLLBACK');
}
