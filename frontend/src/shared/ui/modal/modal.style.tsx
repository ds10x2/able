import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import Common from '@shared/styles/common';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease forwards;
`;

export const ModalWrapper = styled.div`
  width: 25rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  animation: ${fadeIn} 0.3s ease forwards;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: ${Common.fontSizes.lg};
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.3125rem 0.625rem;
  font-size: ${Common.fontSizes['2xl']};
  cursor: pointer;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const CancelButton = styled.button<{ isDelete: boolean }>`
  background-color: ${(props) => (props.isDelete ? Common.colors.red : Common.colors.gray100)};
  color: ${(props) => (props.isDelete ? Common.colors.white : Common.colors.black)};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: ${Common.fontSizes.sm};
  font-weight: ${Common.fontWeights.medium};
`;

export const ConfirmButton = styled.button`
  background-color: #007bff;
  color: ${Common.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: ${Common.fontSizes.sm};
  font-weight: ${Common.fontWeights.medium};
`;
