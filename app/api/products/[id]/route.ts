import { NextRequest } from "next/server";
import { products } from "@/app/lib/data-product";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return new Response("Product not found", { status: 404 });
  }

  const body = await request.json();
  const { name, price } = body;

  products[index] = { ...products[index], name, price };

  return new Response(JSON.stringify(products[index]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return new Response("Product not found", { status: 404 });
  }

  products.splice(index, 1);

  return new Response(null, { status: 204 });
}
