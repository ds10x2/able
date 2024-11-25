import styled from '@emotion/styled';

import Common from '@/shared/styles/common';

export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const MenuBlockWrapper = styled.div<{
  isOpen: boolean;
  contentHeight: number;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: ${({ isOpen, contentHeight }) => (isOpen ? `${contentHeight}px` : '0')};
  transition: height 0.3s ease;
`;

export const SummaryWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.625rem;
`;

export const Text = styled.p`
  font-size: ${Common.fontSizes.xs};
  color: ${Common.colors.gray300};
`;
