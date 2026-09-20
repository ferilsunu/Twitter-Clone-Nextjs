import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';

import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFollow from '@/hooks/useFollow';
import Avatar from '../Avatar';

const FollowUserRow: React.FC<{ user: Record<string, any> }> = ({ user }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow } = useFollow(user.id);

  const isSelf = currentUser?.id === user.id;

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 px-3 -mx-3 rounded-xl transition cursor-pointer">
      <div 
        onClick={() => router.push(`/users/${user.id}`)}
        className="flex items-center gap-3 min-w-0 flex-1"
      >
        <Avatar userId={user.id} />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-neutral-900 dark:text-white font-bold text-sm truncate hover:underline">
              {user.name}
            </span>
          </div>
          <span className="text-neutral-500 text-xs truncate">
            @{user.username}
          </span>
        </div>
      </div>

      {!isSelf && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFollow();
          }}
          className={`
            text-xs 
            font-bold 
            px-4 
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
  );
};

const FollowBar = () => {
  const router = useRouter();
  const { data: users = [] } = useUsers();

  return (
    <div className="space-y-4">
      {/* Search Input Widget */}
      <div className="sticky top-0 z-10 pt-1 pb-3 bg-white dark:bg-black transition-colors">
        <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-full border border-transparent focus-within:border-sky-500 focus-within:bg-white dark:focus-within:bg-black focus-within:ring-1 focus-within:ring-sky-500 transition">
          <BiSearch size={18} className="absolute left-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent pl-11 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push('/search');
              }
            }}
          />
        </div>
      </div>

      {/* "Who to follow" Widget Card */}
      {users.length > 0 && (
        <div className="bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-4">
          <h2 className="text-neutral-900 dark:text-white text-lg font-bold tracking-tight mb-2">
            Who to follow
          </h2>
          <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {users.slice(0, 5).map((user: Record<string, any>) => (
              <FollowUserRow key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* "Trends for you" Widget Card */}
      <div className="bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
        <h2 className="text-neutral-900 dark:text-white text-lg font-bold tracking-tight">
          What&apos;s happening
        </h2>
        
        <div className="space-y-3 text-sm">
          <div className="hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 -mx-2 p-2 rounded-xl transition cursor-pointer">
            <p className="text-xs text-neutral-500">Technology · Trending</p>
            <p className="font-bold text-neutral-900 dark:text-white">#Nextjs14</p>
            <p className="text-xs text-neutral-500">48.2K posts</p>
          </div>

          <div className="hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 -mx-2 p-2 rounded-xl transition cursor-pointer">
            <p className="text-xs text-neutral-500">Web Development · Trending</p>
            <p className="font-bold text-neutral-900 dark:text-white">TypeScript & Tailwind</p>
            <p className="text-xs text-neutral-500">124.5K posts</p>
          </div>

          <div className="hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 -mx-2 p-2 rounded-xl transition cursor-pointer">
            <p className="text-xs text-neutral-500">AI & Engineering · Trending</p>
            <p className="font-bold text-neutral-900 dark:text-white">#OpenAI & Gemini</p>
            <p className="text-xs text-neutral-500">89.1K posts</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Copyright */}
      <footer className="px-3 text-xs text-neutral-400 space-y-1">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <a href="https://github.com/ferilsunu/Twitter-Clone-Nextjs" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <span>·</span>
          <a href="https://ferilsunu.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
          <span>·</span>
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Terms of Service</span>
        </div>
        <p className="pt-1">© 2026 Twitter Clone by Feril Sunu</p>
      </footer>
    </div>
  );
};

export default FollowBar;
