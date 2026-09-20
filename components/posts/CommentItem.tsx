import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user?.id}`);
  }, [router, data.user?.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: false });
  }, [data.createdAt]);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 sm:px-5 sm:py-3.5 hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40 transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar userId={data.user?.id} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 text-sm">
            <span
              onClick={goToUser}
              className="
                font-bold 
                text-neutral-900 
                dark:text-white 
                hover:underline 
                cursor-pointer 
                truncate
            ">
              {data.user?.name}
            </span>
            <span
              onClick={goToUser}
              className="
                text-neutral-500 
                truncate 
                cursor-pointer
                hidden 
                sm:inline
            ">
              @{data.user?.username}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">·</span>
            <span className="text-neutral-500 text-xs sm:text-sm whitespace-nowrap">
              {createdAt}
            </span>
          </div>

          <p className="text-neutral-900 dark:text-neutral-100 text-[14.5px] sm:text-[15px] leading-relaxed break-words whitespace-pre-line select-text">
            {data.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
