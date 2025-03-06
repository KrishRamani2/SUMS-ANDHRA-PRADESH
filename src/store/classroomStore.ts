import { create } from 'zustand';

interface Classroom {
  id: number;
  academicYear: string;
  totalFees: number;
  feesPaid: number;
  activeStatus: boolean;
  totalStudents: number;
}

interface ClassroomStore {
  selectedClassroom: Classroom | null;
  setSelectedClassroom: (classroom: Classroom) => void;
}

const useClassroomStore = create<ClassroomStore>((set) => ({
  selectedClassroom: null,
  setSelectedClassroom: (classroom) => set({ selectedClassroom: classroom }),
}));

export default useClassroomStore;
