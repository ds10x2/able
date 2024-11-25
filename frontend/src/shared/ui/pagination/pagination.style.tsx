import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

export const PageNumber = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? Common.colors.secondary : 'transparent')};
  color: ${({ isActive }) => (isActive ? Common.colors.primary : Common.colors.black)};
  border: none;
  min-width: 2.1875rem;
  padding: 0.5rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '' : Common.colors.gray100)};
  }
`;
