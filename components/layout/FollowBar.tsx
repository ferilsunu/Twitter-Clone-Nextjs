import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 transition-colors">
        <h2 className="text-neutral-900 dark:text-white text-xl font-bold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 items-center">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-neutral-900 dark:text-white font-semibold text-sm hover:underline cursor-pointer">{user.name}</p>
                <p className="text-neutral-500 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
