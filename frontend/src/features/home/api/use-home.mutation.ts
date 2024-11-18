import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import homeKey from '@features/home/api/home-key';
import type { Project, UpdateProjectSchema } from '@features/home/types/home.type';
import { useProjectNameStore, useProjectStore } from '@entities/project/model/project.model';

const createProject = async (projectData: Project): Promise<Project> => {
  const response = await axiosInstance.post('/projects', {
    title: projectData.title,
    description: projectData.description,
  });

  if (response.status == 201) {
    return projectData;
  }

  return response.data;
};

const updateProject = async ({
  title,
  description,
  prevTitle,
  prevDescription,
}: {
  title: string;
  description: string;
  prevTitle?: string;
  prevDescription?: string;
}): Promise<UpdateProjectSchema> => {
  const response = await axiosInstance.put('/projects', {
    title: title,
    description: description,
    prevTitle: prevTitle,
    prevDescription: prevDescription,
  });

  if (response.status == 200) {
    return { title, description };
  }

  return response.data;
};

const deleteProject = async ({ title }: { title: string }): Promise<boolean> => {
  const response = await axiosInstance.delete('/projects', {
    params: { title },
  });

  if (response.status == 204) {
    return true;
  }

  return false;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { setProjectName } = useProjectNameStore();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      setProjectName(data.title);

      queryClient.invalidateQueries({ queryKey: homeKey.list() });
    },
  });
};

export const useUpdateProject = () => {
  const { updateCurrentProject } = useProjectStore();
  const { setProjectName } = useProjectNameStore();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      setProjectName(data.title);
      updateCurrentProject(data.title, data.description);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { setProjectName } = useProjectNameStore();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      setProjectName('');
      queryClient.invalidateQueries({ queryKey: homeKey.list() });
    },
  });
};
