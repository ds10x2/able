import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from '@/features/home/ui/content/home-content.style';
import Common from '@shared/styles/common';
import defaultImage from '@assets/images/default-image.png';
import { HISTORY_PAGE_LIMIT } from '@features/home/constants/history.constant';
import { useProjectDetail, useProjectHistory } from '@features/home/api/use-home.query';
import { useProjectStore, useProjectNameStore } from '@entities/project/model/project.model';

import HistoryList from '@features/home/ui/content/history-list';
import Pagination from '@shared/ui/pagination/pagination';
import ProjectModal from '@features/home/ui/modal/project-modal';
import WritingIcon from '@icons/writing.svg?react';
import ClockIcon from '@icons/clock.svg?react';
import SettingIcon from '@icons/setting.svg?react';
import Skeleton from '@/shared/ui/loading/skeleton';

const HomeContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(HISTORY_PAGE_LIMIT);

  const { projectName } = useProjectNameStore();
  const { currentProject, setCurrentProject } = useProjectStore();
  const [hasThumbnail, setHasThumbnail] = useState(true);

  const { data: project } = useProjectDetail(projectName);
  const { data: historyData } = useProjectHistory(projectName, currentPage - 1, size);

  const handleCanvasClick = () => {
    navigate('/canvas');
  };

  const handleSettingClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (project && project !== currentProject) {
      setCurrentProject(project);
      setHasThumbnail(Boolean(project.thumbnail));
    }
  }, [project, currentProject, setCurrentProject]);

  return (
    <>
      <S.HomeContentWrapper>
        <div>
          <S.Title>
            {currentProject?.title ? <S.Title>{currentProject?.title}</S.Title> : <Skeleton width={8} height={1.95} />}
            <SettingIcon
              width={20}
              height={20}
              color={Common.colors.gray400}
              onClick={handleSettingClick}
              style={{ cursor: 'pointer' }}
            />
          </S.Title>
          <S.Description>{currentProject?.description || `${currentProject?.title}입니다`}</S.Description>
        </div>
        <S.ProjectContentContainer>
          <S.CanvasContainer>
            <S.SubTitle>
              <WritingIcon width={24} height={24} />
              작업 중인 캔버스
            </S.SubTitle>
            {hasThumbnail ? (
              currentProject?.thumbnail ? (
                <S.CanvasImage src={currentProject?.thumbnail} alt="Canvas Image" onClick={handleCanvasClick} />
              ) : (
                <Skeleton width={30} height={20} />
              )
            ) : (
              <S.CanvasImage src={defaultImage} alt="Canvas Image" onClick={handleCanvasClick} />
            )}
          </S.CanvasContainer>
          <S.HistoryContainer>
            <S.SubTitle>
              <ClockIcon width={24} height={24} />
              학습 기록
            </S.SubTitle>
            <S.HistoryWrapper>
              <HistoryList trainSummaries={historyData?.trainSummaries || []} />
              {historyData?.trainSummaries && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={historyData?.totalPages || 0}
                  onPageChange={setCurrentPage}
                />
              )}
            </S.HistoryWrapper>
          </S.HistoryContainer>
        </S.ProjectContentContainer>
      </S.HomeContentWrapper>
      {isModalOpen && <ProjectModal onClose={closeModal} type={'modify'} />}
    </>
  );
};

export default HomeContent;
