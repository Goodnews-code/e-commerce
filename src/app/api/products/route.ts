import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const sort = searchParams.get("sort");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  let where = "WHERE 1=1";
  const params: any[] = [];

  if (category && category !== "All") {
    where += " AND c.slug = ?";
    params.push(category);
  }

  if (search) {
    where += " AND (p.name LIKE ? OR p.description LIKE ?)";
    params.push("%" + search + "%", "%" + search + "%");
  }

  const countResult = await query(
    `SELECT COUNT(*) FROM products p LEFT JOIN categories c ON p.category_id = c.id ${where}`,
    params
  );
  const total = parseInt(countResult.rows[0].count);

  let orderBy = "p.created_at DESC";
  if (sort === "price-asc") orderBy = "p.price ASC";
  if (sort === "price-desc") orderBy = "p.price DESC";
  if (sort === "rating") orderBy = "p.rating DESC";
  if (sort === "reviews") orderBy = "p.reviews DESC";

  const result = await query(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p LEFT JOIN categories c ON p.category_id = c.id
     ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const categoriesResult = await query("SELECT name, slug FROM categories");

  const products = result.rows.map((p: any) => ({
    ...p,
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags || [],
  }));

  return NextResponse.json({
    products,
    total,
    page,
    limit,
    categories: ["All", ...categoriesResult.rows.map((c: any) => c.slug)],
  });
}

export async function POST(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, price, image_url, category, tags } = await request.json();

  const catResult = await query("SELECT id FROM categories WHERE slug = ?", [category]);
  if (catResult.rows.length === 0) {
    return NextResponse.json({ error: "Category not found" }, { status: 400 });
  }

  const result = await query(
    `INSERT INTO products (name, description, price, image_url, category_id, tags)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
    [name, description, price, image_url, catResult.rows[0].id, JSON.stringify(tags || [])]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
