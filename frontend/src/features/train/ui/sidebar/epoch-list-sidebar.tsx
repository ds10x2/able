import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';

import * as S from '@features/train/ui/sidebar/epoch-list-sidebar.style';
import { useEpochs, useSearchEpochs } from '@features/train/api/use-analyze.query';
import { useProjectNameStore } from '@entities/project/model/project.model';

import SearchBar from '@shared/ui/input/search-bar';

const EpochListSidebar = () => {
  const [index, setIndex] = useState(0);
  const [size] = useState(10);
  const [allEpochs, setAllEpochs] = useState<string[]>([]);

  const bestEpochs = ['train_best', 'valid_best', 'final'];

  const { projectName, resultName, epochName, setEpochName } = useProjectNameStore();
  const { data: epochData, isLoading } = useEpochs(projectName, resultName, index, size);

  const loadMoreEpochs = useCallback(() => {
    if (epochData?.hasNext && !isLoading) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [epochData, isLoading]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollHeight - scrollTop === clientHeight) {
        loadMoreEpochs();
      }
    },
    [loadMoreEpochs]
  );

  const handleClick = (epoch: string) => {
    setEpochName(epoch);
  };

  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const { data: searchData } = useSearchEpochs(projectName, resultName, keyword, index, size);
  const searchEpoch = searchData?.checkpoints;

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

  useEffect(() => {
    if (epochData?.checkpoints && epochData.checkpoints.length > 0 && !epochName) {
      setEpochName(epochData.checkpoints[0]);
    }
  }, [epochData?.checkpoints, epochName, setEpochName]);

  useEffect(() => {
    if (keyword && searchEpoch) {
      setAllEpochs(searchEpoch);
    } else if (!keyword && epochData?.checkpoints) {
      setAllEpochs((prevEpochs) => {
        const newEpochs = epochData.checkpoints.filter((epoch) => !prevEpochs.includes(epoch));
        return [...prevEpochs, ...newEpochs];
      });
    }
  }, [searchEpoch, epochData, keyword]);

  return (
    <S.SidebarContainer>
      <S.Text>베스트</S.Text>
      <S.BestSection>
        {bestEpochs.map((epoch, index) => (
          <S.EpochItem key={`best-${index}`} isSelected={epochName === epoch} onClick={() => handleClick(epoch)}>
            {epoch}
          </S.EpochItem>
        ))}
      </S.BestSection>
      <S.Text>일반</S.Text>
      <SearchBar
        value={value}
        placeholder="에포크 검색"
        onChange={handleInputChange}
        onClick={handleBlockSearch}
        onEnter={handleKeyDown}
      />
      <S.ScrollableSection onScroll={handleScroll}>
        {allEpochs.length > 0 ? (
          allEpochs.map((epoch, index) => (
            <S.EpochItem key={index} isSelected={epochName === epoch} onClick={() => handleClick(epoch)}>
              {epoch}
            </S.EpochItem>
          ))
        ) : (
          <S.EmptyMessage>에포크 없음</S.EmptyMessage>
        )}
        {isLoading && <div>로딩 중...</div>}
      </S.ScrollableSection>
    </S.SidebarContainer>
  );
};

export default EpochListSidebar;
