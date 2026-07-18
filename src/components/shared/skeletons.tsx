import React from "react";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 ${className || ""}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4 bg-white shadow-sm border border-neutral-100">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="container-site py-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="container-site py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar filter skeleton */}
      <div className="w-full md:w-64 flex flex-col gap-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      {/* Grid skeleton */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
