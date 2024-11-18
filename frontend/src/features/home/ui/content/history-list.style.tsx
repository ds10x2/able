import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const HistoryListWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${Common.fontSizes.sm};
  table-layout: fixed;
`;

export const HistoryRow = styled.tr`
  border-top: 1px solid ${Common.colors.gray100};
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${Common.colors.gray100};
  }
`;

export const HistoryCell = styled.td`
  padding: 12px;
  text-align: center;
  width: ${({ width }) => width || 'auto'};
`;

export const HistoryEmpty = styled.td`
  text-align: center;
  vertical-align: middle;
  height: 18.175rem;
  width: 100%;
`;

export const StatusText = styled.span<{ status: string }>`
  color: ${({ status }) => (status === '완료' ? Common.colors.primary : '#ff5252')};
  font-weight: ${Common.fontWeights.semiBold};
`;
