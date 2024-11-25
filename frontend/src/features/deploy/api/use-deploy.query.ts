import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import deployKey from '@features/deploy/api/deploy-key';
import type { DeployInfo } from '@features/deploy/types/deploy.type';

const fetchDeployInfo = async () => {
  const response = await axiosInstance.get('/deploy/info');
  return response.data;
};

export const useFetchDeployInfo = () => {
  return useQuery<DeployInfo>({
    queryKey: deployKey.info(),
    queryFn: async () => {
      const response = await fetchDeployInfo();
      return response.data;
    },
  });
};
