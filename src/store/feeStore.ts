/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

const useFeeStore = create((set) => ({
  selectedYear: '',
  selectedClass: '',
  setSelectedYear: (year: any) => set({ selectedYear: year }),
  setSelectedClass: (className: any) => set({ selectedClass: className }),
}));

export default useFeeStore;
