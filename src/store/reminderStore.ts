import { create } from "zustand";

interface Student {
  id: string;
  studentId: string;
  ivId: string;
  name: string;
  class: string;
  particular: string;
  fees: number;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
}

interface Reminder {
  id: string;
  title: string;
  students: Student[];
  message: string;
  sentTo: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
  sentDate: Date;
}

interface ReminderFormState {
  students: Student[];
  selectedStudents: string[];
  reminderTitle: string;
  sendDate: string | undefined;
  reminderType: string;
  template: string;
  customMessage: string;
  sendOptions: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
  reminders: Reminder[];
  setStudents: (students: Student[]) => void;
  setSelectedStudents: (selectedStudents: string[]) => void;
  setReminderTitle: (reminderTitle: string) => void;
  setSendDate: (sendDate: string | undefined  ) => void;
  setReminderType: (reminderType: string) => void;
  setTemplate: (template: string) => void;
  setCustomMessage: (customMessage: string) => void;
  setSendOptions: (sendOptions: {
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  }) => void;
  addReminder: (reminder: Reminder) => void;
}

export const useReminderFormStore = create<ReminderFormState>((set) => ({
  students: [],
  selectedStudents: [],
  reminderTitle: "",
  sendDate: undefined  ,
  reminderType: "",
  template: "",
  customMessage: "",
  sendOptions: {
    sms: false,
    whatsapp: false,
    email: false,
  },
  reminders: [],
  setStudents: (students) => set({ students }),
  setSelectedStudents: (selectedStudents) => set({ selectedStudents }),
  setReminderTitle: (reminderTitle) => set({ reminderTitle }),
  setSendDate: (sendDate) => set({ sendDate }),
  setReminderType: (reminderType) => set({ reminderType }),
  setTemplate: (template) => set({ template }),
  setCustomMessage: (customMessage) => set({ customMessage }),
  setSendOptions: (sendOptions) => set({ sendOptions }),
  addReminder: (reminder) =>
    set((state) => ({ reminders: [...state.reminders, reminder] })),
}));