export interface HistoryItem {
  index: number;
  originDirName: string;
  date: string;
  accuracy: string;
  status: string;
}
export interface HistoryResponse {
  totalPages: number;
  trainSummaries: HistoryItem[];
}
export interface Project {
  title: string;
  description: string;
  thumbnail?: string;
}

export interface ProjectStore {
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  resetProject: () => void;
}

export interface UpdateProjectSchema {
  title: string;
  description: string;
}
