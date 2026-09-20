import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BsHouseFill, BsBellFill, BsSunFill, BsMoonFill, BsDot } from 'react-icons/bs';
import { FaUser, FaFeather } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import useTheme from '@/hooks/useTheme';

const MobileNav = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const isDark = theme === 'dark';
  const ThemeIcon = isDark ? BsSunFill : BsMoonFill;

  const handleNav = useCallback((path?: string, requireAuth?: boolean) => {
    if (requireAuth && !currentUser) {
      return loginModal.onOpen();
    }
    if (path) {
      router.push(path);
    }
  }, [currentUser, loginModal, router]);

  const handleTweet = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push('/');
    // Scroll to composer or top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentUser, loginModal, router]);

  const currentPath = router.pathname;

  return (
    <>
      {/* Floating Action Button (FAB) on Mobile for Tweeting */}
      <button
        onClick={handleTweet}
        aria-label="Tweet"
        className="
          fixed 
          bottom-18 
          right-4 
          z-40 
          md:hidden 
          h-14 
          w-14 
          rounded-full 
          bg-sky-500 
          hover:bg-sky-600 
          active:scale-95 
          text-white 
          shadow-lg 
          shadow-sky-500/30 
          flex 
          items-center 
          justify-center 
          transition-transform
      ">
        <FaFeather size={20} />
      </button>

      {/* Fixed Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="
          fixed 
          bottom-0 
          left-0 
          right-0 
          z-40 
          md:hidden 
          h-14 
          bg-white/90 
          dark:bg-black/90 
          backdrop-blur-md 
          border-t 
          border-neutral-200 
          dark:border-neutral-800 
          flex 
          items-center 
          justify-around 
          px-3
      ">
        {/* Home */}
        <button
          onClick={() => handleNav('/')}
          className={`
            p-2.5 
            rounded-full 
            transition 
            active:scale-90
            ${currentPath === '/' ? 'text-sky-500' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'}
          `}
          title="Home"
        >
          <BsHouseFill size={24} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => handleNav('/notifications', true)}
          className={`
            p-2.5 
            rounded-full 
            transition 
            active:scale-90 
            relative
            ${currentPath === '/notifications' ? 'text-sky-500' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'}
          `}
          title="Notifications"
        >
          <BsBellFill size={22} />
          {currentUser?.hasNotification && (
            <BsDot className="text-sky-500 absolute -top-3 left-1 animate-pulse" size={48} />
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => handleNav(currentUser ? `/users/${currentUser.id}` : undefined, true)}
          className={`
            p-2.5 
            rounded-full 
            transition 
            active:scale-90
            ${currentPath.startsWith('/users') ? 'text-sky-500' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'}
          `}
          title="Profile"
        >
          <FaUser size={20} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2.5 
            rounded-full 
            text-neutral-700 
            dark:text-neutral-300 
            hover:text-neutral-900 
            dark:hover:text-white 
            transition 
            active:scale-90
          "
          title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          <ThemeIcon size={20} className={isDark ? "text-amber-400" : "text-neutral-700"} />
        </button>
      </nav>
    </>
  );
};

export default MobileNav;
