import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import homeKey from '@/features/home/api/home-key';
import type { HistoryResponse } from '@features/home/types/home.type';

const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('/projects/');
    const projects = response.data?.data?.projects;
    return projects || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

export const useProjects = () => {
  return useQuery({
    queryKey: homeKey.list(),
    queryFn: () => fetchProjects(),
  });
};

const fetchProjectDetail = async (title: string) => {
  try {
    const response = await axiosInstance.get(`/projects/${title}`);
    const project = response.data?.data?.project;
    return project || null;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

export const useProjectDetail = (title: string) => {
  return useQuery({
    queryKey: homeKey.project(title),
    queryFn: () => fetchProjectDetail(title),
    enabled: !!title,
  });
};

const fetchProjectHistory = async (title: string, page: number, pageSize: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${title}/train/logs`, {
      params: { page, pageSize },
    });
    const project = response.data?.data;
    return project || null;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

export const useProjectHistory = (title: string, page: number, pageSize: number) => {
  return useQuery<HistoryResponse>({
    queryKey: homeKey.history(title, page, pageSize),
    queryFn: () => fetchProjectHistory(title, page, pageSize),
    enabled: !!title,
  });
};
