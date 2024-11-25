import { useState } from 'react';
import toast from 'react-hot-toast';

import type { TrainConfig } from '@features/canvas/types/train.type';

import Modal from '@shared/ui/modal/modal';
import Input from '@shared/ui/input/input';
import DeviceSelect from '@features/common/ui/dropdown/device-select';

interface TrainModalProps {
  onClose: () => void;
  onSubmit: (trainConfig: TrainConfig) => void;
}

const TrainModal = ({ onClose, onSubmit }: TrainModalProps) => {
  const [trainConfig, setTrainConfig] = useState<TrainConfig>({
    epoch: null,
    batchSize: null,
    device: { index: -1, name: '', status: 'not_in_use' },
  });

  const handleConfigChange = <T extends keyof TrainConfig>(label: T, value: TrainConfig[T]) => {
    setTrainConfig((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = () => {
    if (trainConfig.epoch && trainConfig.batchSize && trainConfig.device.name) {
      onSubmit(trainConfig);
      onClose();
      return;
    }
    toast.error('모든 칸을 채워주세요.');
  };

  return (
    <Modal onClose={onClose} onConfirm={handleSubmit} title="학습 정보를 입력하세요" confirmText="학습하기">
      <Input
        label="학습 횟수 (epoch)"
        value={trainConfig.epoch ?? ''}
        onChange={(e) => handleConfigChange('epoch', Number(e.target.value))}
      />
      <Input
        label="배치 크기 (batch size)"
        value={trainConfig.batchSize ?? ''}
        onChange={(e) => handleConfigChange('batchSize', Number(e.target.value))}
      />
      <DeviceSelect onSelect={(device) => handleConfigChange('device', device)} />
    </Modal>
  );
};

export default TrainModal;
