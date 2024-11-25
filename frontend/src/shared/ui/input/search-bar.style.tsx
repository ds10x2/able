import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 0.375rem;
  border: solid 0.0625rem ${Common.colors.gray200};
  background-color: ${Common.colors.white};
  box-shadow: 0 0.0375rem 0.125rem rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;

  &::placeholder {
    color: ${Common.colors.gray200};
    font-weight: ${Common.fontWeights.medium};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
