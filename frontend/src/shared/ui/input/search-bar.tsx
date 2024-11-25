import { KeyboardEvent } from 'react';

import * as S from '@shared/ui/input/search-bar.style';

import SearchIcon from '@icons/search.svg?react';

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onClick: () => void;
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, placeholder, onChange, onClick, onEnter }: SearchBarProps) => {
  return (
    <S.Container>
      <S.Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onEnter}
      />
      <S.IconWrapper onClick={onClick}>
        <SearchIcon />
      </S.IconWrapper>
    </S.Container>
  );
};

export default SearchBar;
