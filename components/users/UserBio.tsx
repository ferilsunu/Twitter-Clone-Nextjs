import { useMemo, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'likes'>('posts');

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt]);

  const isSelf = currentUser?.id === userId;

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* Top Action Button Row (aligned right next to avatar) */}
      <div className="flex justify-end px-4 pt-3 pb-1">
        {isSelf ? (
          <button
            onClick={editModal.onOpen}
            className="
              font-bold 
              text-sm 
              px-5 
              py-1.5 
              rounded-full 
              border 
              border-neutral-300 
              dark:border-neutral-700 
              text-neutral-900 
              dark:text-white 
              hover:bg-neutral-100 
              dark:hover:bg-neutral-800 
              active:scale-95 
              transition
          ">
            Edit profile
          </button>
        ) : (
          <button
            onClick={toggleFollow}
            className={`
              font-bold 
              text-sm 
              px-5 
              py-1.5 
              rounded-full 
              transition 
              active:scale-95
              ${isFollowing
                ? 'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                : 'bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90'
              }
            `}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>

      {/* User Info Details */}
      <div className="mt-8 sm:mt-10 px-4 sm:px-6">
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {fetchedUser?.name}
          </h2>
          <p className="text-neutral-500 text-sm">
            @{fetchedUser?.username}
          </p>
        </div>

        {/* Bio */}
        {fetchedUser?.bio && (
          <p className="mt-3 text-neutral-800 dark:text-neutral-200 text-[15px] leading-relaxed break-words whitespace-pre-line">
            {fetchedUser.bio}
          </p>
        )}

        {/* Joined Date */}
        <div className="flex items-center gap-1.5 mt-3 text-neutral-500 text-sm">
          <BiCalendar size={18} />
          <span>Joined {createdAt}</span>
        </div>

        {/* Follower Stats */}
        <div className="flex items-center gap-5 mt-3.5 pb-4 text-sm">
          <div className="flex items-center gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-neutral-900 dark:text-white">
              {fetchedUser?.followingIds?.length || 0}
            </span>
            <span className="text-neutral-500">Following</span>
          </div>
          <div className="flex items-center gap-1 hover:underline cursor-pointer">
            <span className="font-bold text-neutral-900 dark:text-white">
              {fetchedUser?.followersCount || 0}
            </span>
            <span className="text-neutral-500">Followers</span>
          </div>
        </div>
      </div>

      {/* Profile Interactive Tabs */}
      <div className="flex border-t border-neutral-200 dark:border-neutral-800 mt-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`
            flex-1 
            py-3.5 
            text-center 
            text-sm 
            font-bold 
            transition 
            hover:bg-neutral-100/60 
            dark:hover:bg-neutral-800/40 
            relative
            ${activeTab === 'posts' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}
          `}
        >
          <span>Posts</span>
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('replies')}
          className={`
            flex-1 
            py-3.5 
            text-center 
            text-sm 
            font-bold 
            transition 
            hover:bg-neutral-100/60 
            dark:hover:bg-neutral-800/40 
            relative
            ${activeTab === 'replies' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}
          `}
        >
          <span>Replies</span>
          {activeTab === 'replies' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('likes')}
          className={`
            flex-1 
            py-3.5 
            text-center 
            text-sm 
            font-bold 
            transition 
            hover:bg-neutral-100/60 
            dark:hover:bg-neutral-800/40 
            relative
            ${activeTab === 'likes' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}
          `}
        >
          <span>Likes</span>
          {activeTab === 'likes' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserBio;