export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F8FAF5] p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-48 rounded-3xl bg-emerald-100" />

        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="h-8 w-56 rounded bg-gray-200" />
          <div className="h-12 w-64 rounded-xl bg-gray-200" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl bg-white">
              <div className="h-36 bg-gray-200 sm:h-44" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-5 rounded bg-gray-200" />
                <div className="h-7 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}