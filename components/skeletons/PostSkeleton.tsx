import React from 'react';

export const PostSkeleton: React.FC = () => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-4 sm:px-5 animate-pulse">
      <div className="flex gap-3 sm:gap-3.5">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-shrink-0" />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0 space-y-3 pt-0.5">
          {/* User info row */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-28 sm:w-36" />
            <div className="h-3 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md w-20 hidden sm:block" />
            <div className="h-3 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-md w-12" />
          </div>

          {/* Tweet lines */}
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md w-5/6" />
            <div className="h-4 bg-neutral-200/80 dark:bg-neutral-800/80 rounded-md w-2/3" />
          </div>

          {/* Action row placeholder */}
          <div className="flex items-center justify-between max-w-md pt-1 -ml-1 text-neutral-300 dark:text-neutral-700">
            <div className="h-4 w-12 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            <div className="h-4 w-12 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            <div className="h-4 w-12 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            <div className="h-4 w-8 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostFeedSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostSkeleton;
