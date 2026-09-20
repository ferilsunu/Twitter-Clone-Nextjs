import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div className="relative">
      {/* Cover Banner */}
      <div className="h-36 sm:h-48 md:h-52 w-full relative bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 overflow-hidden">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Banner"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </div>

      {/* Overlapping Avatar */}
      <div className="absolute -bottom-14 sm:-bottom-18 left-4 sm:left-6 z-10">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;