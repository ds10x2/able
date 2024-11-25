import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/shared/api/config/axios-instance';
import trainKey from '@features/train/api/train-key';
import type { FeatureMapProps, CreateFeatureMapProps } from '@features/train/types/analyze.type';

const createFeatureMap = async ({ projectName, resultName, epochName, deviceIndex, image }: CreateFeatureMapProps) => {
  try {
    const formData = new FormData();

    // base64 문자열을 Blob으로 변환한 후 FormData에 추가
    if (image) {
      const byteString = atob(image.split(',')[1]);
      const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append('file', blob);
    }

    const response = await axiosInstance.post('/analyses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        project_name: projectName,
        result_name: resultName,
        epoch_name: epochName,
        device_index: deviceIndex,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Feature map creation error:', error);
    throw error;
  }
};

const fetchFeatureMap = async ({
  projectName,
  resultName,
  epochName,
  blockIds,
}: FeatureMapProps): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/analyses/feature-map', {
      project_name: projectName,
      result_name: resultName,
      epoch_name: epochName,
      block_id: blockIds,
    });

    if (response.status == 204) {
      return null;
    }

    return response.data.data.featureMap;
  } catch (error) {
    console.error('Feature map fetch error:', error);
    return '';
  }
};

export const useCreateFeatureMap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeatureMap,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: trainKey.heatMap(variables.projectName, variables.resultName, variables.epochName),
      });
    },
    onError: (error) => {
      console.error('Feature map creation failed:', error);
    },
  });
};

export const useFetchFeatureMap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFeatureMap,
    onSuccess: (featureMap: string | null, variables) => {
      queryClient.setQueryData<string | null>(
        trainKey.select(variables.projectName, variables.resultName, variables.epochName, variables.blockIds),
        () => featureMap
      );
    },
  });
};
