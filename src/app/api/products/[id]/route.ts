import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await query(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authenticate(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description, price, image_url, category, tags, in_stock } = await request.json();

  let categoryId = null;
  if (category) {
    const catResult = await query("SELECT id FROM categories WHERE slug = $1", [category]);
    if (catResult.rows.length > 0) categoryId = catResult.rows[0].id;
  }

  const result = await query(
    `UPDATE products SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      price = COALESCE($3, price),
      image_url = COALESCE($4, image_url),
      category_id = COALESCE($5, category_id),
      tags = COALESCE($6, tags),
      in_stock = COALESCE($7, in_stock)
     WHERE id = $8 RETURNING *`,
    [name, description, price, image_url, categoryId, tags, in_stock, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authenticate(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await query("DELETE FROM products WHERE id = $1 RETURNING id", [id]);

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted" });
}
