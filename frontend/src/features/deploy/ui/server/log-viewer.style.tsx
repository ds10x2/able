import styled from '@emotion/styled';

import Common from '@/shared/styles/common';

export const LogContainer = styled.div`
  background-color: ${Common.colors.background};
  padding: 1rem;
  border-radius: 0.5rem;
  height: 100%;
  overflow-y: auto;
`;

export const LogText = styled.pre`
  font-size: ${Common.fontSizes.xs};
  white-space: pre-wrap;
`;
