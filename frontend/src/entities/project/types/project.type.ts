import type { Project } from '@features/home/types/home.type';

export interface ProjectNameState {
  projectName: string;
  resultName: string;
  epochName: string;
  setProjectName: (project: string) => void;
  setResultName: (result: string) => void;
  setEpochName: (epoch: string) => void;
}

export interface ProjectState {
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  updateCurrentProject: (prevTitle: string, prevDescription: string) => void;
  resetProject: () => void;
}

export interface AnalyzeState {
  currentDirection: string;
  setCurrentDirection: (currentDirection: string) => void;
}
