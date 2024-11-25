import React, { useState } from 'react';

import { Container, Input } from '@shared/ui/searchbar/searchbar.style';

import FileIcon from '@icons/file.svg?react';

interface SearchBoxProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = '검색어를 입력하세요', onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <Container>
      <FileIcon width={20} height={20} />
      <Input type="text" value={searchValue} onChange={handleInputChange} placeholder={placeholder} />
      {searchValue && <FileIcon width={20} height={20} onClick={clearSearch} />}
    </Container>
  );
};

export default SearchBox;
