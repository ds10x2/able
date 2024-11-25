import { useState } from 'react';
import * as S from '@widgets/sidebar/project-sidebar.style';

import ResultIcon from '@icons/result.svg?react';
import AnalyzeIcon from '@icons/analyze.svg?react';
import RocketLineIcon from '@icons/rocket-line.svg?react';
import ApiIcon from '@icons/api.svg?react';

interface ResultSidebarProps {
  onSelectionChange: (selection: string) => void;
  type: 'train' | 'deploy';
}

const ResultSidebar = ({ onSelectionChange, type }: ResultSidebarProps) => {
  const isTrain = type === 'train';
  const [activeButton, setActiveButton] = useState(isTrain ? 'result' : 'server');

  const handleButtonClick = (selection: string) => {
    setActiveButton(selection);
    onSelectionChange(selection);
  };

  return (
    <S.SidebarContainer>
      {isTrain ? (
        <>
          <S.SidebarButton active={activeButton === 'result'} onClick={() => handleButtonClick('result')}>
            <ResultIcon width={30} height={30} />
          </S.SidebarButton>
          <S.SidebarButton active={activeButton === 'analyze'} onClick={() => handleButtonClick('analyze')}>
            <AnalyzeIcon width={25} height={25} />
          </S.SidebarButton>
        </>
      ) : (
        <>
          <S.SidebarButton active={activeButton === 'server'} onClick={() => handleButtonClick('server')}>
            <RocketLineIcon width={30} height={30} />
          </S.SidebarButton>
          <S.SidebarButton active={activeButton === 'api'} onClick={() => handleButtonClick('api')}>
            <ApiIcon width={25} height={25} />
          </S.SidebarButton>
        </>
      )}
    </S.SidebarContainer>
  );
};

export default ResultSidebar;
