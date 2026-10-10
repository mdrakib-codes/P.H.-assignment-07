
const API_BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getProducts() {
  return fetchAPI("/products");
}

export async function getProductById(id: string | number) {
  return fetchAPI(`/products/${id}`);
}

export async function getCategories() {
  return fetchAPI("/categories");
}

