import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from 'react-icons/ai';
import { FiShare, FiMoreHorizontal } from 'react-icons/fi';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';
import Avatar from '../Avatar';
import FormattedText from '@/libs/formatText';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`);
  }, [router, data.user?.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const onShare = useCallback((ev: any) => {
    ev.stopPropagation();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/posts/${data.id}`);
      toast.success('Post link copied to clipboard!');
    }
  }, [data.id]);

  const onRetweet = useCallback((ev: any) => {
    ev.stopPropagation();
    toast('Reposting coming soon!', { icon: '🔁' });
  }, []);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: false });
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <article
      onClick={goToPost}
      className="
        border-b 
        border-neutral-200 
        dark:border-neutral-800 
        px-4 
        py-3.5 
        sm:px-5 
        sm:py-4
        hover:bg-neutral-50/70 
        dark:hover:bg-neutral-900/50 
        transition-colors 
        duration-150 
        cursor-pointer
    ">
      <div className="flex gap-3 sm:gap-3.5">
        {/* Author Avatar */}
        <div className="flex-shrink-0 pt-0.5">
          <Avatar userId={data.user?.id} />
        </div>

        {/* Post Content & Meta */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5 min-w-0 text-sm">
              <span
                onClick={goToUser}
                className="
                  font-bold 
                  text-neutral-900 
                  dark:text-white 
                  hover:underline 
                  truncate 
                  cursor-pointer
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

            <button 
              type="button" 
              className="p-1 rounded-full text-neutral-400 hover:text-sky-500 hover:bg-sky-500/10 transition -mr-1"
              onClick={(e) => {
                e.stopPropagation();
                onShare(e);
              }}
            >
              <FiMoreHorizontal size={16} />
            </button>
          </div>

          {/* Tweet Body Text */}
          <div className="text-neutral-900 dark:text-neutral-100 text-[15px] sm:text-[15.5px] leading-normal break-words whitespace-pre-line select-text">
            <FormattedText text={data.body} />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between max-w-md mt-3 -ml-2 text-neutral-500 text-xs sm:text-sm">
            {/* Reply */}
            <div
              className="
                group 
                flex 
                items-center 
                gap-1.5 
                hover:text-sky-500 
                cursor-pointer 
                transition
            ">
              <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition">
                <AiOutlineMessage size={18} />
              </div>
              <span className="text-xs">
                {data.comments?.length || 0}
              </span>
            </div>

            {/* Retweet */}
            <div
              onClick={onRetweet}
              className="
                group 
                flex 
                items-center 
                gap-1.5 
                hover:text-emerald-500 
                cursor-pointer 
                transition
            ">
              <div className="p-2 rounded-full group-hover:bg-emerald-500/10 transition">
                <AiOutlineRetweet size={18} />
              </div>
              <span className="text-xs">0</span>
            </div>

            {/* Like */}
            <div
              onClick={onLike}
              className={`
                group 
                flex 
                items-center 
                gap-1.5 
                cursor-pointer 
                transition
                ${hasLiked ? 'text-rose-500' : 'hover:text-rose-500'}
              `}
            >
              <div className={`p-2 rounded-full group-hover:bg-rose-500/10 transition ${hasLiked ? 'animate-heart' : ''}`}>
                <LikeIcon size={18} className={hasLiked ? 'text-rose-500' : ''} />
              </div>
              <span className={`text-xs ${hasLiked ? 'text-rose-500 font-semibold' : ''}`}>
                {data.likedIds?.length || 0}
              </span>
            </div>

            {/* Share */}
            <div
              onClick={onShare}
              className="
                group 
                flex 
                items-center 
                gap-1.5 
                hover:text-sky-500 
                cursor-pointer 
                transition
            ">
              <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition">
                <FiShare size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
