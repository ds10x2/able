import type { Device } from '@features/common/types/common.type';
import type { Option } from '@shared/types/common.type';
import { useFetchDevices } from '@features/common/api/use-device.query';

import Dropdown from '@shared/ui/dropdown/dropdown';

interface DeviceSelectProps {
  onSelect: (option: Device) => void;
}

const DeviceSelect = ({ onSelect }: DeviceSelectProps) => {
  const { data } = useFetchDevices();
  const devices = data?.data.devices ?? [];

  const options = devices.map((device) => ({
    value: device.index,
    label: device.name,
    canSelect: device.status === 'not_in_use',
  }));

  const handleSelect = (option: Option) => {
    const selectedDevice = devices.find((device) => device.index === option.value);
    if (selectedDevice) {
      onSelect(selectedDevice);
    }
  };

  return <Dropdown label="학습 장치 선택" options={options} onSelect={handleSelect} />;
};

export default DeviceSelect;
