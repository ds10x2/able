import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const StyledButton = styled.button<{
  color: string;
  backgroundColor: string;
  width?: string;
  height?: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  border: none;
  border-radius: 0.375rem;

  font-size: ${Common.fontSizes.base};
  font-weight: ${Common.fontWeights.semiBold};

  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${(props) => (props.height ? '0' : '0.75rem 0')};
  gap: 0.5rem;
  cursor: pointer;

  transition: background-color 0.3s, filter 0.3s;

  &:hover {
    filter: brightness(0.9) saturate(2);
  }

  &:focus {
    outline: none;
  }
`;

export const StyledIcon = styled.span`
  display: flex;
  align-items: center;
`;
