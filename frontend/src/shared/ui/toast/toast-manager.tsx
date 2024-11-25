import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { TOAST_LIMIT } from '@/shared/constants/config.constant';

const ToastManager = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return <Toaster position="top-center" />;
};

export default ToastManager;
