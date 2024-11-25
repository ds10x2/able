import toast from 'react-hot-toast';

import type { ApiResponse } from '@features/deploy/types/deploy.type';
import { ApiListWrapper, ApiRow, ApiCell, CellIcon } from '@/features/deploy/ui/api/api-list.style';
import { useStopApi, useRemoveApi } from '@features/deploy/api/use-api.mutation';

import StopIcon from '@icons/stop.svg?react';
import TrashCanIcon from '@icons/trashcan.svg?react';

interface ApiListProps {
  apis: ApiResponse[];
  page: number;
}

const ApiList = ({ apis, page }: ApiListProps) => {
  const { mutate: stopApi } = useStopApi();
  const { mutate: removeApi } = useRemoveApi();

  const handleApi = (uri: string, status: string) => {
    if (status === 'running') {
      stopApi(
        { uri, page },
        {
          onSuccess: () => {
            toast.success('API가 중지되었어요.');
          },
          onError: () => {
            toast.error('에러가 발생했어요.');
          },
        }
      );
    } else {
      removeApi(
        { uri, page },
        {
          onSuccess: () => {
            toast.success('API가 삭제되었어요.');
          },
          onError: () => {
            toast.error('에러가 발생했어요.');
          },
        }
      );
    }
  };

  return (
    <ApiListWrapper>
      <thead>
        <tr>
          <ApiCell as="th" width="15%">
            API경로
          </ApiCell>
          <ApiCell as="th" width="30%">
            설명
          </ApiCell>
          <ApiCell as="th" width="25%">
            파라미터
          </ApiCell>
          <ApiCell as="th" width="20%">
            액션
          </ApiCell>
        </tr>
      </thead>
      <tbody>
        {apis.length === 0 ? (
          <ApiRow>
            <ApiCell colSpan={4} style={{ height: '17.1875rem', textAlign: 'center', verticalAlign: 'middle' }}>
              배포한 API가 없어요
            </ApiCell>
          </ApiRow>
        ) : (
          Array.from({ length: 5 }).map((_, index) =>
            apis[index] ? (
              <ApiRow key={apis[index].uri}>
                <ApiCell width="15%">{apis[index].uri}</ApiCell>
                <ApiCell width="30%">{apis[index].description}</ApiCell>
                <ApiCell width="25%">{apis[index].checkpoint}</ApiCell>
                <ApiCell width="20%" onClick={() => handleApi(apis[index].uri, apis[index].status)}>
                  <CellIcon>
                    {apis[index].status === 'running' ? (
                      <StopIcon width={30} height={30} />
                    ) : (
                      <TrashCanIcon width={24} height={24} />
                    )}
                  </CellIcon>
                </ApiCell>
              </ApiRow>
            ) : (
              <ApiRow key={`empty-${index}`} style={{ height: '3.125rem' }}>
                <ApiCell width="15%"></ApiCell>
                <ApiCell width="30%"></ApiCell>
                <ApiCell width="25%"></ApiCell>
                <ApiCell width="20%"></ApiCell>
              </ApiRow>
            )
          )
        )}
      </tbody>
    </ApiListWrapper>
  );
};

export default ApiList;
