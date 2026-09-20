import { BsTwitter, BsBell } from "react-icons/bs";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400">
          <BsBell size={28} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          Nothing to see here — yet
        </h3>
        <p className="text-neutral-500 text-sm max-w-sm">
          From likes to reposts and a whole lot more, this is where all the action about your posts and account happens.
        </p>
      </div>
    );
  }
  
  return ( 
    <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/80">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div 
          key={notification.id} 
          className="flex items-start gap-4 p-4 sm:p-5 hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40 transition cursor-pointer"
        >
          <div className="pt-0.5 text-sky-500 flex-shrink-0">
            <BsTwitter size={24} />
          </div>
          <p className="text-neutral-900 dark:text-neutral-100 text-[15px] leading-relaxed">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;