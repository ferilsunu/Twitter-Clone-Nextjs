import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  const isActive = href && router.pathname === href;

  return (
    <div 
      onClick={handleClick}
      className="
        group 
        flex 
        items-center 
        justify-center 
        xl:justify-start 
        w-full 
        cursor-pointer
    ">
      <div className={`
        relative 
        flex 
        items-center 
        gap-4 
        p-3 
        rounded-full 
        transition-all 
        duration-150
        group-hover:bg-neutral-100 
        dark:group-hover:bg-neutral-900
        group-active:scale-95
        ${isActive ? 'font-bold' : 'font-medium'}
      `}>
        <div className="relative flex items-center justify-center">
          <Icon 
            size={24} 
            className={`
              transition-colors 
              ${isActive ? 'text-sky-500' : 'text-neutral-900 dark:text-white group-hover:text-sky-500'}
            `} 
          />
          {alert && (
            <BsDot className="text-sky-500 absolute -top-4 -right-4 animate-pulse" size={48} />
          )}
        </div>
        <p className={`
          hidden 
          xl:block 
          text-lg 
          tracking-tight 
          ${isActive ? 'text-sky-500 font-bold' : 'text-neutral-900 dark:text-white group-hover:text-sky-500'}
        `}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;