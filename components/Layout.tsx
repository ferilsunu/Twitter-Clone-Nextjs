import React from 'react';

import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-150">
      <div className="container min-h-screen mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 min-h-screen">
          <Sidebar />
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-200
              dark:border-neutral-800
          ">
            {children}
          </div>
          <FollowBar />
        </div>
     </div>
    </div>
  )
}

export default Layout;
