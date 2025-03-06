import { create } from 'zustand';

export interface FeatureData {
  label: string;
  value: number;
  percentageChange: number;
  icon: string;
}

export interface FeatureStore {
  selectedFeatures: FeatureData[];
  setSelectedFeatures: (features: FeatureData[]) => void;
}

// Example of how your store should be typed
export const useFeatureStore = create<FeatureStore>((set) => ({
  selectedFeatures: [],
  setSelectedFeatures: (features) => set({ selectedFeatures: features }),
}));