import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import Common from '@/shared/styles/common';

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

export const Container = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  background-color: ${Common.colors.gray100};
  border-radius: 0.5rem;
  flex-shrink: 0;
  animation: ${pulseAnimation} 2s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
`;
