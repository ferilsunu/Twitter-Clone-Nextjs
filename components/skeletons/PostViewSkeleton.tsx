import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import PostSkeleton from './PostSkeleton';

export const PostViewSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex items-center gap-6">
        <BiArrowBack size={20} className="text-neutral-400" />
        <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>

      {/* Main Post skeleton */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 space-y-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-3 w-20 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-5 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>

        <div className="h-4 w-28 bg-neutral-200/60 dark:bg-neutral-800/60 rounded pt-2" />

        <div className="border-t border-b border-neutral-100 dark:border-neutral-800 py-3 flex items-center justify-around text-neutral-300 dark:text-neutral-700">
          <div className="h-4 w-10 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          <div className="h-4 w-10 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          <div className="h-4 w-10 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          <div className="h-4 w-10 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
        </div>
      </div>

      {/* Reply comments skeleton */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
};

export default PostViewSkeleton;
