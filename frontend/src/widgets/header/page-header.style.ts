import styled from '@emotion/styled';

import Common from '@/shared/styles/common';

export const Header = styled.div`
  height: 2.5rem;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  background-color: ${Common.colors.primary};
  color: ${Common.colors.white};
`;

export const Title = styled.span`
  font-weight: ${Common.fontWeights.semiBold};
  color: ${Common.colors.white};
`;

export const Date = styled.span`
  font-size: ${Common.fontSizes.xs};
  margin-left: 0.625rem;
`;
