import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const HomeContentWrapper = styled.div`
  border-radius: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Title = styled.div`
  font-size: ${Common.fontSizes['3xl']};
  font-weight: ${Common.fontWeights.semiBold};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProjectContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CanvasContainer = styled.div`
  width: 50%;
  padding-right: 3rem;
`;

export const HistoryContainer = styled.div`
  width: 50%;
`;

export const SubTitle = styled.h2`
  font-size: ${Common.fontSizes.xl};
  font-weight: ${Common.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${Common.colors.gray500};
  margin-bottom: 0.9375rem;
`;

export const Description = styled.p`
  margin-top: 1rem;
  min-height: 1.25rem;
  color: ${Common.colors.gray400};
  font-size: ${Common.fontSizes.lg};
`;

export const CanvasImage = styled.img`
  width: 100%;
  height: 20.75rem;
  border-radius: 0.5rem;
  object-fit: cover;
  cursor: pointer;
`;

export const CanvasEmpty = styled.div`
  width: 100%;
  height: 20.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: ${Common.colors.background};
`;

export const CanvasText = styled.p`
  font-size: ${Common.fontSizes.lg};
  color: ${Common.colors.gray500};
`;

export const HistoryWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Text = styled.div`
  color: ${Common.colors.gray300};
  font-size: ${Common.fontSizes.sm};
`;
