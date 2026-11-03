import { asRecord, fetchApi, finiteNumber, readArray } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { Category } from "./types";

function normalizeCategory(value: unknown): Category | null {
  const item = asRecord(value);
  if (!item) return null;

  const id = String(item.id ?? item._id ?? item.slug ?? item.category ?? "");
  const nameBn = String(
    item.nameBn ?? item.name ?? item.categoryNameBn ?? "",
  ).trim();

  if (!id || !nameBn) return null;

  const icon = item.icon ?? item.categoryIcon;
  const productCount = finiteNumber(item.productCount ?? item.count);

  return {
    id,
    slug: String(item.slug ?? id),
    nameBn,
    icon: typeof icon === "string" ? icon : undefined,
    productCount,
  };
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await fetchApi(API_ENDPOINTS.categories, signal);
  return readArray(response, "categories").flatMap((value) => {
    const category = normalizeCategory(value);
    if (!category) {
      console.warn("Skipping an invalid category returned by the API.");
      return [];
    }
    return [category];
  });
}
