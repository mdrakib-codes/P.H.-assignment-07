type EmptyStateProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
      <p className="font-bold text-gray-700">{title}</p>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
      {children}
    </div>
  );
}
