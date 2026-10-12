
import { NextResponse } from "next/server";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    const responseText = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    if (!response.ok) {
      console.error("Upstream API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: data,
      });

      return NextResponse.json(
        {
          error: "Products API request failed",
          upstreamStatus: response.status,
          upstreamStatusText: response.statusText,
          details: data,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Products API Connection Error:", error);

    return NextResponse.json(
      {
        error: "Could not connect to API 1",
        details:
          error instanceof Error ? error.message : "Unknown connection error",
      },
      { status: 502 }
    );
  }
}

