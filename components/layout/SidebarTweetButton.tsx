import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick} className="w-full">
      {/* Tablet Circular Button */}
      <button 
        aria-label="Post Tweet"
        className="
          xl:hidden 
          rounded-full 
          h-12 
          w-12 
          p-3
          flex
          items-center
          justify-center 
          bg-sky-500 
          hover:bg-sky-600 
          active:scale-95
          shadow-md 
          shadow-sky-500/25 
          transition-all 
          cursor-pointer
          mx-auto
      ">
        <FaFeather size={20} className="text-white" />
      </button>

      {/* Desktop Full Pill Button */}
      <button 
        className="
          hidden 
          xl:flex 
          w-full 
          items-center 
          justify-center 
          py-3 
          px-6 
          rounded-full 
          bg-sky-500 
          hover:bg-sky-600 
          active:scale-[0.98] 
          shadow-md 
          shadow-sky-500/20 
          cursor-pointer 
          transition-all
      ">
        <span className="font-bold text-white text-base tracking-wide">
          Post
        </span>
      </button>
    </div>
  );
};

export default SidebarTweetButton;
