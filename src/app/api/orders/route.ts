import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { query, beginTransaction, commitTransaction, rollbackTransaction } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { items, total } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    beginTransaction();

    try {
      // Create order
      const orderResult = await query(
        "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
        [auth.userId, total, "pending"]
      ) as { rows: { id: number }[] };

      const orderId = orderResult.rows[0].id;

      // Insert order items
      for (const item of items) {
        await query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, item.id, item.quantity, item.price]
        );
      }

      commitTransaction();
      
      return NextResponse.json({ 
        success: true, 
        orderId,
        message: "Order placed successfully" 
      });
    } catch (err) {
      rollbackTransaction();
      throw err;
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to create order";
    console.error("Order creation error:", error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const auth = await authenticate(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [auth.userId]
  );

  const orders = [];
  for (const order of result.rows) {
    const itemsResult = await query(
      `SELECT oi.id, oi.quantity, oi.price, p.name as product_name, p.image_url
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );
    orders.push({
      ...order,
      items: itemsResult.rows,
    });
  }

  return NextResponse.json({ orders });
}
