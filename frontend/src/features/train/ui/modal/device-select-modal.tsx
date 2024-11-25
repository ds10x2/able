import { useState } from 'react';
import toast from 'react-hot-toast';

import Modal from '@shared/ui/modal/modal';
import DeviceSelect from '@features/common/ui/dropdown/device-select';

interface DeviceSelectModalProps {
  onClose: () => void;
  onSubmit: (deviceIndex: number) => void;
}

const DeviceSelectModal = ({ onClose, onSubmit }: DeviceSelectModalProps) => {
  const [device, setDevice] = useState<{ index: number; name: string }>({
    index: -1,
    name: '',
  });

  const handleConfigChange = (newDevice: { index: number; name: string }) => {
    setDevice(newDevice);
  };

  const handleSubmit = () => {
    if (device.name) {
      onSubmit(device.index);
      onClose();
      return;
    }
    toast.error('모든 칸을 채워주세요.');
  };

  return (
    <Modal onClose={onClose} onConfirm={handleSubmit} title="디바이스를 선택하세요" confirmText="추론하기">
      <DeviceSelect onSelect={(selectedDevice) => handleConfigChange(selectedDevice)} />
    </Modal>
  );
};

export default DeviceSelectModal;
