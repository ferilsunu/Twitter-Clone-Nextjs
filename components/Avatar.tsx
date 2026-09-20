import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  profileImage?: string | null;
  user?: Record<string, any>;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, profileImage, user }) => {
  const router = useRouter();

  // If profileImage is already provided, skip SWR query to prevent network spam
  const shouldFetchUser = !profileImage && !user?.profileImage && Boolean(userId);
  const { data: fetchedUser } = useUser(shouldFetchUser ? (userId as string) : "");

  const [hasError, setHasError] = useState(false);

  const finalImage = profileImage || user?.profileImage || fetchedUser?.profileImage;
  const targetUserId = userId || user?.id || fetchedUser?.id;

  useEffect(() => {
    setHasError(false);
  }, [finalImage]);

  const onClick = useCallback((event: any) => {
    event.stopPropagation();
    if (targetUserId) {
      router.push(`/users/${targetUserId}`);
    }
  }, [router, targetUserId]);

  const avatarSrc = hasError || !finalImage ? '/images/placeholder.png' : finalImage;

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-white dark:border-black shadow-md' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-11 w-11 sm:h-12 sm:w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        flex-shrink-0
        bg-neutral-200
        dark:bg-neutral-800
        overflow-hidden
      `}
    >
      <Image
        fill
        unoptimized
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        onClick={onClick}
        src={avatarSrc}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Avatar;