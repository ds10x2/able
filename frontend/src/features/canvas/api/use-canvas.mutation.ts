import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@shared/api/config/axios-instance';
import canvasKey from '@features/canvas/api/canvas-key';
import type { BlockSchema, CanvasSchema, EdgeSchema } from '@features/canvas/types/canvas.type';

interface SaveCanvasProps {
  projectName: string;
  canvas: { blocks: BlockSchema[]; edges: EdgeSchema[] };
  thumbnail: string;
}

const saveCanvas = async ({ projectName, canvas, thumbnail }: SaveCanvasProps) => {
  await axiosInstance.post(
    '/canvas',
    { canvas, thumbnail },
    {
      params: { projectName },
    }
  );
};

export const useSaveCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCanvas,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<CanvasSchema>(canvasKey.canvas(variables.projectName), (oldData) => ({
        ...oldData,
        canvas: {
          blocks: variables.canvas.blocks,
          edges: variables.canvas.edges,
        },
      }));
    },
  });
};
