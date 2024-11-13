import styled from '@emotion/styled';

import Common from '@shared/styles/common';

export const ApiListWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
  color: ${Common.colors.gray400};
  table-layout: fixed;
`;

export const ApiRow = styled.tr`
  border-top: 1px solid ${Common.colors.gray100};
  cursor: pointer;
  color: ${Common.colors.gray500};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ApiCell = styled.td`
  padding: 12px;
  text-align: center;
  width: ${({ width }) => width || 'auto'};
  min-height: 3.125rem;
`;