import styled from '@emotion/styled';

import Common from '@shared/styles/common';
import { ellipsisMixin } from '@shared/styles/mixins.style';

export const Container = styled.div<{
  isDragging: boolean;
  blockColor: string;
}>`
  width: 100%;
  position: relative;
  padding: 0.25rem 0;
  margin-top: 0.625rem;

  border: 0.1rem solid ${({ blockColor }) => blockColor};
  border-radius: 0.3125rem;
  background-color: ${Common.colors.white};
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: grab;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.5rem;
    background-color: ${({ blockColor }) => blockColor};
    border-top-left-radius: 0.15rem;
    border-bottom-left-radius: 0.15rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

export const LabelWrapper = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding-left: 0.5rem;
`;

export const LabelText = styled.span`
  width: 100%;
  font-size: ${Common.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  ${ellipsisMixin}
`;
