import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const Container = styled.div`
  padding: 0.7rem 5.5rem 1.7rem;
  height: calc(100vh - 2.5rem);
  display: flex;
  flex-direction: column;
  background-color: ${Common.colors.background};
`;

export const Header = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 0.7rem;
  flex-shrink: 0;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-rows: 1fr 1fr;
  flex-grow: 1;
  height: 100%;

  & > .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
  }

  & > .bottom-row {
    display: grid;
    grid-template-columns: 1.1fr 0.7fr 1.2fr;
    gap: 1.6rem;
  }
`;

export const GraphCard = styled.div`
  background: ${Common.colors.white};
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
  border: 0.0625rem solid ${Common.colors.gray200};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`;

export const GraphTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  margin-right: auto;
  font-size: ${Common.fontSizes.xl};
  font-weight: ${Common.fontWeights.medium};
  color: ${Common.colors.gray500};
`;

export const F1ScoreTitle = styled(GraphTitle)`
  font-weight: ${Common.fontWeights.semiBold};
  margin-left: auto;
  font-size: ${Common.fontSizes['3xl']};
`;

export const ConfusionImage = styled.img`
  max-width: 70%;
  height: auto;
  flex-grow: 1;
  object-fit: contain;
  padding: 0;
`;
