import { useRouter } from "next/router";
import Head from "next/head";

import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import PostViewSkeleton from "@/components/skeletons/PostViewSkeleton";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <>
        <Head>
          <title>Post / Twitter</title>
        </Head>
        <PostViewSkeleton />
      </>
    );
  }

  return ( 
    <>
      <Head>
        <title>{fetchedPost?.user?.name ? `${fetchedPost.user.name} on Twitter: "${fetchedPost.body?.slice(0, 30)}..."` : 'Post / Twitter'}</title>
      </Head>
      <Header showBackArrow label="Post" />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Post your reply" />
      <div className="border-t border-neutral-100 dark:border-neutral-800">
        <CommentFeed comments={fetchedPost?.comments} />
      </div>
    </>
  );
};

export default PostView;