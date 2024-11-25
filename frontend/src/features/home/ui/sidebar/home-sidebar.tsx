import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from '@features/home/ui/sidebar/home-sidebar.style';
import Common from '@shared/styles/common';
import { useProjects } from '@features/home/api/use-home.query';
import { useProjectNameStore } from '@entities/project/model/project.model';
import { useFetchDeployInfo } from '@features/deploy/api/use-deploy.query';

import ProjectModal from '@features/home/ui/modal/project-modal';
import BasicButton from '@shared/ui/button/basic-button';
import FileIcon from '@icons/file.svg?react';
import FastApiIcon from '@icons/fast-api.svg?react';
import Spinner from '@shared/ui/loading/spinner';

const HomeSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { projectName, setProjectName } = useProjectNameStore();
  const { data: projects, isLoading } = useProjects();
  const { data: deployInfo } = useFetchDeployInfo();

  useEffect(() => {
    if (projects && projects.length > 0 && !projectName) {
      setProjectName(projects[0]);
    }
  }, [projects, projectName, setProjectName]);

  const handleProjectSelect = (project: string) => {
    setProjectName(project);
  };

  const handleServer = () => {
    navigate('/deploy');
  };

  const handleCreateProjectClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.SidebarContainer>
      <S.Title>프로젝트 목록</S.Title>
      <S.Subtitle>내가 생성한 모델 모아보기</S.Subtitle>
      <BasicButton
        color={Common.colors.primary}
        backgroundColor={Common.colors.secondary}
        text="프로젝트 생성"
        width="100%"
        onClick={() => {
          handleCreateProjectClick();
        }}
      />

      <S.FolderSection>
        {isLoading ? (
          <Spinner height={50} />
        ) : (
          projects?.map((project: string, index: number) => (
            <S.Folder key={index} isSelected={projectName === project} onClick={() => handleProjectSelect(project)}>
              <FileIcon width={20} height={20} />
              <S.ProjectName>{project}</S.ProjectName>
            </S.Folder>
          ))
        )}
      </S.FolderSection>
      <S.Footer onClick={handleServer}>
        <S.FooterIcon>
          <FastApiIcon />
        </S.FooterIcon>
        <div>
          <S.FooterText>배포 서버 확인</S.FooterText>
          <S.FooterStatus>{deployInfo?.status}</S.FooterStatus>
        </div>
      </S.Footer>
      {isModalOpen && <ProjectModal onClose={closeModal} type={'create'} />}
    </S.SidebarContainer>
  );
};

export default HomeSideBar;
