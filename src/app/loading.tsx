export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F8FAF5] p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-20 rounded-2xl bg-gray-200" />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="h-72 rounded-3xl bg-gray-200 sm:h-96" />

          <div className="space-y-5 rounded-3xl bg-white p-6">
            <div className="h-5 w-1/3 rounded bg-gray-200" />
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-20 rounded-2xl bg-gray-200" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl bg-white">
              <div className="h-36 bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-6 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}