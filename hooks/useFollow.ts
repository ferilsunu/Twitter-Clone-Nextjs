import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const loginModal = useLoginModal();

  const serverIsFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const [isFollowing, setIsFollowing] = useState<boolean>(serverIsFollowing);

  useEffect(() => {
    setIsFollowing(serverIsFollowing);
  }, [serverIsFollowing]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const previousIsFollowing = isFollowing;
    const newIsFollowing = !previousIsFollowing;

    // Instant optimistic toggle
    setIsFollowing(newIsFollowing);

    // Optimistic SWR cache updates
    mutate(
      '/api/current',
      (curr: any) => {
        if (!curr) return curr;
        const currentFollowing: string[] = curr.followingIds || [];
        return {
          ...curr,
          followingIds: newIsFollowing
            ? [...currentFollowing, userId]
            : currentFollowing.filter((id) => id !== userId),
        };
      },
      false
    );

    mutate(
      `/api/users/${userId}`,
      (user: any) => {
        if (!user) return user;
        const currentFollowers = user.followersCount || 0;
        return {
          ...user,
          followersCount: newIsFollowing
            ? currentFollowers + 1
            : Math.max(0, currentFollowers - 1),
        };
      },
      false
    );

    try {
      if (previousIsFollowing) {
        await axios.delete('/api/follow', { data: { userId } });
      } else {
        await axios.post('/api/follow', { userId });
      }

      // Invalidate to ensure consistency
      mutate('/api/current');
      mutate(`/api/users/${userId}`);
      mutate('/api/users');
    } catch (error) {
      // Rollback on failure
      setIsFollowing(previousIsFollowing);
      mutate('/api/current');
      mutate(`/api/users/${userId}`);
      mutate('/api/users');
      toast.error('Could not update follow status');
    }
  }, [currentUser, isFollowing, userId, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
