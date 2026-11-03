export const API_ENDPOINTS = {
  products: "/api/products",
  productsByCategory: (category: string) =>
    `/api/products?category=${encodeURIComponent(category)}`,
  categories: "/api/categories",
};
