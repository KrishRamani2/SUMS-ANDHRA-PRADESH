import { create } from 'zustand';

interface StudentState {
  studentData: {
    name: string;
    imageUrl: string;
    admissionNumber: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    mobileNo: string;
    bloodGroup: string;
    povertStatus: string;
    aadharNo: string;
    udisedNo: string;
    saralStudentId: string;
    nationality: string;
    religion: string;
    grNo: string;
    admissionReceiptId: string;
    admissionDate: string;
    admissionClass: string;
    lastInstitute: string;
    placeOfBirth: string;
    pwd: string;
    busFacility: string;
  };
  updateStudentData: (updatedData: Partial<StudentState['studentData']>) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  studentData: {
    name: 'Jill Anderson',
    imageUrl: 'https://via.placeholder.com/400x400',
    admissionNumber: 'null',
    gender: 'M',
    dateOfBirth: '2024-05-14',
    email: '-',
    mobileNo: '-',
    bloodGroup: '-',
    povertStatus: '-',
    aadharNo: '-',
    udisedNo: '-',
    saralStudentId: '-',
    nationality: '-',
    religion: '-',
    grNo: '-',
    admissionReceiptId: '-',
    admissionDate: '-',
    admissionClass: '-',
    lastInstitute: '-',
    placeOfBirth: 'pb',
    pwd: '-',
    busFacility: '*'
  },
  updateStudentData: (updatedData) => set((state) => ({ 
    studentData: { ...state.studentData, ...updatedData } 
  }))
}));