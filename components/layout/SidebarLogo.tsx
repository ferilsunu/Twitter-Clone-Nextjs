import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-sky-100 
        dark:hover:bg-sky-900 
        dark:hover:bg-opacity-30 
        cursor-pointer
        transition
    ">
      <BsTwitter size={28} className="text-sky-500" />
    </div>
  );
};

export default SidebarLogo;
