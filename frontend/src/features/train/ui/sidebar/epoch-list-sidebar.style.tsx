import styled from '@emotion/styled';

import Common from '@shared/styles/common';
import { scrollbarHiddenMixin } from '@shared/styles/mixins.style';

export const SidebarContainer = styled.div`
  width: 14.5rem;
  height: 100%;
  padding: 1rem 0.5rem;
  background-color: ${Common.colors.white};
  box-shadow: 0.125rem 0 0.3125rem rgba(73, 73, 73, 0.1);
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Text = styled.span`
  font-size: ${Common.fontSizes.sm};
  font-weight: ${Common.fontWeights.semiBold};
  margin-left: 0.7rem;
`;

export const ScrollableSection = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${scrollbarHiddenMixin}
`;

export const EpochItem = styled.div<{ isSelected: boolean }>`
  padding: 0.75rem;
  background-color: ${(props) => (props.isSelected ? Common.colors.gray100 : 'transparent')};
  border-radius: 0.375rem;
  font-size: ${Common.fontSizes.sm};
  color: ${Common.colors.gray500};
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.4s;

  &:hover {
    background-color: ${Common.colors.gray100};
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1rem;
  color: #999; /* 원하는 색상으로 설정 */
`;
