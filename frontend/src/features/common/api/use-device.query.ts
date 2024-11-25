import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import commonKey from '@features/common/api/common-key';
import { DeviceResponse } from '@/features/common/types/common.type';

const fetchDevices = async () => {
  try {
    const response = await axiosInstance.get('/devices');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFetchDevices = () => {
  return useQuery<DeviceResponse>({
    queryKey: commonKey.devices(),
    queryFn: fetchDevices,
  });
};
