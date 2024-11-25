import type { Device } from '@features/common/types/common.type';
import { CanvasSchema } from './canvas.type';

export interface TrainConfig {
  epoch: number | null;
  batchSize: number | null;
  device: Device;
}

export interface TrainRequest {
  projectName: string;
  epoch: number;
  batchSize: number;
  device: Device;
  canvas: CanvasSchema['canvas'];
}
