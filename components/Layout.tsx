import React from 'react';

import FollowBar from "@/components/layout/FollowBar";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-150">
      <div className="container min-h-screen mx-auto max-w-7xl flex justify-center">
        {/* Left Sidebar (Desktop & Tablet) */}
        <aside className="hidden md:flex flex-col flex-shrink-0 w-[88px] xl:w-[275px] h-screen sticky top-0 px-2 xl:px-4 z-20">
          <Sidebar />
        </aside>

        {/* Center Main Feed Column */}
        <main className="w-full max-w-[600px] min-h-screen border-x-0 md:border-x border-neutral-200 dark:border-neutral-800 flex flex-col pb-20 md:pb-8">
          {children}
        </main>

        {/* Right Widget Rail (Desktop Only) */}
        <aside className="hidden lg:block flex-shrink-0 w-[320px] xl:w-[350px] pl-6 xl:pl-8 py-3">
          <FollowBar />
        </aside>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />
    </div>
  );
};

export default Layout;
