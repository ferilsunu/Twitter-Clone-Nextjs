import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill, BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';

import useCurrentUser from '@/hooks/useCurrentUser';
import useTheme from '@/hooks/useTheme';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import Avatar from '../Avatar';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: currentUser?.id ? `/users/${currentUser.id}` : undefined,
      auth: true,
    },
  ];

  const isDark = theme === 'dark';
  const ThemeIcon = isDark ? BsSunFill : BsMoonFill;
  const themeLabel = isDark ? 'Light mode' : 'Dark mode';

  return (
    <div className="flex flex-col justify-between h-full py-4 select-none">
      {/* Top Nav Rail */}
      <div className="flex flex-col items-center xl:items-start space-y-1">
        <SidebarLogo />

        {items.map((item) => (
          <SidebarItem
            key={item.label}
            alert={item.alert}
            auth={item.auth}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}

        {/* Theme Switcher Item */}
        <SidebarItem
          onClick={toggleTheme}
          icon={ThemeIcon}
          label={themeLabel}
        />

        {/* Tweet / Post Button */}
        <div className="w-full pt-3">
          <SidebarTweetButton />
        </div>
      </div>

      {/* Bottom User Card / Logout */}
      {currentUser && (
        <div 
          onClick={() => signOut()}
          title="Click to Logout"
          className="
            flex 
            items-center 
            justify-between 
            gap-3 
            p-2.5 
            xl:p-3 
            rounded-full 
            hover:bg-neutral-100 
            dark:hover:bg-neutral-900 
            cursor-pointer 
            transition 
            mt-auto
            w-full
        ">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar userId={currentUser.id} />
            <div className="hidden xl:flex flex-col min-w-0">
              <span className="text-neutral-900 dark:text-white font-bold text-sm truncate">
                {currentUser.name}
              </span>
              <span className="text-neutral-500 text-xs truncate">
                @{currentUser.username}
              </span>
            </div>
          </div>
          <div className="hidden xl:block text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <BiLogOut size={18} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
