import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PostFeedSkeleton } from './PostSkeleton';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header bar skeleton */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex items-center gap-6">
        <BiArrowBack size={20} className="text-neutral-400" />
        <div className="space-y-1.5 flex-1">
          <div className="h-5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded animate-pulse" />
        </div>
      </div>

      {/* Hero Banner skeleton */}
      <div className="relative">
        <div className="h-36 sm:h-48 md:h-52 w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        
        {/* Avatar skeleton */}
        <div className="absolute -bottom-14 sm:-bottom-18 left-4 sm:left-6 z-10">
          <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white dark:border-black bg-neutral-300 dark:bg-neutral-700 animate-pulse shadow-md" />
        </div>
      </div>

      {/* Bio & Details skeleton */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-end px-4 pt-3 pb-1">
          <div className="w-28 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>

        <div className="mt-8 sm:mt-10 px-4 sm:px-6 space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-44 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-28 bg-neutral-200/70 dark:bg-neutral-800/70 rounded animate-pulse" />
          </div>

          <div className="space-y-2 max-w-lg">
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="h-4 w-32 bg-neutral-200/60 dark:bg-neutral-800/60 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-5 pt-1 pb-4">
            <div className="h-4 w-24 bg-neutral-200/70 dark:bg-neutral-800/70 rounded animate-pulse" />
            <div className="h-4 w-24 bg-neutral-200/70 dark:bg-neutral-800/70 rounded animate-pulse" />
          </div>
        </div>

        {/* Profile Tabs skeleton */}
        <div className="flex border-t border-neutral-200 dark:border-neutral-800 mt-1">
          <div className="flex-1 py-3.5 flex justify-center">
            <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="flex-1 py-3.5 flex justify-center">
            <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="flex-1 py-3.5 flex justify-center">
            <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Profile Post Feed skeleton */}
      <PostFeedSkeleton count={3} />
    </div>
  );
};

export default ProfileSkeleton;
