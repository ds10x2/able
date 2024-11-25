import { ChangeEvent } from 'react';

import * as S from '@shared/ui/input/input.style';

interface InputProps {
  label?: string;
  value?: string | number;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, value, defaultValue, placeholder, readOnly = false, className, onChange }: InputProps) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className={className}
        onChange={onChange}
      />
    </S.Container>
  );
};

export default Input;
