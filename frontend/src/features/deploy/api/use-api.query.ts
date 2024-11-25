import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import deployKey from '@features/deploy/api/deploy-key';
import type { ApiListResponse } from '@features/deploy/types/deploy.type';

const fetchApiLists = async (page: number, pageSize: number) => {
  try {
    const response = await axiosInstance.get('/deploy/apis', {
      params: { page, pageSize },
    });

    if (response.status == 204) {
      return { data: { apis: [], totalPages: 0 } };
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch apiLists:', error);
    throw error;
  }
};

export const useApiLists = (page: number, pageSize: number) => {
  return useQuery<ApiListResponse>({
    queryKey: deployKey.list(page, pageSize),
    queryFn: async () => {
      const response = await fetchApiLists(page, pageSize);
      return response.data;
    },
  });
};
