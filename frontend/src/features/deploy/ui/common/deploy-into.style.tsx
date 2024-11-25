import Common from '@shared/styles/common';

import styled from '@emotion/styled';

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.9375rem;
`;

export const Title = styled.h1`
  font-size: ${Common.fontSizes['3xl']};
  font-weight: ${Common.fontWeights.medium};
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${Common.fontSizes.lg};
  font-weight: ${Common.fontWeights.regular};
  gap: 0.625rem;
  margin-top: 1.875rem;
`;

export const InfoText = styled.div`
  display: flex;
`;

export const Label = styled.span`
  color: ${Common.colors.gray300};
  width: 6rem;
`;

export const Value = styled.span`
  color: ${Common.colors.gray400};
`;

export const Link = styled.a<{ isRunning: boolean }>`
  color: ${({ isRunning }) => (isRunning ? Common.colors.primary : Common.colors.gray400)};
  text-decoration-line: none;
  cursor: ${({ isRunning }) => (isRunning ? 'pointer' : 'auto')};
`;

export const Status = styled.span`
  color: ${Common.colors.primary};
`;
