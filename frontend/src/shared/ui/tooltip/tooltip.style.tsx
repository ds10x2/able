import styled from '@emotion/styled';

import Common from '@/shared/styles/common';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Text = styled.div`
  position: fixed;
  padding: 0.5rem;
  transform: translate(0, -50%); // 수직 중앙
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.25rem;

  font-size: ${Common.fontSizes.sm};
  color: ${Common.colors.white};

  white-space: nowrap;
  z-index: 100;

  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s;
`;
