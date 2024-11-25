import * as S from '@features/deploy/ui/server/server.style';
import Common from '@shared/styles/common';
import { useRestartServer, useStartServer, useStopServer } from '@features/deploy/api/use-server.mutation';
import { useFetchDeployInfo } from '@features/deploy/api/use-deploy.query';

import InfoContainer from '@features/deploy/ui/common/deploy-info';
import LogViewer from '@features/deploy/ui/server/log-viewer';
import BasicButton from '@shared/ui/button/basic-button';
import PlayIcon from '@icons/play.svg?react';
import RestartIcon from '@icons/restart.svg?react';
import StopIcon from '@icons/stop.svg?react';

const Server = () => {
  const { mutate: startServer } = useStartServer();
  const { mutate: stopServer } = useStopServer();
  const { mutate: restartServer } = useRestartServer();

  const { data: deployInfo, isLoading } = useFetchDeployInfo();
  const isRunning = deployInfo?.status === 'running';

  const getButtonColor = (type: 'start' | 'restart' | 'stop') => {
    if (isLoading) return Common.colors.gray200;
    if (type === 'start') return isRunning ? Common.colors.gray200 : Common.colors.primary;
    if (type === 'restart') return isRunning ? Common.colors.primary : Common.colors.gray200;
    if (type === 'stop') return isRunning ? Common.colors.red : Common.colors.gray200;
  };

  return (
    <S.Container>
      <S.TopSection>
        <InfoContainer title="Server" />
        <S.ButtonWrapper>
          <BasicButton
            backgroundColor={getButtonColor('start')}
            text="START"
            width="8.125rem"
            height="3rem"
            icon={<PlayIcon width={13} height={15} />}
            disabled={isRunning}
            onClick={startServer}
          />
          <BasicButton
            backgroundColor={getButtonColor('restart')}
            text="RESTART"
            width="8.125rem"
            height="3rem"
            icon={<RestartIcon width={24} height={24} />}
            disabled={!isRunning}
            onClick={restartServer}
          />
          <BasicButton
            backgroundColor={getButtonColor('stop')}
            text="STOP"
            width="8.125rem"
            height="3rem"
            icon={<StopIcon width={30} height={30} />}
            disabled={!isRunning}
            onClick={stopServer}
          />
        </S.ButtonWrapper>
      </S.TopSection>
      <LogViewer />
    </S.Container>
  );
};

export default Server;
