import styled from '@emotion/styled';
import Common from '@shared/styles/common';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 0rem;
  background-color: ${Common.colors.white};
  width: 3.75rem;
  height: 100vh;
  box-shadow: 0.125rem 0 0.3125rem rgba(73, 73, 73, 0.1);
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.1);
`;

export const SidebarButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin: 0.6rem;
  border-radius: 0.625rem;
  background-color: ${({ active }) =>
    active ? Common.colors.primary : Common.colors.white};
  color: ${({ active }) =>
    active ? Common.colors.white : Common.colors.black};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;