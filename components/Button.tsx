interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  secondary, 
  fullWidth, 
  onClick, 
  large, 
  disabled, 
  outline 
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-90
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white' : 'bg-sky-500 text-white border-sky-500'}
        ${large ? 'text-xl px-5 py-3' : 'text-md px-4 py-2'}
        ${outline ? 'bg-transparent border-neutral-900 text-neutral-900 dark:border-white dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900' : ''}
      `}
    >
      {label}
    </button>
   );
}
 
export default Button;