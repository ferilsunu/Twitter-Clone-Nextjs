import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const { mutate: mutateCurrentUser } = useCurrentUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);

      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Welcome back!');
        setEmail('');
        setPassword('');
        loginModal.onClose();

        // Refresh authentication and feed state immediately
        await mutateCurrentUser();
        mutate('/api/current');
        mutate('/api/posts');
        mutate('/api/users');
        mutate('/api/notifications');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal, mutateCurrentUser]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        label="Email"
        placeholder="Enter your email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        label="Password"
        placeholder="Enter your password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-500 text-center text-sm pt-2">
      <p>Don&apos;t have an account?{' '}
        <span 
          onClick={onToggle} 
          className="
            text-sky-500 
            cursor-pointer 
            hover:underline
            font-semibold
          "
        >
          Sign up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Sign in to Twitter"
      actionLabel={isLoading ? "Signing in..." : "Sign in"}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
