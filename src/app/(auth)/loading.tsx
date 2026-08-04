export default function AuthLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-cream-dark shadow-card animate-pulse space-y-4">
        <div className="h-8 bg-cream/60 rounded-lg w-2/3 mx-auto" />
        <div className="h-4 bg-cream/40 rounded w-1/2 mx-auto" />
        <div className="h-12 bg-cream/50 rounded-xl mt-6" />
        <div className="h-12 bg-cream/50 rounded-xl" />
        <div className="h-12 bg-green-900/20 rounded-xl mt-4" />
      </div>
    </div>
  );
}
