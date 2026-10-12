const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export type PriceChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  productCount: number;
};

type ApiResponse<T> = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: T;
  products?: T;
  categories?: T;
  product?: T;
  category?: T;
  result?: T;
};

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
}

function unwrapData<T>(response: unknown): T {
  let result = response;

  for (let i = 0; i < 5; i++) {
    if (Array.isArray(result)) {
      return result as T;
    }

    if (result === null || typeof result !== "object") {
      return result as T;
    }

    const data = result as ApiResponse<unknown>;

    if (data.products !== undefined) {
      result = data.products;
      continue;
    }

    if (data.categories !== undefined) {
      result = data.categories;
      continue;
    }

    if (data.product !== undefined) {
      result = data.product;
      continue;
    }

    if (data.category !== undefined) {
      result = data.category;
      continue;
    }

    if (data.data !== undefined) {
      result = data.data;
      continue;
    }

    if (data.result !== undefined) {
      result = data.result;
      continue;
    }

    return result as T;
  }

  return result as T;
}

function normalizeProduct(value: unknown): Product | null {
  if (value === null || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  const id = Number(item.id ?? item._id);
  const nameBn = String(
    item.nameBn ?? item.name ?? item.title ?? item.productName ?? ""
  );

  if (!Number.isFinite(id) || !nameBn) {
    return null;
  }

  const changeValue =
    item.change !== null && typeof item.change === "object"
      ? (item.change as Record<string, unknown>)
      : {};

  const direction = String(changeValue.dir ?? "flat");

  const marketsValue = Array.isArray(item.markets) ? item.markets : [];

  const markets: MarketPrice[] = marketsValue.flatMap((market) => {
    if (market === null || typeof market !== "object") {
      return [];
    }

    const entry = market as Record<string, unknown>;

    return [
      {
        market: String(entry.market ?? entry.name ?? "স্থানীয় বাজার"),
        division: String(entry.division ?? ""),
        min: Number(entry.min ?? 0),
        max: Number(entry.max ?? 0),
      },
    ];
  });

  return {
    id,
    slug: String(item.slug ?? id),
    nameBn,
    category: String(item.category ?? item.categoryId ?? ""),
    categoryNameBn: String(
      item.categoryNameBn ?? item.categoryName ?? item.category ?? ""
    ),
    categoryIcon: String(item.categoryIcon ?? "🛒"),
    unit: String(item.unit ?? "kg"),
    image: String(item.image ?? item.imageUrl ?? "🛒"),
    today: Number(item.today ?? item.price ?? item.currentPrice ?? 0),
    yesterday: Number(item.yesterday ?? 0),
    lastWeek: Number(item.lastWeek ?? 0),
    lastMonth: Number(item.lastMonth ?? 0),
    change: {
      dir:
        direction === "up" || direction === "down"
          ? direction
          : "flat",
      pct: Number(changeValue.pct ?? 0),
    },
    markets,
  };
}

function normalizeCategory(value: unknown): Category | null {
  if (value === null || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  const id = String(item.id ?? item.slug ?? item.category ?? "");
  const nameBn = String(
    item.nameBn ?? item.name ?? item.categoryNameBn ?? ""
  );

  if (!id || !nameBn) {
    return null;
  }

  return {
    id,
    slug: String(item.slug ?? id),
    nameBn,
    icon: String(item.icon ?? item.categoryIcon ?? "🛒"),
    productCount: Number(item.productCount ?? item.count ?? 0),
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchApi<unknown>("/products");
  const data = unwrapData<unknown>(response);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeProduct)
    .filter((product): product is Product => product !== null);
}

export async function getProductById(
  idOrSlug: string | number
): Promise<Product | null> {
  const products = await getProducts();

  const product = products.find(
    (item) =>
      item.slug === String(idOrSlug) ||
      String(item.id) === String(idOrSlug)
  );

  if (product) {
    return product;
  }

  if (!/^\d+$/.test(String(idOrSlug))) {
    return null;
  }

  try {
    const response = await fetchApi<unknown>(
      `/products/${encodeURIComponent(String(idOrSlug))}`
    );

    const data = unwrapData<unknown>(response);

    return normalizeProduct(data);
  } catch {
    return null;
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const endpoint = `/products?category=${encodeURIComponent(category)}`;
  const response = await fetchApi<unknown>(endpoint);
  const data = unwrapData<unknown>(response);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeProduct)
    .filter((product): product is Product => product !== null);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetchApi<unknown>("/categories");
  const data = unwrapData<unknown>(response);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(normalizeCategory)
    .filter((category): category is Category => category !== null);
}

export async function getCategoryById(
  id: string
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find(
      (category) => category.id === id || category.slug === id
    ) ?? null
  );
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("bn-BD")}`;
}

export function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
}