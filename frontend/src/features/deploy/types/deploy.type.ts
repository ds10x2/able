import type { Option } from '@shared/types/common.type';

export interface DeployInfo {
  apiVersion: string;
  port: string;
  status: 'running' | 'stop';
}
export interface ApiSchema {
  projectName: string;
  trainResult: string;
  checkpoint: string;
  uri: string;
  description: string;
}

export interface ApiResponse {
  projectName: string;
  trainResult: string;
  checkpoint: string;
  uri: string;
  description: string;
  status: string;
}

export interface ApiListResponse {
  apis: ApiResponse[];
  totalPages: number;
}

export interface DeployConfig {
  apiPath: string;
  apiDescription: string;
  selectedOption: Option;
}
