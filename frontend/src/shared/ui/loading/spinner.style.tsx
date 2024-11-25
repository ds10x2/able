import styled from '@emotion/styled';

export const SpinnerWrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => (height ? `${height}rem` : '100%')};
`;
