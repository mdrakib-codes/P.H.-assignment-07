import CategoryDetails from "@/features/categories/components/CategoryDetails";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string | string[] }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const sort = Array.isArray(query.sort) ? query.sort[0] : query.sort;
  return <CategoryDetails slug={slug} sort={sort} />;
}
