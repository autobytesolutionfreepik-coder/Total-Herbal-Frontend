export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background p-6 animate-pulse space-y-6">
      <div className="h-16 bg-cream/60 rounded-2xl border border-cream-dark/60" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="h-28 bg-cream/40 rounded-xl" />
        <div className="h-28 bg-cream/40 rounded-xl" />
        <div className="h-28 bg-cream/40 rounded-xl" />
        <div className="h-28 bg-cream/40 rounded-xl" />
      </div>
      <div className="h-96 bg-cream/30 rounded-2xl border border-cream-dark/60" />
    </div>
  );
}
