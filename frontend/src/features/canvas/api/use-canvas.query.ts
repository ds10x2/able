import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import canvasKey from '@features/canvas/api/canvas-key';
import type { CanvasSchema } from '@features/canvas/types/canvas.type';

const fetchCanvas = async (projectName: string) => {
  try {
    const response = await axiosInstance.get('/canvas', {
      params: { projectName },
    });

    if (response.status === 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFetchCanvas = (projectName: string) => {
  return useQuery<CanvasSchema>({
    queryKey: canvasKey.canvas(projectName),
    queryFn: async () => {
      const response = await fetchCanvas(projectName);
      return response.data;
    },
    enabled: !!projectName,
  });
};
