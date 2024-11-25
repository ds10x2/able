import * as S from '@shared/ui/button/arrow-button.style';

import ArrowIcon from '@icons/arrow.svg?react';
import Common from '@/shared/styles/common';

interface ArrowButtonProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  size?: 'md' | 'sm';
  color?: string;
  onClick?: () => void;
}

const ArrowButton = ({ direction = 'down', size = 'sm', color = Common.colors.black, onClick }: ArrowButtonProps) => {
  return (
    <S.StyledButton direction={direction} size={size} onClick={onClick}>
      <ArrowIcon fill={color} />
    </S.StyledButton>
  );
};

export default ArrowButton;
