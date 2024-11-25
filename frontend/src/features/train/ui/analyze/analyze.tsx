import * as S from '@features/train/ui/analyze/analyze.style';

import EpochListSidebar from '@features/train/ui/sidebar/epoch-list-sidebar';
import CanvasResult from '@features/train/ui/analyze/canvas-result';

const Analyze = () => {
  return (
    <S.AnalyzeContainer>
      <EpochListSidebar />
      <S.ContentWrapper>
        <CanvasResult />
      </S.ContentWrapper>
    </S.AnalyzeContainer>
  );
};

export default Analyze;
