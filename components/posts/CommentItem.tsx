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

    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <div 
      className="
        border-b-[1px] 
        border-neutral-200 
        dark:border-neutral-800 
        p-5 
        hover:bg-neutral-100/60 
        dark:hover:bg-neutral-900/60 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div className="w-full">
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-neutral-900 
                dark:text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-400 dark:text-neutral-500 text-sm">
              · {createdAt}
            </span>
          </div>
          <div className="text-neutral-800 dark:text-neutral-200 mt-1 break-words">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem;
