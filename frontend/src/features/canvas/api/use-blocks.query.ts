import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import canvasKey from '@features/canvas/api/canvas-key';
import type { BlocksResponse, SearchBlockResponse } from '@features/canvas/types/block.type';

const fetchBlocks = async (type: string) => {
  try {
    const response = await axiosInstance.get('/blocks', { params: { type } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useBlocks = (type: string, isOpen: boolean) => {
  return useQuery<BlocksResponse>({
    queryKey: canvasKey.blocks(type),
    queryFn: () => fetchBlocks(type),
    enabled: isOpen,
  });
};

const fetchSearchBlocks = async (keyword: string) => {
  try {
    const response = await axiosInstance.get('/blocks/search', { params: { keyword } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useSearchBlock = (keyword: string) => {
  return useQuery<SearchBlockResponse>({
    queryKey: canvasKey.search(keyword),
    queryFn: () => fetchSearchBlocks(keyword),
    enabled: !!keyword,
  });
};
