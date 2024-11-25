import React, { ReactNode, useState } from 'react';

import * as S from '@shared/ui/tooltip/tooltip.style';

import TooltipPortal from '@shared/ui/tooltip/tooltip-portal';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = (event: React.MouseEvent) => {
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: top + height / 2,
      left: left + width + 8,
    });
    setIsVisible(true);
  };

  const hideTooltip = () => setIsVisible(false);

  return (
    <S.Container onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <TooltipPortal>
          <S.Text style={{ top: `${position.top}px`, left: `${position.left}px` }}>{text}</S.Text>
        </TooltipPortal>
      )}
    </S.Container>
  );
};

export default Tooltip;
