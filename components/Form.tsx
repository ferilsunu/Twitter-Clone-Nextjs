import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsImage, BsEmojiSmile, BsCalendarEvent, BsGeoAlt } from 'react-icons/bs';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (!body.trim()) return;

    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body });

      toast.success(isComment ? 'Reply posted' : 'Post published');
      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 sm:px-5 sm:py-4 transition-colors">
      {currentUser ? (
        <div className="flex gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <Avatar userId={currentUser.id} />
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              rows={isComment ? 2 : 3}
              className="
                w-full 
                bg-transparent 
                resize-none 
                outline-none 
                text-base 
                sm:text-lg 
                placeholder-neutral-500 
                text-neutral-900 
                dark:text-white 
                disabled:opacity-60
                leading-relaxed
              "
              placeholder={placeholder}
            />

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
              {/* Media Action Icons */}
              <div className="flex items-center gap-1 sm:gap-2 -ml-2 text-sky-500">
                <button
                  type="button"
                  title="Media"
                  className="p-2 rounded-full hover:bg-sky-500/10 active:scale-90 transition"
                  onClick={() => toast('Image upload coming soon!', { icon: '📸' })}
                >
                  <BsImage size={18} />
                </button>
                <button
                  type="button"
                  title="Emoji"
                  className="p-2 rounded-full hover:bg-sky-500/10 active:scale-90 transition"
                  onClick={() => setBody((prev) => prev + ' 😊')}
                >
                  <BsEmojiSmile size={18} />
                </button>
                <button
                  type="button"
                  title="Schedule"
                  className="p-2 rounded-full hover:bg-sky-500/10 active:scale-90 transition hidden sm:block"
                >
                  <BsCalendarEvent size={18} />
                </button>
                <button
                  type="button"
                  title="Location"
                  className="p-2 rounded-full hover:bg-sky-500/10 active:scale-90 transition hidden sm:block"
                >
                  <BsGeoAlt size={18} />
                </button>
              </div>

              {/* Submit Post Button */}
              <button
                disabled={isLoading || !body.trim()}
                onClick={onSubmit}
                className="
                  bg-sky-500 
                  hover:bg-sky-600 
                  disabled:opacity-50 
                  disabled:cursor-not-allowed
                  text-white 
                  font-bold 
                  text-sm 
                  px-5 
                  py-2 
                  rounded-full 
                  shadow-sm 
                  active:scale-95 
                  transition
              ">
                {isLoading ? 'Posting...' : isComment ? 'Reply' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 px-3 text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Join the conversation
          </h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            Log in or create an account to share posts, reply, like, and follow people.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button label="Sign in" onClick={loginModal.onOpen} />
            <Button label="Create account" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
