import { NextRequest, NextResponse } from "next/server";
import { proxyBazarDorRequest } from "@/lib/api/proxy";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  if (category !== null && (category.length === 0 || category.length > 120)) {
    return NextResponse.json(
      { error: "A valid category is required." },
      { status: 400 },
    );
  }

  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  return proxyBazarDorRequest(path);
}
