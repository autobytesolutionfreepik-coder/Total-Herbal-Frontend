export default function StorefrontLoading() {
  return (
    <div className="container-site section-py animate-pulse space-y-8">
      <div className="h-64 sm:h-96 bg-cream/60 rounded-3xl border border-cream-dark/60" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="h-64 bg-cream/40 rounded-2xl" />
        <div className="h-64 bg-cream/40 rounded-2xl" />
        <div className="h-64 bg-cream/40 rounded-2xl" />
        <div className="h-64 bg-cream/40 rounded-2xl" />
      </div>
    </div>
  );
}
