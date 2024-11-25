import { KeyboardEvent, useState } from 'react';

import * as S from '@features/canvas/ui/sidebar/canvas-sidebar.style';
import { BLOCK_MENU } from '@features/canvas/constants/block-menu.constant';
import { useSearchBlock } from '@features/canvas/api/use-blocks.query';

import SearchBar from '@shared/ui/input/search-bar';
import MenuBlock from '@features/canvas/ui/sidebar/menu-block';
import MenuAccordion from '@features/canvas/ui/sidebar/menu-accordion';

const CanvasSidebar = () => {
  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const { data } = useSearchBlock(keyword);
  const searchBlock = data?.data.block;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlockSearch();
    }
  };

  const handleBlockSearch = () => {
    setKeyword(value);
  };

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    if (!newValue) {
      setKeyword('');
    }
  };

  return (
    <S.SidebarContainer>
      <SearchBar
        value={value}
        placeholder="블록 검색"
        onChange={handleInputChange}
        onClick={handleBlockSearch}
        onEnter={handleKeyDown}
      />
      {keyword ? (
        searchBlock ? (
          <MenuBlock type={searchBlock.type} name={searchBlock.name} fields={searchBlock.args ?? []} />
        ) : (
          <S.Text>해당하는 블록이 없어요</S.Text>
        )
      ) : (
        BLOCK_MENU.map((menu) => <MenuAccordion key={menu.name} label={menu.name} Icon={menu.icon} />)
      )}
    </S.SidebarContainer>
  );
};

export default CanvasSidebar;
