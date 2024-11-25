import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: ${Common.fontSizes.sm};
  margin-bottom: 0.25rem;
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownHeader = styled.div<{ isPlaceholder: boolean }>`
  padding: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: ${Common.fontSizes.sm};
  align-items: center;
  background-color: #fff;
  color: ${({ isPlaceholder }) => (isPlaceholder ? Common.colors.gray300 : 'inherit')};
`;

export const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  max-height: 9.375rem;
  overflow-y: auto;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &::-webkit-scrollbar-track {
    background: ${Common.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${Common.colors.gray300};
    border-radius: 0.3125rem;
  }
`;

export const DropdownItem = styled.div<{ isSelectable: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.9375rem;
  font-size: ${Common.fontSizes.sm};

  color: ${({ isSelectable }) => (isSelectable ? Common.colors.black : Common.colors.gray300)};
  background-color: ${({ isSelectable }) => (isSelectable ? Common.colors.white : Common.colors.gray100)};
  cursor: ${({ isSelectable }) => (isSelectable ? 'pointer' : 'default')};
  pointer-events: ${({ isSelectable }) => (isSelectable ? 'auto' : 'none')};
`;

export const Description = styled.span`
  font-size: ${Common.fontSizes.xs};
`;
