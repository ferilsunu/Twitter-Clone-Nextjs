import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  if (posts.length === 0) {
    return (
      <div className="py-12 px-4 text-center space-y-2">
        <p className="text-base font-bold text-neutral-900 dark:text-white">
          No posts yet
        </p>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto">
          When posts are published, they will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
