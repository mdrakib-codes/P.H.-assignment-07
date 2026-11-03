export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div className="h-36 bg-gray-200 sm:h-44" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 rounded bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-7 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </>
  );
}
