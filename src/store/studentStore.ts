import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// Define the student type
interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  graduationYear: string;
  phoneNumber: string;
  address: string;
  totalFees: number;
  feesPaid: number;
  activeStatus: boolean;
  feesPaidPercentage: number;
}

// Define the store state and actions
interface StudentStore {
  students: Student[];
  selectedStudent: Student | null;
  addStudent: (student: Student) => void;
  updateStudent: (id: number, updates: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
  setSelectedStudent: (student: Student | null) => void;
  calculateTotalStudents: () => number;
  calculateTotalFees: () => number;
  calculateTotalFeesPaid: () => number;
}

// Fix `persist` middleware type
type StudentPersist = PersistOptions<StudentStore>;

const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      students: [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          major: "Computer Science",
          graduationYear: "2024",
          phoneNumber: "123-456-7890",
          address: "123 Student St, Campus Town",
          totalFees: 50000,
          feesPaid: 25000,
          activeStatus: true,
          feesPaidPercentage: 50,
        },
      ],
      selectedStudent: null,

      addStudent: (student) => set((state) => ({
        students: [...state.students, student],
      })),

      updateStudent: (id, updates) => set((state) => ({
        students: state.students.map((student) =>
          student.id === id
            ? {
                ...student,
                ...updates,
                feesPaidPercentage: Number(
                  (
                    ((updates.feesPaid ?? student.feesPaid) / student.totalFees) *
                    100
                  ).toFixed(2)
                ),
              }
            : student
        ),
      })),

      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
        })),

      setSelectedStudent: (student) => set({ selectedStudent: student }),

      calculateTotalStudents: () => get().students.length,

      calculateTotalFees: () =>
        get().students.reduce((total, student) => total + student.totalFees, 0),

      calculateTotalFeesPaid: () =>
        get().students.reduce((total, student) => total + student.feesPaid, 0),
    }),
    {
      name: "student-storage",
      storage: localStorage, // 🔹 FIX: `storage` instead of `getStorage`
    } as unknown as StudentPersist
  )
);

export default useStudentStore;
