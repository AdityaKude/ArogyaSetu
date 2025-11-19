export function CardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm animate-pulse">
      <div className="h-12 w-12 rounded-xl bg-sky-100 mb-4" />
      <div className="h-4 bg-sky-100 rounded w-3/4 mb-2" />
      <div className="h-4 bg-sky-100 rounded w-full" />
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border bg-white shadow-lg animate-pulse">
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-t-2xl p-6">
        <div className="h-6 bg-sky-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-sky-200 rounded w-2/3" />
      </div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-sky-100 rounded w-1/4" />
        <div className="h-6 bg-sky-100 rounded w-full" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-sky-50 rounded-lg" />
          ))}
        </div>
        <div className="h-10 bg-sky-200 rounded w-full mt-6" />
      </div>
    </div>
  );
}


