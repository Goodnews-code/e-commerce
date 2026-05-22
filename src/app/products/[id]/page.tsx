import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import type { Product } from "@/types/product";
import ProductDetailClient from "./ProductDetailClient";

interface DbProductRow {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  rating: number;
  reviews: number;
  tags: string;
  in_stock: boolean;
  created_at: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Fetch product
  const productResult = await query(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  );

  if (productResult.rows.length === 0) {
    notFound();
  }

  const dbProduct = productResult.rows[0] as DbProductRow;
  const product: Product = {
    ...dbProduct,
    tags: typeof dbProduct.tags === "string" ? JSON.parse(dbProduct.tags) : dbProduct.tags || [],
  };

  // Fetch up to 3 related products under the same category (excluding the current product)
  const relatedResult = await query(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.category_id = ? AND p.id != ?
     LIMIT 3`,
    [product.category_id, product.id]
  );

  const relatedProducts: Product[] = (relatedResult.rows as DbProductRow[]).map((p) => ({
    ...p,
    tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags || [],
  }));

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
