export default function Loading() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-center mb-6">
        Your <span className="text-orange-600">Uploaded PDFs</span>
      </h1>

      <div className="max-w-md mx-auto mb-10">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800
                       bg-white dark:bg-gray-900 shadow-sm animate-pulse"
          >
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
