import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface TooltipPortalProps {
  children: ReactNode;
}

const TooltipPortal = ({ children }: TooltipPortalProps) => {
  return ReactDOM.createPortal(children, document.body);
};

export default TooltipPortal;
