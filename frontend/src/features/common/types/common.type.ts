import { Response } from '@shared/types/response.type';

export interface Device {
  index: number;
  name: string;
  status: 'not_in_use' | 'in_use';
}

export interface DeviceResponse extends Response {
  data: {
    devices: Device[];
  };
}
