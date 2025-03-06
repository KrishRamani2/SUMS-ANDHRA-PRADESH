// Zustand store remains unchanged
import { create } from 'zustand';

interface SchoolState {
  selectedState: string;
  selectedYear: string;
  sortOrder: 'asc' | 'desc';
  selectedDistrict: string | null;
  setSelectedState: (state: string) => void;
  setSelectedYear: (year: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setSelectedDistrict: (district: string | null) => void;
  resetSelections: () => void;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  selectedState: 'All',
  selectedYear: '2024',
  sortOrder: 'asc',
  selectedDistrict: null,
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
  resetSelections: () => set({
    selectedState: 'All',
    selectedDistrict: null,
    sortOrder: 'asc'
  })
}));