import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      toast.success('Account created successfully!');

      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      registerModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-3 sm:gap-4">
      <Input
        label="Name"
        disabled={isLoading}
        placeholder="Your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Input 
        label="Username"
        disabled={isLoading}
        placeholder="Username (e.g. johndoe)" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Email"
        disabled={isLoading}
        placeholder="name@example.com" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        label="Password"
        disabled={isLoading}
        placeholder="Create a password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-500 text-center text-sm pt-2">
      <p>Have an account already?{' '}
        <span 
          onClick={onToggle} 
          className="
            text-sky-500 
            cursor-pointer 
            hover:underline
            font-semibold
          "
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create your account"
      actionLabel={isLoading ? "Creating account..." : "Next"}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
