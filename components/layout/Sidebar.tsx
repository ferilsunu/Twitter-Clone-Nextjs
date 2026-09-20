import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill, BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';
import useTheme from '@/hooks/useTheme';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

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
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  const isDark = theme === 'dark';
  const ThemeIcon = isDark ? BsSunFill : BsMoonFill;
  const themeLabel = isDark ? 'Light mode' : 'Dark mode';

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href} 
              icon={item.icon} 
              label={item.label}
            />
          ))}
          <SidebarItem
            onClick={toggleTheme}
            icon={ThemeIcon}
            label={themeLabel}
          />
          {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
