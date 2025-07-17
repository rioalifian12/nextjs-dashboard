import { NextRequest } from "next/server";
import { products } from "@/app/lib/data-product";

export async function GET() {
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, price } = body;
  const newProduct = { id: Date.now(), name, price };

  products.push(newProduct);

  return new Response(JSON.stringify(newProduct), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
