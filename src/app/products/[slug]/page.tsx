import { auth } from "@/lib/auth";
import ProductDetails from "@/features/products/components/ProductDetails";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    const productPath = `/products/${encodeURIComponent(slug)}`;
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(productPath)}`);
  }

  return <ProductDetails slug={slug} />;
}
