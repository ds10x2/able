import * as S from '@features/deploy/ui/common/deploy-into.style';
import { useFetchDeployInfo } from '@features/deploy/api/use-deploy.query';

import FastApiIcon from '@icons/fast-api.svg?react';
import Skeleton from '@/shared/ui/loading/skeleton';

interface InfoContainerProps {
  title: string;
}

const InfoContainer = ({ title }: InfoContainerProps) => {
  const { data: deployInfo, isFetching } = useFetchDeployInfo();
  const docsUrl = `http://127.0.0.1:${deployInfo?.port}/docs`;

  return (
    <S.InfoWrapper>
      <S.TitleSection>
        <FastApiIcon width={36} height={36} />
        <S.Title>{title}</S.Title>
      </S.TitleSection>

      <S.InfoSection>
        <S.InfoText>
          <S.Label>FastAPI</S.Label>
          {isFetching ? <Skeleton width={2.9375} height={1.25} /> : <S.Value>{deployInfo?.apiVersion}</S.Value>}
        </S.InfoText>
        <S.InfoText>
          <S.Label>Port</S.Label>
          {isFetching ? <Skeleton width={2.9375} height={1.25} /> : <S.Value>{deployInfo?.port}</S.Value>}
        </S.InfoText>
        <S.InfoText>
          <S.Label>Status</S.Label>
          <S.Value>
            {isFetching ? <Skeleton width={2.9375} height={1.25} /> : <S.Status>{deployInfo?.status}</S.Status>}
          </S.Value>
        </S.InfoText>
        <S.InfoText>
          <S.Label>Docs</S.Label>
          <S.Value>
            <S.Link
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              isRunning={deployInfo?.status === 'running'}
              onClick={(e) => {
                if (deployInfo?.status !== 'running') {
                  e.preventDefault();
                }
              }}
            >
              {docsUrl}
            </S.Link>
          </S.Value>
        </S.InfoText>
      </S.InfoSection>
    </S.InfoWrapper>
  );
};

export default InfoContainer;
