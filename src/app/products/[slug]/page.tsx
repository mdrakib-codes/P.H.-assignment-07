import ProductDetails from "@/features/products/components/ProductDetails";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}
