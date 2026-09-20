import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  footer, 
  disabled 
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        p-4 
        sm:p-6
        overflow-y-auto 
        bg-neutral-900/60 
        dark:bg-neutral-950/80 
        backdrop-blur-sm
        transition-opacity
    ">
      <div className="relative w-full max-w-lg my-auto">
        {/* Modal Card */}
        <div className="
          relative 
          flex 
          flex-col 
          w-full 
          bg-white 
          dark:bg-black 
          border 
          border-neutral-200 
          dark:border-neutral-800 
          rounded-2xl 
          sm:rounded-3xl 
          shadow-2xl 
          overflow-hidden 
          outline-none
        ">
          {/* Header */}
          <div className="relative flex items-center justify-between px-6 pt-5 pb-3">
            <button
              onClick={handleClose}
              disabled={disabled}
              className="
                p-2 
                -ml-2 
                rounded-full 
                text-neutral-500 
                hover:text-neutral-900 
                dark:hover:text-white 
                hover:bg-neutral-100 
                dark:hover:bg-neutral-800 
                active:scale-90 
                transition
            ">
              <AiOutlineClose size={18} />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 text-sky-500">
              <BsTwitter size={28} />
            </div>

            <div className="w-8" />
          </div>

          {/* Title */}
          {title && (
            <div className="px-6 sm:px-8 pt-3 pb-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {title}
              </h2>
            </div>
          )}

          {/* Body Content */}
          <div className="px-6 sm:px-8 py-4 flex-auto">
            {body}
          </div>

          {/* Footer Action */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col gap-3">
            <Button 
              disabled={disabled} 
              label={actionLabel} 
              secondary 
              fullWidth 
              large 
              onClick={handleSubmit} 
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
