interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  secondary, 
  fullWidth, 
  onClick, 
  large, 
  disabled, 
  outline,
  type = "button"
}) => {
  return ( 
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-50
        disabled:cursor-not-allowed
        rounded-full
        font-bold
        tracking-tight
        transition-all
        duration-150
        active:scale-[0.97]
        border
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary 
          ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200' 
          : 'bg-sky-500 text-white border-sky-500 hover:bg-sky-600 shadow-sm shadow-sky-500/20'
        }
        ${large ? 'text-base px-6 py-3' : 'text-sm px-4 py-2'}
        ${outline ? 'bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 shadow-none' : ''}
      `}
    >
      {label}
    </button>
  );
};
 
export default Button;