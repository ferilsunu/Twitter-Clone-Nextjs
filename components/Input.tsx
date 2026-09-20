interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  type = "text", 
  onChange, 
  disabled, 
  label,
  required
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {label}
        </label>
      )}
      <input
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
          w-full
          px-4 
          py-3.5 
          text-base 
          bg-neutral-50/80 
          dark:bg-neutral-900/80 
          border 
          border-neutral-300 
          dark:border-neutral-800 
          rounded-xl
          outline-none
          text-neutral-900
          dark:text-white
          placeholder-neutral-400
          dark:placeholder-neutral-500
          focus:border-sky-500
          focus:ring-2
          focus:ring-sky-500/20
          transition-all
          disabled:bg-neutral-100
          dark:disabled:bg-neutral-900
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
};
 
export default Input;