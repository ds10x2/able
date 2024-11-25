import { useState } from 'react';
import toast from 'react-hot-toast';

import { useProjectNameStore } from '@entities/project/model/project.model';
import { useFetchCheckpointList } from '@features/train/api/use-result.query';
import type { Option } from '@shared/types/common.type';
import type { DeployConfig } from '@features/deploy/types/deploy.type';

import Modal from '@shared/ui/modal/modal';
import Input from '@shared/ui/input/input';
import DropDown from '@shared/ui/dropdown/dropdown';

interface DeployModalProps {
  onClose: () => void;
  onSubmit: (data: DeployConfig) => void;
}

const DeployModal = ({ onClose, onSubmit }: DeployModalProps) => {
  const { projectName, resultName } = useProjectNameStore();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [apiPath, setApiPath] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const { data: checkpointData } = useFetchCheckpointList(projectName, resultName);

  const checkpoints = checkpointData?.checkpoints ?? [];

  const options = checkpoints.map((checkpoint) => ({
    value: checkpoint,
    label: checkpoint,
  }));

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleApiPath = (apiPath: string) => {
    setApiPath(apiPath);
  };

  const handleApiDescription = (apiDescription: string) => {
    setApiDescription(apiDescription);
  };

  const handleSubmit = () => {
    if (!apiPath || !apiDescription || !selectedOption) {
      toast.error('모든 칸을 채워주세요.');
      return;
    }

    const apiPathPattern = /^\/[a-z]*$/;
    if (!apiPath.match(apiPathPattern)) {
      toast.error("API 경로는 '/'로 시작해야 하며, \n소문자만 포함할 수 있어요.");
      return;
    }

    onSubmit({ apiPath, apiDescription, selectedOption });
    onClose();
    return;
  };

  return (
    <Modal onClose={onClose} onConfirm={handleSubmit} title="배포할 API 정보를 입력하세요" confirmText="확인">
      <DropDown label="모델 선택" placeholder="배포할 모델을 선택하세요" options={options} onSelect={handleSelect} />
      <Input
        label="API 경로"
        placeholder="ex) /api/v1/model"
        value={apiPath}
        onChange={(e) => handleApiPath(e.target.value)}
      />
      <Input
        label="설명"
        placeholder="API에 대한 설명을 입력하세요"
        value={apiDescription}
        onChange={(e) => handleApiDescription(e.target.value)}
      />
    </Modal>
  );
};

export default DeployModal;
