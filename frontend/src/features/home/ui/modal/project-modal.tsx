import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useProjectStore } from '@entities/project/model/project.model';
import { useCreateProject, useUpdateProject, useDeleteProject } from '@features/home/api/use-home.mutation';

import Modal from '@shared/ui/modal/modal';
import Input from '@shared/ui/input/input';

interface ProjectModalProps {
  onClose: () => void;
  type: 'create' | 'modify';
}

const ProjectModal = ({ onClose, type }: ProjectModalProps) => {
  const isReadOnly = type === 'modify';
  const { currentProject } = useProjectStore();
  const [projectTitle, setProjectTitle] = useState(currentProject?.title || '');
  const [projectDescription, setProjectDescription] = useState(currentProject?.description || '');
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  useEffect(() => {
    if (isReadOnly && currentProject) {
      setProjectTitle(currentProject.title || '');
      setProjectDescription(currentProject.description || '');
    } else {
      setProjectTitle('');
      setProjectDescription('');
    }
  }, [isReadOnly, currentProject]);

  const handleCreateProject = () => {
    if (!isReadOnly) {
      createProject(
        {
          title: projectTitle,
          description: projectDescription,
        },
        {
          onSuccess: (data) => {
            if (data) {
              toast.success('프로젝트를 만들었어요.');
              onClose();
            }
          },
        }
      );
    } else {
      updateProject(
        {
          title: projectTitle,
          description: projectDescription,
          prevTitle: currentProject?.title,
          prevDescription: currentProject?.description,
        },
        {
          onSuccess: (data) => {
            if (data) {
              toast.success('프로젝트 정보를 수정했어요.');
              onClose();
            }
          },
        }
      );
    }
  };

  const handleDeleteProject = () => {
    deleteProject(
      { title: projectTitle },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success('프로젝트를 삭제했어요.');
            onClose();
          } else {
            toast.error('오류가 발생했어요.');
            onClose();
          }
        },
      }
    );
  };

  return (
    <Modal
      onClose={onClose}
      onDelete={handleDeleteProject}
      onConfirm={handleCreateProject}
      title="프로젝트 정보를 입력하세요"
      confirmText={isReadOnly ? '수정' : '생성'}
      cancelText={isReadOnly ? '삭제' : '취소'}
      isDelete={isReadOnly}
    >
      <Input
        label="프로젝트 이름"
        value={projectTitle}
        placeholder={isReadOnly ? '' : '2-50자 이내로 입력해주세요.'}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      <Input
        label="프로젝트 설명 (선택)"
        value={projectDescription}
        placeholder={isReadOnly ? '' : '2-50자 이내로 입력해주세요.'}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
    </Modal>
  );
};

export default ProjectModal;
