import { create } from 'zustand';

interface SchoolStore {
  selectedSchool: string | null;
  setSelectedSchool: (schoolName: string) => void;
  clearSelectedSchool: () => void;
}

const useSchoolStore = create<SchoolStore>((set) => ({
  selectedSchool: null,
  setSelectedSchool: (schoolName) => set({ selectedSchool: schoolName }),
  clearSelectedSchool: () => set({ selectedSchool: null }),
}));

export default useSchoolStore;