import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import trainKey from '@features/train/api/train-key';
import type { CanvasSchema } from '@features/canvas/types/canvas.type';
import type { EpochResponse, HeatMapResponse } from '@features/train/types/analyze.type';

const fetchEpochs = async (projectName: string, resultName: string, index: number, size: number) => {
  try {
    const response = await axiosInstance.get('/checkpoints', {
      params: { projectName, resultName, index, size },
    });

    if (response.status == 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch epochs:', error);
    throw error;
  }
};

const searchEpochs = async (projectName: string, resultName: string, keyword: string, index: number, size: number) => {
  try {
    const response = await axiosInstance.get('/checkpoints/search', {
      params: { projectName, resultName, keyword, index, size },
    });

    if (response.status == 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch epochs:', error);
    throw error;
  }
};

const fetchModel = async (projectName: string, resultName: string) => {
  try {
    const response = await axiosInstance.get('/analyses/model', {
      params: { projectName, resultName },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch canvas:', error);
    throw error;
  }
};

const fetchHeatMap = async (projectName: string, resultName: string, epochName: string) => {
  try {
    const response = await axiosInstance.get('/analyses/heatmap', {
      params: { projectName, resultName, epochName },
    });

    if (response.status == 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch heatMap:', error);
    throw error;
  }
};

export const useEpochs = (projectName: string, resultName: string, index: number, size: number) => {
  return useQuery<EpochResponse>({
    queryKey: trainKey.list(projectName, resultName, index, size),
    queryFn: async () => {
      const response = await fetchEpochs(projectName, resultName, index, size);
      return response.data;
    },
  });
};

export const useSearchEpochs = (
  projectName: string,
  resultName: string,
  keyword: string,
  index: number,
  size: number
) => {
  return useQuery<EpochResponse>({
    queryKey: trainKey.search(projectName, resultName, keyword, index, size),
    queryFn: async () => {
      const response = await searchEpochs(projectName, resultName, keyword, index, size);
      return response.data;
    },
  });
};

export const useModel = (projectName: string, resultName: string) => {
  return useQuery<CanvasSchema>({
    queryKey: trainKey.model(projectName, resultName),
    queryFn: async () => {
      const response = await fetchModel(projectName, resultName);
      return response.data;
    },
  });
};

export const useHeatMap = (projectName: string, resultName: string, epochName: string) => {
  return useQuery<HeatMapResponse>({
    queryKey: trainKey.heatMap(projectName, resultName, epochName),
    queryFn: async () => {
      const response = await fetchHeatMap(projectName, resultName, epochName);
      return response.data;
    },
  });
};
