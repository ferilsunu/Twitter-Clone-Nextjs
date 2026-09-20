import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-200 dark:border-neutral-800 p-5 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-10 transition-colors">
      <div className="flex flex-row items-center gap-3">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            size={20} 
            className="
              text-neutral-900 
              dark:text-white
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className="text-neutral-900 dark:text-white text-xl font-bold">
          {label}
        </h1>
      </div>
    </div>
  );
}

export default Header;
