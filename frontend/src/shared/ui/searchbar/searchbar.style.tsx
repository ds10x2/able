import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 8px 12px;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background: transparent;
  ::placeholder {
    color: #9ca3af;
  }
`;
