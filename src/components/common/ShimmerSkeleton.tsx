import React from 'react';

interface ShimmerBlockProps {
  className?: string;
  variant?: 'light' | 'subtle' | 'dark' | 'blue';
  rounded?: string;
}

export const ShimmerBlock: React.FC<ShimmerBlockProps> = ({
  className = 'h-4 w-full',
  variant = 'light',
  rounded = 'rounded-md',
}) => {
  const variantClass = 
    variant === 'dark' 
      ? 'animate-shimmer-dark' 
      : variant === 'blue' 
      ? 'animate-shimmer-blue' 
      : variant === 'subtle' 
      ? 'animate-shimmer-subtle' 
      : 'animate-shimmer';

  return (
    <div
      className={`${rounded} ${variantClass} ${className}`}
      aria-hidden="true"
    />
  );
};

export const SkeletonMetricCard: React.FC<{ variant?: 'default' | 'highlight' }> = ({ variant = 'default' }) => {
  return (
    <div className={`p-4 rounded-xl border ${variant === 'highlight' ? 'bg-blue-950/20 border-blue-900/40' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
      <div className="flex items-center justify-between">
        <ShimmerBlock className="h-3.5 w-24" />
        <ShimmerBlock className="h-4 w-4" rounded="rounded-full" />
      </div>
      <ShimmerBlock className="h-7 w-36" />
      <div className="flex items-center gap-2 pt-1">
        <ShimmerBlock className="h-4 w-16" rounded="rounded-full" />
        <ShimmerBlock className="h-3 w-20" />
      </div>
    </div>
  );
};

export const SkeletonTransactionRow: React.FC = () => {
  return (
    <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <ShimmerBlock className="w-10 h-10 shrink-0" rounded="rounded-xl" />
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <ShimmerBlock className="h-4 w-32 sm:w-44" />
            <ShimmerBlock className="h-4 w-14" rounded="rounded-full" />
          </div>
          <ShimmerBlock className="h-3 w-28 sm:w-36" />
        </div>
      </div>
      <div className="text-right space-y-1.5 shrink-0">
        <ShimmerBlock className="h-4 w-20 sm:w-28 ml-auto" />
        <ShimmerBlock className="h-3 w-16 sm:w-20 ml-auto" />
      </div>
    </div>
  );
};

export const SkeletonTransactionTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-2">
          <ShimmerBlock className="h-5 w-48" />
          <ShimmerBlock className="h-3.5 w-72" />
        </div>
        <div className="flex items-center gap-2">
          <ShimmerBlock className="h-9 w-28" rounded="rounded-xl" />
          <ShimmerBlock className="h-9 w-24" rounded="rounded-xl" />
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-2">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>

      {/* Search & Filter Controls Skeleton */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <ShimmerBlock className="h-10 flex-1 min-w-[200px]" rounded="rounded-xl" />
        <ShimmerBlock className="h-10 w-28" rounded="rounded-xl" />
        <ShimmerBlock className="h-10 w-28" rounded="rounded-xl" />
      </div>

      {/* Transaction Rows Skeleton */}
      <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, idx) => (
          <SkeletonTransactionRow key={idx} />
        ))}
      </div>
    </div>
  );
};

export const SkeletonOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Quick Action Strip Skeleton */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShimmerBlock className="w-10 h-10" rounded="rounded-full" />
          <div className="space-y-1.5">
            <ShimmerBlock className="h-4 w-40" />
            <ShimmerBlock className="h-3 w-64" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShimmerBlock className="h-8 w-24" rounded="rounded-xl" />
          <ShimmerBlock className="h-8 w-24" rounded="rounded-xl" />
          <ShimmerBlock className="h-8 w-24" rounded="rounded-xl" />
        </div>
      </div>

      {/* Main Portfolio / Balance Banner Skeleton */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShimmerBlock className="h-4 w-28" variant="dark" rounded="rounded-full" />
              <ShimmerBlock className="h-4 w-20" variant="dark" rounded="rounded-full" />
            </div>
            <ShimmerBlock className="h-10 w-64 sm:w-80" variant="dark" />
            <ShimmerBlock className="h-4 w-48" variant="dark" />
          </div>
          <div className="flex items-center gap-3">
            <ShimmerBlock className="h-11 w-32" variant="dark" rounded="rounded-xl" />
            <ShimmerBlock className="h-11 w-32" variant="dark" rounded="rounded-xl" />
          </div>
        </div>

        {/* 4 Inner KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-800/50 space-y-2">
            <ShimmerBlock className="h-3 w-20" variant="dark" />
            <ShimmerBlock className="h-5 w-28" variant="dark" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/50 space-y-2">
            <ShimmerBlock className="h-3 w-20" variant="dark" />
            <ShimmerBlock className="h-5 w-28" variant="dark" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/50 space-y-2">
            <ShimmerBlock className="h-3 w-20" variant="dark" />
            <ShimmerBlock className="h-5 w-28" variant="dark" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/50 space-y-2">
            <ShimmerBlock className="h-3 w-20" variant="dark" />
            <ShimmerBlock className="h-5 w-28" variant="dark" />
          </div>
        </div>
      </div>

      {/* 4 Core Financial Pillar Bento Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>

      {/* Transaction History Section Skeleton */}
      <SkeletonTransactionTable rows={4} />
    </div>
  );
};

export const SkeletonRoute: React.FC = () => {
  return (
    <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShimmerBlock className="w-8 h-8" rounded="rounded-lg" />
          <div className="space-y-1">
            <ShimmerBlock className="h-4 w-32" />
            <ShimmerBlock className="h-3 w-24" />
          </div>
        </div>
        <ShimmerBlock className="h-5 w-16" rounded="rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
        <ShimmerBlock className="h-8" rounded="rounded-lg" />
        <ShimmerBlock className="h-8" rounded="rounded-lg" />
        <ShimmerBlock className="h-8" rounded="rounded-lg" />
      </div>
    </div>
  );
};

export const SkeletonSavingsVault: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <ShimmerBlock className="h-6 w-48" />
          <ShimmerBlock className="h-8 w-28" rounded="rounded-xl" />
        </div>
        <ShimmerBlock className="h-64 w-full" rounded="rounded-xl" />
      </div>
    </div>
  );
};

export const SkeletonTraceability: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <ShimmerBlock className="h-6 w-56" />
        <ShimmerBlock className="h-72 w-full" rounded="rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <ShimmerBlock className="h-12" rounded="rounded-xl" />
          <ShimmerBlock className="h-12" rounded="rounded-xl" />
          <ShimmerBlock className="h-12" rounded="rounded-xl" />
          <ShimmerBlock className="h-12" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonDustGuard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <ShimmerBlock className="h-6 w-44" />
          <ShimmerBlock className="h-9 w-32" rounded="rounded-xl" />
        </div>
        <div className="space-y-3">
          <ShimmerBlock className="h-14 w-full" rounded="rounded-xl" />
          <ShimmerBlock className="h-14 w-full" rounded="rounded-xl" />
          <ShimmerBlock className="h-14 w-full" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonCybersecurity: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonMetricCard />
        <SkeletonMetricCard />
        <SkeletonMetricCard />
      </div>
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <ShimmerBlock className="h-6 w-52" />
          <ShimmerBlock className="h-5 w-24" rounded="rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShimmerBlock className="h-44 w-full" rounded="rounded-xl" />
          <ShimmerBlock className="h-44 w-full" rounded="rounded-xl" />
        </div>
      </div>
    </div>
  );
};
