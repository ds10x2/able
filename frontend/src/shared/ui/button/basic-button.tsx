import { ReactNode } from 'react';

import { StyledButton, StyledIcon } from '@shared/ui/button/basic-button.style';
import Common from '@shared/styles/common';

interface BasicButtonProps {
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  text: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const BasicButton = ({
  color = Common.colors.white,
  backgroundColor = Common.colors.primary,
  width,
  height,
  text,
  icon,
  disabled = false,
  onClick,
}: BasicButtonProps) => {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {text}
    </StyledButton>
  );
};

export default BasicButton;
