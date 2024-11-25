import styled from '@emotion/styled';

import Common from '@shared/styles/common';

import Icon from '@icons/layout.svg?react';

export const PositionedButton = styled.div`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  z-index: 10;
`;

export const LayoutPosition = styled.div`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: ${Common.colors.white};
  box-shadow: 0px 0px 5px #4444443d;
`;

export const Divider = styled.div`
  width: 0.0938rem;
  height: 2.6875rem;
  background-color: rgba(70, 70, 70, 0.1);
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  padding: 0.625rem 0.8125rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const LayoutIcon = styled(Icon)`
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
`;
