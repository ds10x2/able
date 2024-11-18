import { create } from 'zustand';

import type { ImageState } from '@features/train/types/analyze.type';

export const useImageStore = create<ImageState>((set) => ({
  uploadedImage: null,
  heatmapImage: null,
  classScores: [],

  heatMapId: '',

  setUploadedImage: (image) => set({ uploadedImage: image }),
  setHeatMapId: (id) => set({ heatMapId: id }),

  setHeatMapImage: (data) => {
    set({
      heatmapImage: data.image,
      classScores: data.classScores,
    });
  },

  setAllImage: (data) => {
    set({
      uploadedImage: data.uploadedImage,
      heatmapImage: data.heatmapImage,
      classScores: data.classScores,
    });
  },

  resetImage: () => {
    set({
      uploadedImage: null,
      heatmapImage: null,
      classScores: [],
      heatMapId: '',
    });
  },
}));
