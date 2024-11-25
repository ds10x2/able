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

export const Input = styled.input`
  padding: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  font-size: ${Common.fontSizes.sm};

  &.readonly {
    background-color: #f0f0f0;
    color: #888;
    cursor: not-allowed;
  }
  &::placeholder {
    color: ${Common.colors.gray300};
  }
  &:focus {
    outline: none;
  }
`;
