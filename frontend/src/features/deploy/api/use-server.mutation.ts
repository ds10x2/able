import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/shared/api/config/axios-instance';
import deployKey from '@/features/deploy/api/deploy-key';

const runServer = async () => {
  const response = await axiosInstance.get('/deploy/run');
  return response.data;
};

export const useStartServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deployKey.info() });
    },
  });
};

const stopServer = async () => {
  const response = await axiosInstance.get('/deploy/stop');
  return response.data;
};

export const useStopServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stopServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deployKey.info() });
    },
  });
};

const restartServer = async () => {
  await axiosInstance.post('/deploy/restart');
};

export const useRestartServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deployKey.info() });
    },
  });
};
