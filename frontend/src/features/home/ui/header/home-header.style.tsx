import styled from '@emotion/styled';

import Common from '@/shared/styles/common';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1rem;
  border-bottom: 0.0625rem solid ${Common.colors.gray200};
  height: 2.5rem;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const RightText = styled.a`
  font-size: ${Common.fontSizes.base};
  color: ${Common.colors.gray500};
  cursor: pointer;
  text-decoration-line: none;
`;
