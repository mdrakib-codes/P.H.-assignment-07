import { asRecord, fetchApi, finiteNumber, readArray } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { MarketPrice, PriceChange, Product } from "./types";

function normalizeProduct(value: unknown): Product | null {
  const item = asRecord(value);
  if (!item) return null;

  const id = String(item.id ?? item._id ?? "");
  const nameBn = String(
    item.nameBn ?? item.name ?? item.title ?? item.productName ?? "",
  ).trim();

  if (!id || !nameBn) return null;

  const changeRecord = asRecord(item.change);
  const direction = changeRecord?.dir;
  const change: PriceChange | undefined =
    direction === "up" || direction === "down" || direction === "flat"
      ? { dir: direction, pct: finiteNumber(changeRecord?.pct) }
      : undefined;

  const markets: MarketPrice[] = Array.isArray(item.markets)
    ? item.markets.flatMap((value) => {
        const market = asRecord(value);
        const min = finiteNumber(market?.min);
        const max = finiteNumber(market?.max);
        if (!market || min === undefined || max === undefined) return [];

        const marketName = market.market ?? market.name;
        if (typeof marketName !== "string" || !marketName.trim()) return [];

        return [
          {
            market: marketName,
            division:
              typeof market.division === "string" ? market.division : undefined,
            min,
            max,
          },
        ];
      })
    : [];

  const today = finiteNumber(
    item.today ?? item.price ?? item.currentPrice,
  );
  const yesterday = finiteNumber(item.yesterday);
  const lastWeek = finiteNumber(item.lastWeek);
  const lastMonth = finiteNumber(item.lastMonth);
  const image = item.image ?? item.imageUrl;
  const categoryIcon = item.categoryIcon;
  const categoryNameBn = item.categoryNameBn ?? item.categoryName;

  return {
    id,
    slug: String(item.slug ?? id),
    nameBn,
    category: String(item.category ?? item.categoryId ?? ""),
    categoryNameBn:
      typeof categoryNameBn === "string" ? categoryNameBn : undefined,
    categoryIcon:
      typeof categoryIcon === "string" ? categoryIcon : undefined,
    unit: typeof item.unit === "string" ? item.unit : undefined,
    image: typeof image === "string" ? image : undefined,
    today,
    yesterday,
    lastWeek,
    lastMonth,
    change,
    markets,
  };
}

function normalizeProducts(values: unknown[], resource: string): Product[] {
  return values.flatMap((value) => {
    const product = normalizeProduct(value);
    if (!product) {
      console.warn(`Skipping an invalid product returned by the ${resource} endpoint.`);
      return [];
    }
    return [product];
  });
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetchApi(API_ENDPOINTS.products, signal);
  return normalizeProducts(readArray(response, "products"), "products");
}

export async function getProductsByCategory(
  category: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  const response = await fetchApi(
    API_ENDPOINTS.productsByCategory(category),
    signal,
  );
  return normalizeProducts(readArray(response, "category products"), "category products");
}

export async function getProductById(
  idOrSlug: string | number,
  signal?: AbortSignal,
): Promise<Product | null> {
  const products = await getProducts(signal);
  const identifier = String(idOrSlug);

  return (
    products.find(
      (product) => product.slug === identifier || product.id === identifier,
    ) ?? null
  );
}
