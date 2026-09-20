import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";

interface UseLikeProps {
  postId: string;
  userId?: string;
  likedIds?: string[];
}

const useLike = ({ postId, userId, likedIds = [] }: UseLikeProps) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const currentUserId = currentUser?.id;

  const serverHasLiked = useMemo(() => {
    return Boolean(currentUserId && likedIds.includes(currentUserId));
  }, [likedIds, currentUserId]);

  const [hasLiked, setHasLiked] = useState<boolean>(serverHasLiked);
  const [likesCount, setLikesCount] = useState<number>(likedIds.length);

  // Synchronize local optimistic state with server data or user changes
  useEffect(() => {
    setHasLiked(serverHasLiked);
    setLikesCount(likedIds.length);
  }, [serverHasLiked, likedIds.length]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const previousHasLiked = hasLiked;
    const previousLikesCount = likesCount;

    // 1. Instant optimistic UI update
    const newHasLiked = !previousHasLiked;
    const newLikesCount = newHasLiked ? previousLikesCount + 1 : Math.max(0, previousLikesCount - 1);

    setHasLiked(newHasLiked);
    setLikesCount(newLikesCount);

    // Optimistic update helper for posts list
    const updatePostsList = (posts: any[] | undefined) => {
      if (!Array.isArray(posts)) return posts;
      return posts.map((post) => {
        if (post.id !== postId) return post;
        const currentLikedIds: string[] = post.likedIds || [];
        let updatedLikedIds: string[];
        if (newHasLiked) {
          updatedLikedIds = currentLikedIds.includes(currentUserId)
            ? currentLikedIds
            : [...currentLikedIds, currentUserId];
        } else {
          updatedLikedIds = currentLikedIds.filter((id) => id !== currentUserId);
        }
        return {
          ...post,
          likedIds: updatedLikedIds,
        };
      });
    };

    // Optimistic update for single post
    const updateSinglePost = (post: any) => {
      if (!post || post.id !== postId) return post;
      const currentLikedIds: string[] = post.likedIds || [];
      let updatedLikedIds: string[];
      if (newHasLiked) {
        updatedLikedIds = currentLikedIds.includes(currentUserId)
          ? currentLikedIds
          : [...currentLikedIds, currentUserId];
      } else {
        updatedLikedIds = currentLikedIds.filter((id) => id !== currentUserId);
      }
      return {
        ...post,
        likedIds: updatedLikedIds,
      };
    };

    // Apply optimistic updates to SWR cache without refetching immediately
    mutate('/api/posts', updatePostsList, false);
    if (userId) {
      mutate(`/api/posts?userId=${userId}`, updatePostsList, false);
    }
    mutate(`/api/posts/${postId}`, updateSinglePost, false);

    try {
      if (previousHasLiked) {
        await axios.delete('/api/like', { data: { postId } });
      } else {
        await axios.post('/api/like', { postId });
      }

      // Revalidate in background to confirm consistency
      mutate('/api/posts');
      if (userId) {
        mutate(`/api/posts?userId=${userId}`);
      }
      mutate(`/api/posts/${postId}`);
    } catch (error) {
      // Rollback on failure
      setHasLiked(previousHasLiked);
      setLikesCount(previousLikesCount);
      mutate('/api/posts');
      if (userId) {
        mutate(`/api/posts?userId=${userId}`);
      }
      mutate(`/api/posts/${postId}`);
      toast.error('Could not update like. Please try again.');
    }
  }, [currentUser, currentUserId, hasLiked, likesCount, postId, userId, loginModal]);

  return {
    hasLiked,
    likesCount,
    toggleLike,
  };
};

export default useLike;
