import { useState, useEffect } from 'react';
import RegisterModal from './RegisterModal';

export default function ModalManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState('');
  const [planName, setPlanName] = useState('');

  useEffect(() => {
    (window as any).openRegisterModal = (id: string, name: string) => {
      setPlanId(id);
      setPlanName(name);
      setIsOpen(true);
    };

    return () => {
      delete (window as any).openRegisterModal;
    };
  }, []);

  return (
    <RegisterModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      planId={planId}
      planName={planName}
    />
  );
}
