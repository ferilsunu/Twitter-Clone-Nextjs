import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-900/60
          dark:bg-neutral-900/80
          backdrop-blur-xs
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/*content*/}
          <div className="
            h-full
            lg:h-auto
            border
            border-neutral-200
            dark:border-neutral-800
            rounded-2xl 
            shadow-2xl 
            relative 
            flex 
            flex-col 
            w-full 
            bg-white 
            dark:bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/*header*/}
            <div className="
              flex 
              items-center 
              justify-between 
              p-6
              md:p-8 
              rounded-t
              border-b
              border-neutral-100
              dark:border-neutral-800
              "
            >
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                {title}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-neutral-500 
                  hover:text-neutral-900
                  dark:text-neutral-400
                  dark:hover:text-white 
                  hover:opacity-70
                  transition
                "
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 md:p-8 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div className="flex flex-col gap-2 p-6 md:p-8 pt-0">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
