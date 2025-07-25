// app/api/secret/route.ts

import { NextRequest } from "next/server";
import { withAuth } from "@/app/lib/with-auth";

async function secretGET(request: NextRequest) {
  return new Response(JSON.stringify({ secret: "Here be dragons" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export const GET = withAuth(secretGET);
