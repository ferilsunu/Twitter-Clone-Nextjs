import { useRouter } from "next/router";
import Head from "next/head";

import useUser from "@/hooks/useUser";
import usePosts from "@/hooks/usePosts";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading: isUserLoading } = useUser(userId as string);
  const { data: userPosts = [] } = usePosts(userId as string);

  if (isUserLoading || !fetchedUser) {
    return (
      <>
        <Head>
          <title>Profile / Twitter</title>
        </Head>
        <ProfileSkeleton />
      </>
    );
  }

  const postCount = userPosts.length;
  const subtitle = `${postCount} ${postCount === 1 ? 'post' : 'posts'}`;

  return (
    <>
      <Head>
        <title>{fetchedUser?.name ? `${fetchedUser.name} (@${fetchedUser.username}) / Twitter` : 'Profile / Twitter'}</title>
      </Head>
      <Header showBackArrow label={fetchedUser?.name || 'Profile'} subtitle={subtitle} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;