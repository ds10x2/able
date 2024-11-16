import styled from '@emotion/styled';
import Common from '@shared/styles/common';

export const Container = styled.div<{ blockColor: string; isConnected: boolean; isSelected: boolean }>`
  width: 250px;
  border-radius: 4px;
  background-color: ${({ blockColor }) => blockColor};
  border: 1px solid ${({ blockColor }) => blockColor};
  overflow: hidden;
  opacity: ${({ isConnected, isSelected }) => (isSelected || isConnected ? 1 : 0.3)};
  box-shadow: ${({ isSelected, blockColor }) => (isSelected ? `0 0 6.4px ${blockColor}` : '')};
`;

export const Label = styled.div`
  width: 100%;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;

  font-size: ${Common.fontSizes.sm};
  font-weight: ${Common.fontWeights.semiBold};
  color: ${Common.colors.white};
`;

export const FieldWrapper = styled.div`
  background-color: ${Common.colors.white};
`;

export const InputWrapper = styled.div<{ blockColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.4px 12px;
  border-bottom: 1px solid ${({ blockColor }) => blockColor};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Name = styled.label`
  font-size: ${Common.fontSizes.xs};
`;

export const Checkbox = styled.input<{ blockColor: string }>`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 0.0625rem solid ${Common.colors.gray200};
  border-radius: 1.6px;
  background-color: ${Common.colors.white};
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${({ blockColor }) => blockColor};
    border-color: ${({ blockColor }) => blockColor};
  }

  &:checked::after {
    content: '✓';
    color: ${Common.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${Common.fontSizes.sm};
  }

  &:hover {
    border-color: ${({ blockColor }) => blockColor};
  }
`;

export const Input = styled.input`
  width: 40%;
  height: 24px;
  padding: 0 8px;

  font-size: ${Common.fontSizes.xs};
  color: ${Common.colors.gray500};
  text-align: end;

  border: 0.0625rem solid ${Common.colors.gray200};
  border-radius: 1.6px;
  outline: none;

  ::placeholder {
    color: ${Common.colors.gray200};
  }
`;

export const Image = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
`;

export const CustomUploadContainer = styled.div`
  border: none;
  padding: 25px;
  min-height: 150px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease;
  color: ${Common.colors.gray400};
`;

export const HiddenInput = styled.input`
  display: none;
`;


export const GraphContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 0.3125rem;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem; 
  margin: -1rem;
`;

export const BarContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  max-height: ${(props) => (props.isVisible ? '31.25rem' : '0rem')}; 
  overflow: hidden; 
  transition: max-height 0.3s ease-in-out; 
`;

export const BarWrapper = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 5rem;
  margin-top: 1.25rem;
`;

export const Bar = styled.div<{ height: number; color: string }>`
  width: 3.4375rem;
  height: ${(props) => (props.height * 30) / 16}rem;
  background-color: ${(props) => props.color};
  border-radius: 0.125rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 0.25rem;
  transition: height 0.3s ease;
`;

export const BarScore = styled.span`
  font-size: ${Common.fontSizes.xs};
  color: white;
`;

export const BarLabel = styled.span`
  margin-bottom: 0.3125rem;
  font-size: ${Common.fontSizes.sm};
  font-weight: ${Common.fontWeights.medium};
  color: ${Common.colors.gray400};
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: flex-start; 
  gap: 1rem; 
`;