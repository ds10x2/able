import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { HISTORY_PAGE_LIMIT } from '@features/home/constants/history.constant';
import type { HistoryItem } from '@features/home/types/home.type';
import { useProjectNameStore } from '@entities/project/model/project.model';

import * as S from '@/features/home/ui/content/history-list.style';

interface HistoryListProps {
  trainSummaries: HistoryItem[];
}

const HistoryList = ({ trainSummaries }: HistoryListProps) => {
  const navigate = useNavigate();
  const { setResultName } = useProjectNameStore();
  const emptyRows = HISTORY_PAGE_LIMIT - trainSummaries.length;

  const handleHistoryClick = (result: string, status: string) => {
    if (status === '완료') {
      setResultName(result);
      navigate('/train');
    } else {
      toast.error('빌드에 실패한 모델이에요.');
    }
  };

  return (
    <S.HistoryListWrapper>
      <thead>
        <tr>
          <S.HistoryCell as="th" width="10%">
            회차
          </S.HistoryCell>
          <S.HistoryCell as="th" width="40%">
            학습일
          </S.HistoryCell>
          <S.HistoryCell as="th" width="20%">
            정확도
          </S.HistoryCell>
          <S.HistoryCell as="th" width="20%">
            상태
          </S.HistoryCell>
        </tr>
      </thead>
      <tbody>
        {trainSummaries.length === 0 ? (
          <S.HistoryEmpty colSpan={4}>학습한 기록이 없어요</S.HistoryEmpty>
        ) : (
          <>
            {trainSummaries.map((summary) => (
              <S.HistoryRow
                key={summary.index}
                onClick={() => handleHistoryClick(summary.originDirName, summary.status)}
              >
                <S.HistoryCell width="10%">{summary.index}</S.HistoryCell>
                <S.HistoryCell width="40%">{summary.date}</S.HistoryCell>
                <S.HistoryCell width="20%">{summary.accuracy}</S.HistoryCell>
                <S.HistoryCell width="20%">
                  <S.StatusText status={summary.status}>{summary.status}</S.StatusText>
                </S.HistoryCell>
              </S.HistoryRow>
            ))}
            {Array.from({ length: emptyRows }).map(() => (
              <div style={{ height: '2.6rem' }}></div>
            ))}
          </>
        )}
      </tbody>
    </S.HistoryListWrapper>
  );
};

export default HistoryList;
