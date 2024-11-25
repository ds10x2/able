import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import * as S from '@features/train/ui/result/result.style';
import Common from '@shared/styles/common';
import type { DeployConfig } from '@features/deploy/types/deploy.type';
import type { EpochResult } from '@features/train/types/analyze.type';
import { useGraphs } from '@features/train/api/use-result.query';
import { useProjectNameStore } from '@entities/project/model/project.model';
import { useRegisterAPI } from '@features/deploy/api/use-api.mutation';

import EpochGraph from '@features/train/ui/result/epoch-graph';
import F1Score from '@features/train/ui/result/f1-score';
import LossGraph from '@features/train/ui/result/loss-graph';
import PerformanceTable from '@features/train/ui/result/performance-table';
import BasicButton from '@shared/ui/button/basic-button';
import DeployModal from '@features/train/ui/modal/deploy-modal';

type LossData = { epoch: string; training: number; validation: number }[];
type AccuracyData = { epoch: string; accuracy: number }[];

const transformLossData = (epochResults: EpochResult[] | null) => {
  if (!epochResults) {
    return [];
  }

  return epochResults.map((item) => ({
    epoch: item.epoch,
    training: item.losses.training,
    validation: item.losses.validation,
  }));
};

const transformAccuracyData = (epochResults: EpochResult[] | null) => {
  if (!epochResults) {
    return [];
  }

  return epochResults.map((item) => ({
    epoch: item.epoch,
    accuracy: item.accuracies.accuracy,
  }));
};

const Result = () => {
  const { projectName, resultName } = useProjectNameStore();
  const { data: graphs } = useGraphs(projectName, resultName);
  const [lossData, setLossData] = useState<LossData>([]);
  const [accuracyData, setAccuracyData] = useState<AccuracyData>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: registerAPI } = useRegisterAPI();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRunButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDeployAPI = (apis: DeployConfig) => {
    registerAPI(
      {
        projectName,
        trainResult: resultName,
        checkpoint: apis.selectedOption.label,
        uri: apis.apiPath,
        description: apis.apiDescription,
      },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success('API 배포가 완료되었어요.');
            handleModalClose();
          }
        },
        onError: () => {
          toast.error('에러가 발생했어요');
        },
      }
    );
  };

  useEffect(() => {
    setLossData(transformLossData(graphs?.epochResult || null));
    setAccuracyData(transformAccuracyData(graphs?.epochResult || null));
  }, [graphs]);

  return (
    <>
      {isModalOpen && <DeployModal onClose={handleModalClose} onSubmit={handleDeployAPI} />}
      <S.Container>
        <S.Header>
          <BasicButton
            color={Common.colors.primary}
            backgroundColor={Common.colors.secondary}
            text="모델 배포하기"
            width="10rem"
            onClick={handleRunButtonClick}
          />
        </S.Header>
        <S.GridContainer>
          <div className="top-row">
            <S.GraphCard>
              <S.GraphTitle>Training and validation loss</S.GraphTitle>
              <LossGraph lossData={lossData} />
            </S.GraphCard>
            <S.GraphCard>
              <S.GraphTitle>Epoch Accuracy</S.GraphTitle>
              <EpochGraph epochData={accuracyData} />
            </S.GraphCard>
          </div>
          <div className="bottom-row">
            <S.GraphCard>
              <S.GraphTitle>Confusion Matrix</S.GraphTitle>
              <S.ConfusionImage src={graphs?.confusionMatrix} alt="Confusion Matrix" />
            </S.GraphCard>
            <S.GraphCard>
              <S.F1ScoreTitle>F1-Score</S.F1ScoreTitle>
              <F1Score f1Score={Number(graphs?.f1Score) || 0} />
            </S.GraphCard>
            <S.GraphCard>
              <S.GraphTitle>Performance Matrices Table</S.GraphTitle>
              <PerformanceTable performanceMetrics={graphs?.performanceMetrics} />
            </S.GraphCard>
          </div>
        </S.GridContainer>
      </S.Container>
    </>
  );
};

export default Result;
