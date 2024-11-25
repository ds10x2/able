import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const Canvas = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Common.colors.background};
  position: relative;
`;

export const OverlayButton = styled.div`
  display: flex;
  position: absolute;
  gap: 0.6rem;

  top: 1rem;
  right: 1rem;
  z-index: 10;
`;
