import { NextResponse } from "next/server";

const DEFAULT_API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

function getUpstreamUrl(path: string): URL {
  const configuredUrl = process.env.BAZARDOR_API_URL ?? DEFAULT_API_URL;
  const baseUrl = new URL(configuredUrl);
  const upstreamPath = new URL(path, "https://bazardor.invalid");
  const isLocalHttp =
    baseUrl.protocol === "http:" &&
    (baseUrl.hostname === "localhost" || baseUrl.hostname === "127.0.0.1");

  if (baseUrl.protocol !== "https:" && !isLocalHttp) {
    throw new Error("BAZARDOR_API_URL must use HTTPS.");
  }

  baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, "")}${upstreamPath.pathname}`;
  baseUrl.search = upstreamPath.search;
  baseUrl.hash = "";
  return baseUrl;
}

export async function proxyBazarDorRequest(path: string): Promise<Response> {
  try {
    const response = await fetch(getUpstreamUrl(path), {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      console.error(`BazarDor upstream returned HTTP ${response.status}.`);
      return NextResponse.json(
        { error: "The price service is temporarily unavailable." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const data: unknown = await response.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(
      "BazarDor upstream request failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "The price service is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
