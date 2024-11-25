import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const ApiListWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
  color: ${Common.colors.gray400};
  table-layout: fixed;
  height: 100%;
`;

export const ApiRow = styled.tr`
  border-top: 1px solid ${Common.colors.gray100};
  color: ${Common.colors.gray500};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ApiCell = styled.td`
  padding: 12px;
  text-align: center;
  width: ${({ width }) => width || 'auto'};
  height: 3.4375rem;
  align-items: center;
`;

export const CellIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.875rem;
  cursor: pointer;
`;
