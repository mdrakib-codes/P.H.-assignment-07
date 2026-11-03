import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "@/features/products/components/ProductCard";
import type { Product } from "@/lib/api/types";

type ProductGridProps = {
  products: Product[];
  emptyTitle?: string;
};

export default function ProductGrid({
  products,
  emptyTitle = "এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।",
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
