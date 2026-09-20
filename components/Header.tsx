import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label, subtitle }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/85 dark:bg-black/85 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        {showBackArrow ? (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="
              p-2 
              -ml-2
              rounded-full 
              hover:bg-neutral-100 
              dark:hover:bg-neutral-800 
              transition 
              cursor-pointer 
              active:scale-90
          ">
            <BiArrowBack size={20} className="text-neutral-900 dark:text-white" />
          </button>
        ) : (
          <div className="md:hidden">
            <BsTwitter size={24} className="text-sky-500" />
          </div>
        )}
        
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white truncate">
            {label}
          </h1>
          {subtitle && (
            <p className="text-xs text-neutral-500 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
