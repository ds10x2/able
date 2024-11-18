import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 0rem;
  background-color: ${Common.colors.white};
  width: 3.75rem;
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.1);
`;

export const SidebarButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  margin: 0.6rem 0.6rem 0;
  border-radius: 0.625rem;
  background-color: ${({ active }) => (active ? Common.colors.primary : Common.colors.white)};
  color: ${({ active }) => (active ? Common.colors.white : Common.colors.black)};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;
