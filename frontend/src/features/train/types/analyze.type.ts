export interface FeatureMapProps {
  projectName: string;
  resultName: string;
  epochName: string;
  blockIds: string;
}

export interface EpochResponse {
  checkpoints: string[];
  hasNext: boolean;
}

export interface FeatureMapResponse {
  image: string;
  classScores: ClassScore[];
}

export interface GraphResponse {
  confusionMatrix: string;
  performanceMetrics: PerformanceMatrics;
  f1Score: string;
  epochResult: EpochResult[];
}

export interface PerformanceMatrics {
  accuracy: number;
  top5Accuracy: number;
  precision: number;
  recall: number;
}

export interface EpochResult {
  epoch: string;
  losses: Loss;
  accuracies: Accuracies;
}

export interface Loss {
  training: number;
  validation: number;
}

export interface Accuracies {
  accuracy: number;
}

export interface CreateFeatureMapProps {
  projectName: string;
  resultName: string;
  epochName: string;
  deviceIndex: number;
  image: string | null;
}

export interface HeatMapResponse {
  heatmapBlockId: string;
  originalImg: string;
  heatmapImg: string;
  classScores: ClassScore[];
}

export interface ClassScore {
  className: string;
  classScore: number;
}

export interface ImageState {
  uploadedImage: string | null;
  heatmapImage: string | null;
  classScores: ClassScore[];
  heatMapId: string;

  setUploadedImage: (image: string | null) => void;
  setHeatMapId: (id: string) => void;
  setHeatMapImage: (data: { image: string; classScores: ClassScore[] }) => void;
  setAllImage: (data: { uploadedImage: string; heatmapImage: string; classScores: ClassScore[] }) => void;

  resetImage: () => void;
}
