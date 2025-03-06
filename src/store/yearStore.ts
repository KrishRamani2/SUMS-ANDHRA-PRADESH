import { create } from 'zustand';

interface YearStore {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const useYearStore = create<YearStore>((set) => ({
  selectedYear: new Date().getFullYear(),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));