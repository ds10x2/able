import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/shared/api/config/axios-instance';
import deployKey from '@features/deploy/api/deploy-key';
import type { ApiSchema } from '@features/deploy/types/deploy.type';

const registerAPI = async ({ projectName, trainResult, checkpoint, uri, description }: ApiSchema): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`/deploy/apis`, {
      project_name: projectName,
      train_result: trainResult,
      checkpoint: checkpoint,
      uri: uri,
      description: description,
    });

    if (response.status == 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('regist api error:', error);
    return false;
  }
};

const stopApi = async ({ uri }: { uri: string }): Promise<void> => {
  try {
    const response = await axiosInstance.put(`/deploy/apis?uri=${encodeURIComponent(uri)}`, null);

    if (response.status !== 200) {
      throw new Error('API 중지 실패');
    }
  } catch (error) {
    console.error('Failed to fetch apiLists:', error);
    throw error;
  }
};

const removeApi = async ({ uri }: { uri: string }): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/deploy/apis?uri=${encodeURIComponent(uri)}`);

    if (response.status !== 200) {
      throw new Error('API 삭제 실패');
    }
  } catch (error) {
    console.error('Failed to fetch apiLists:', error);
    throw error;
  }
};

export const useRegisterAPI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deployKey.list(0, 5) });
    },
  });
};

export const useStopApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stopApi,
    onSuccess: (_, variables: { uri: string; page: number }) => {
      const { page } = variables;
      queryClient.invalidateQueries({ queryKey: deployKey.list(page - 1, 5) });
    },
  });
};

export const useRemoveApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeApi,
    onSuccess: (_, variables: { uri: string; page: number }) => {
      const { page } = variables;
      queryClient.invalidateQueries({ queryKey: deployKey.list(page - 1, 5) });
    },
  });
};
